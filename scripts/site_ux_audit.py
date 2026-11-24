#!/usr/bin/env python3
"""Source-level triage for Andy public sites. Not a substitute for browser QA."""
import json
import os
import re
import time
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

ROOT=Path(__file__).resolve().parents[1]
PLAN=ROOT/'docs/site-upgrade/PLAN.md'
EXTRAS=['FreePublish','FreeMacOn','google-ai-income-handbook','gemini-handbook','antigravity-guide','FreeWatermark']
NAME=re.compile(r'^\|\s*(P[012])\s*\|\s*\[[^]]+\]\(https://github\.com/AIPMAndy/([^)/]+)\)',re.M)
TOKEN=os.environ.get('GITHUB_TOKEN','')
HEADERS={'Accept':'application/vnd.github+json','User-Agent':'Andy-UX-Triage/1.0'}
if TOKEN: HEADERS['Authorization']='Bearer '+TOKEN

def request(url):
    req=Request(url,headers=HEADERS)
    with urlopen(req,timeout=22) as response: return response.read()

def sources(text):
    items=[(match.group(2),match.group(1)) for match in NAME.finditer(text)]
    if len(items)!=33 or len({k for k,_ in items})!=33:
        raise ValueError('Expected exactly 33 unique main-plan sites; update parser before scanning')
    return items+[(x,'P1') for x in EXTRAS if x not in {a for a,_ in items}]

def choose_home(paths):
    for x in ('site/index.html','index.html','docs/index.html','public/index.html','site/home.html','website/index.html'):
        if x in paths:return x
    return next((p for p in paths if p.endswith('/index.html') and p.count('/')<=2),None)

def assess(html,css,paths,home,priority):
    issues=[]
    def miss(test,weight,label):
        if not test: issues.append({'severity':weight,'issue':label})
    miss(bool(home),9,'未定位到可发布首页，需确认实际构建链')
    if not home:return issues
    h=html.lower();css=css.lower()
    miss(bool(re.search(r'<title>[^<]{4,}</title>',h)),3,'title 不完整')
    miss('rel="canonical"' in h or "rel='canonical'" in h,3,'首页缺自指 canonical')
    miss('application/ld+json' in h,2,'首页缺 JSON-LD')
    miss('property="og:' in h or "property='og:" in h,1,'缺社交分享元数据')
    miss('aipmandy' in h and 'metaver.vip' in h and 'a6no1.cn' in h,4,'品牌微信/双官网有缺口')
    miss(any(p.endswith('sitemap.xml') for p in paths),2,'仓库未找到 sitemap')
    miss('prefers-reduced-motion' in css,3,'未发现减少动态效果适配')
    miss('focus-visible' in css,2,'未发现键盘可见焦点样式')
    miss('prefers-color-scheme' in css or 'color-scheme:' in css,1,'未发现系统外观策略（需人工判定）')
    miss('aria-live' in h or 'role="status"' in h,1,'未发现显式状态公告（静态站可不适用）')
    return issues

def scan(name,priority):
    try:
        raw=request('https://api.github.com/repos/AIPMAndy/'+name+'/git/trees/main?recursive=1')
        data=json.loads(raw)
        paths={e['path'] for e in data.get('tree',[]) if e.get('type')=='blob'}
        if data.get('truncated'):raise ValueError('truncated tree')
        home=choose_home(paths)
        to_read=[home] if home else []
        css_candidates=sorted([p for p in paths if p.endswith('.css') and p.count('/')<=3],key=lambda p:(0 if p.startswith(('assets/','site/','src/')) else 1,len(p)))
        to_read+=[p for p in css_candidates[:6] if p not in to_read]
        pieces={}
        for p in to_read:
            try:pieces[p]=request('https://raw.githubusercontent.com/AIPMAndy/'+name+'/main/'+p).decode('utf-8','replace')[:160000]
            except (HTTPError,URLError,TimeoutError):pieces[p]=''
        html=pieces.get(home,'')
        styles=html+'\n'+'\n'.join(pieces.get(p,'') for p in css_candidates[:6])
        issues=assess(html,styles,paths,home,priority)
        return {'repository':name,'priority':priority,'home':home,'issues':issues,'risk_score':sum(i['severity'] for i in issues),'source_only':True,'error':None}
    except (HTTPError,URLError,TimeoutError,ValueError) as exc:
        return {'repository':name,'priority':priority,'home':None,'issues':[],'risk_score':None,'source_only':True,'error':str(exc)}

def main():
    items=sources(PLAN.read_text(encoding='utf-8'))
    results=[]
    for i,(name,priority) in enumerate(items,1):
        result=scan(name,priority);results.append(result)
        print(f'{i}/{len(items)} {name}: score={result["risk_score"]} error={result["error"]}',flush=True)
        time.sleep(.08)
    ranked=sorted(results,key=lambda x:(-1 if x['risk_score'] is None else -x['risk_score'],0 if x['priority']=='P0' else 1,x['repository']))
    out=ROOT/'ux-audit-artifacts';out.mkdir(exist_ok=True)
    (out/'audit.json').write_text(json.dumps({'method':'source-level heuristic only; not real browser QA','sites':ranked},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    lines=['# UX/motion source triage (not Stage 6 certification)','','| Repository | Priority | Risk score* | Missing checks / limitations |','|---|---|---:|---|']
    for r in ranked:
        issues='；'.join(i['issue'] for i in r['issues']) or ('Fetch error: '+r['error'] if r['error'] else 'Source heuristics passed; manual browser review needed')
        lines.append(f'| [{r["repository"]}](https://github.com/AIPMAndy/{r["repository"]}) | {r["priority"]} | {r["risk_score"] if r["risk_score"] is not None else "N/A"} | {issues.replace("|","/")} |')
    lines+=['','* Higher score means more source-level warnings, **not** proven worse user experience. Browser, mobile and real-world source QA are separate.']
    (out/'audit.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
    print('\nTOP SOURCE TRIAGE:')
    for r in ranked[:12]:print(f'{r["repository"]}: {r["risk_score"]} ({", ".join(x["issue"] for x in r["issues"][:3])})')
    print(f'OUTPUT {len(results)} repositories, {sum(r["error"] is not None for r in results)} fetch errors')

if __name__=='__main__':main()
