#!/usr/bin/env python3
"""Read-only public Pages inventory + real HTTP/browser triage. Never declares a site DONE."""
import argparse
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from html.parser import HTMLParser
import json, os, re, time
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import quote, urlencode, urljoin, urlsplit
from urllib.request import Request, urlopen, build_opener, HTTPRedirectHandler
import xml.etree.ElementTree as ET

ROOT=Path(__file__).resolve().parents[1]
HOST='aipmandy.github.io'
BASE='https://'+HOST+'/'
API='https://api.github.com/'
SLUG=re.compile(r'^[A-Za-z0-9._-]{1,100}$')
PLAN=re.compile(r'^\|\s*(P[012])\s*\|\s*\[[^\]]+\]\(https://github\.com/AIPMAndy/([^)]+)\)',re.M)
ALIASES={'antigravity':'antigravity-guide'}
MAX_BYTES=3*1024*1024

def own_url(value):
    try:
        u=urlsplit(value)
        return u.scheme=='https' and u.hostname==HOST and u.netloc==HOST and not u.username and not u.password
    except ValueError:return False

class SameOriginRedirect(HTTPRedirectHandler):
    def redirect_request(self,req,fp,code,msg,headers,newurl):
        if not own_url(newurl):
            raise HTTPError(req.full_url,code,'External redirect excluded from Pages audit',headers,fp)
        return super().redirect_request(req,fp,code,msg,headers,newurl)

def public_fetch(url,limit=MAX_BYTES):
    if not own_url(url):raise ValueError('Not an allowed public Pages URL')
    opener=build_opener(SameOriginRedirect)
    req=Request(url,headers={'User-Agent':'Andy-Public-Pages-QA/1.0','Accept':'text/html,application/xml,application/pdf,*/*'})
    started=time.monotonic()
    with opener.open(req,timeout=14) as resp:
        content=resp.read(limit+1)
        return {'status':resp.status,'url':resp.url,'bytes':len(content),'truncated':len(content)>limit,'type':resp.headers.get('Content-Type',''),'body':content[:limit],'sample_ms':round((time.monotonic()-started)*1000)}

def api_json(path):
    # Credentials are sent only to the fixed GitHub API host, never Pages or raw source.
    headers={'User-Agent':'Andy-Public-Pages-QA/1.0','Accept':'application/vnd.github+json'}
    token=os.environ.get('GITHUB_TOKEN')
    if token:headers['Authorization']='Bearer '+token
    with urlopen(Request(API+path,headers=headers),timeout=18) as r:return json.loads(r.read())

def public_inventory():
    rows=[]
    for page in range(1,11):
        q=urlencode({'q':'user:AIPMAndy is:public','per_page':100,'page':page})
        result=api_json('search/repositories?'+q)
        if result.get('incomplete_results'):raise RuntimeError('GitHub repository discovery incomplete')
        data=result.get('items',[])
        rows.extend(x for x in data if x.get('owner',{}).get('login','').lower()=='aipmandy' and x.get('private') is False and not x.get('archived'))
        if len(data)<100:
            return {x['name'].lower():{'name':x['name'],'has_pages':bool(x.get('has_pages')),'fork':bool(x.get('fork'))} for x in rows if SLUG.fullmatch(x['name'])}
    raise RuntimeError('Repository discovery exceeds safe pagination cap')

def canonical_path(value):
    if not own_url(value):return None
    p=urlsplit(value).path.strip('/')
    if not p:return '/'
    first=p.split('/')[0]
    if not SLUG.fullmatch(first) or first in ('.','..'):return None
    return '/'+first+'/'

def sitemap_paths(xml):
    root=ET.fromstring(xml)
    # A sitemap index is not a URL set; never crawl arbitrary linked external sitemaps.
    if root.tag.split('}')[-1]!='urlset':return set()
    return {p for node in root.findall('.//{*}loc') if node.text and (p:=canonical_path(node.text))}

def targets(repos,plan,sitemap):
    result={'/':{'url':BASE,'repository':'AIPMAndy.github.io','priority':'P2','reasons':['owner homepage']}}
    priorities={name.lower():priority for priority,name in PLAN.findall(plan)}
    def add(name,path,reason):
        if path not in result:result[path]={'url':BASE+path.lstrip('/'),'repository':name,'priority':priorities.get(name.lower(),'P1'),'reasons':[]}
        if reason not in result[path]['reasons']:result[path]['reasons'].append(reason)
    for slug,r in repos.items():
        path='/' if slug==HOST else '/'+r['name']+'/'
        if r['has_pages']:add(r['name'],path,'GitHub public Pages metadata')
        if slug in priorities:add(r['name'],path,'public repository in master plan')
    for path in sitemap:
        if path=='/':continue
        slug=path.strip('/').lower()
        name=ALIASES.get(slug,slug)
        if name in repos:add(repos[name]['name'],path,'owner sitemap (public path)')
    return sorted(result.values(),key=lambda x:(x['priority'],x['url']))

class PageInfo(HTMLParser):
    def __init__(self):
        super().__init__();self.title='';self.in_title=False;self.canonical=[];self.h1=0;self.viewport=False;self.links=[];self.forms=0
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag=='title':self.in_title=True
        if tag=='h1':self.h1+=1
        if tag=='meta' and a.get('name','').lower()=='viewport':self.viewport=True
        if tag=='link' and 'canonical' in a.get('rel','').lower().split() and a.get('href'):self.canonical.append(a['href'])
        if tag=='a' and a.get('href'):self.links.append(a['href'])
        if tag=='form':self.forms+=1
    def handle_endtag(self,tag):
        if tag=='title':self.in_title=False
    def handle_data(self,data):
        if self.in_title:self.title+=data

def sample_pdf_links(base,links):
    result=[]
    for href in links:
        url=urljoin(base,href);u=urlsplit(url)
        if own_url(url) and u.path.lower().endswith('.pdf'):
            normalized='https://'+HOST+u.path
            if normalized not in result:result.append(normalized)
    return result[:2]

def inspect(target):
    out={**target,'http_status':None,'title':'','issues':[],'warnings':[],'pdf_samples':[],'browser':None}
    try:
        r=public_fetch(target['url']);out.update(http_status=r['status'],final_url=r['url'],sample_ms=r['sample_ms'],sample_bytes=r['bytes'])
        if 'html' not in r['type'].lower() and b'<html' not in r['body'][:1200].lower():out['issues'].append('首页返回非 HTML');return out
        p=PageInfo();p.feed(r['body'].decode('utf-8','replace'));out.update(title=p.title.strip(),canonical=p.canonical,headings=p.h1,forms=p.forms)
        if r['truncated']:out['warnings'].append('HTML 截断样本，需复核')
        if not p.title.strip():out['issues'].append('首页 title 缺失')
        if not p.viewport:out['issues'].append('缺移动 viewport')
        if len(p.canonical)!=1:out['warnings'].append('canonical 数量非 1，检查实际发布地址')
        elif canonical_path(urljoin(r['url'],p.canonical[0]))!=canonical_path(r['url']):out['warnings'].append('canonical 与访问路径不同（可能为合法别名）')
        if p.h1!=1:out['warnings'].append('静态 HTML H1 数量非 1，动态页面需复核')
        for url in sample_pdf_links(r['url'],p.links):
            try:
                pdf=public_fetch(url,limit=4096)
                ok=pdf['status']==200 and pdf['body'].startswith(b'%PDF-')
                out['pdf_samples'].append({'url':url,'status':pdf['status'],'header_ok':ok})
                if not ok:out['issues'].append('可见 PDF 下载不是 PDF 文件')
            except (HTTPError,URLError,TimeoutError,ValueError) as exc:
                out['pdf_samples'].append({'url':url,'error':str(exc)});out['issues'].append('可见 PDF 下载访问异常')
    except HTTPError as exc:out['http_status']=exc.code;out['issues'].append('首页 HTTP '+str(exc.code))
    except (URLError,TimeoutError,ValueError) as exc:out['issues'].append('首页网络/解析异常: '+str(exc))
    return out

def browser_check(target,browser,screens):
    result=[]
    for width,scheme,reduce in [(360,'light','reduce'),(390,'dark','no-preference'),(1280,'light','no-preference')]:
        ctx=browser.new_context(viewport={'width':width,'height':844},color_scheme=scheme,reduced_motion=reduce,service_workers='block')
        # Clean, read-only context. Third-party calls are blocked; no user data is submitted.
        ctx.route('**/*',lambda route:route.continue_() if own_url(route.request.url) or route.request.url.startswith(('data:','blob:')) else route.abort())
        page=ctx.new_page();errors=[];page.on('pageerror',lambda error:errors.append(str(error)[:160]))
        item={'width':width,'scheme':scheme,'reduced_motion':reduce}
        try:
            response=page.goto(target['url'],wait_until='domcontentloaded',timeout=22000)
            page.wait_for_timeout(400)
            item['http']=response.status if response else None
            item.update(page.evaluate("""()=>({
                document_width:document.documentElement.scrollWidth, viewport:document.documentElement.clientWidth,
                overflow_px:Math.max(0,document.documentElement.scrollWidth-document.documentElement.clientWidth),
                visible_main:!!document.querySelector('main,[role="main"]'),
                reduced_motion:matchMedia('(prefers-reduced-motion: reduce)').matches,
                sample_controls:document.querySelectorAll('button,input,select,textarea').length
            })"""))
            item['js_errors']=errors[:6]
            safe=re.sub(r'[^A-Za-z0-9._-]','_',urlsplit(target['url']).path.strip('/') or 'root')
            file=screens/(safe+'-'+str(width)+'.png')
            page.screenshot(path=str(file),timeout=10000,animations='disabled')
            item['screenshot']=file.name
        except Exception as exc:item['error']=str(exc)[:250]
        finally:ctx.close()
        result.append(item)
    return result

def main():
    parser=argparse.ArgumentParser();parser.add_argument('--browser-limit',type=int,default=12);args=parser.parse_args()
    out=ROOT/'portfolio-audit-artifacts';out.mkdir(exist_ok=True)
    repos=public_inventory()
    plan=(ROOT/'docs/site-upgrade/PLAN.md').read_text(encoding='utf-8')
    sitemap_error=None
    try:sitemap=sitemap_paths(public_fetch(BASE+'sitemap.xml')['body'])
    except Exception as exc:sitemap=set();sitemap_error=str(exc)
    candidates=targets(repos,plan,sitemap)
    with ThreadPoolExecutor(max_workers=5) as executor:rows=list(executor.map(inspect,candidates))
    eligible=[x for x in rows if x['http_status']==200]
    eligible.sort(key=lambda x:(x['priority'], -len(x['issues']),-len(x['warnings']),x['url']))
    chosen=eligible[:max(0,min(args.browser_limit,20))]
    if chosen:
        from playwright.sync_api import sync_playwright
        screenshots=out/'screenshots';screenshots.mkdir(exist_ok=True)
        with sync_playwright() as p:
            browser=p.chromium.launch(headless=True,args=['--no-sandbox'])
            for row in chosen:
                row['browser']=browser_check(row,browser,screenshots)
                if any(x.get('overflow_px',0)>2 for x in row['browser']):row['issues'].append('Chromium 实测横向溢出')
                if any(x.get('js_errors') for x in row['browser']):row['issues'].append('Chromium 页面运行时异常')
                if any(x.get('error') for x in row['browser']):row['warnings'].append('浏览器样本失败，需复查')
            browser.close()
    rows.sort(key=lambda x:(0 if x['http_status']!=200 else 1,-len(x['issues']),x['priority'],x['url']))
    report={'utc':datetime.now(timezone.utc).isoformat(),'public_active_repo_count':len(repos),'candidate_sites':len(rows),'http_200_count':sum(x['http_status']==200 for x in rows),'browser_site_count':len(chosen),'sitemap_error':sitemap_error,'limitations':['公开 Pages 地址和已列入计划的公开仓库；私有及归档仓库不列入','浏览器仅读：首页样本，第三方请求被阻断，未自动提交表单','PDF 仅抽样文件头，不是视觉/文本验收','不是性能满帧、真机、辅助技术或 Stage 6 认证'],'sites':rows}
    (out/'audit.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    lines=['# 实际公网网站分诊（不是最终验收）','',f"公开未归档仓库：{len(repos)}；目标站点：{len(rows)}；HTTP 200：{report['http_200_count']}；三视口浏览器样本：{len(chosen)}。",'','| 优先级 | 网站 | HTTP | 实际缺陷 / 线索 |','|---|---|---|---|']
    for x in rows:lines.append('| '+x['priority']+' | ['+x['repository']+']('+x['url']+') | '+str(x['http_status'] or '未获取')+' | '+('；'.join(x['issues']+x['warnings']).replace('|','/').replace('\n',' ') or '抽查未发现；仍需真实用户任务验收')+' |')
    lines+=['','## 边界']+['- '+x for x in report['limitations']]
    (out/'audit.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
    print(json.dumps({k:v for k,v in report.items() if k!='sites'},ensure_ascii=False),flush=True)
    for row in rows[:16]:print(row['priority'],row['url'],row['http_status'],'; '.join(row['issues']+row['warnings']),flush=True)
if __name__=='__main__':main()
