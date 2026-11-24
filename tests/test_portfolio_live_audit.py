import unittest
from scripts.portfolio_live_audit import own_url,canonical_path,sitemap_paths,targets,PageInfo,sample_pdf_links
class PortfolioTests(unittest.TestCase):
    def test_only_exact_host(self):
        for bad in ['http://aipmandy.github.io/','https://aipmandy.github.io.evil.test/','https://aipmandy.github.io@evil.test/','https://evil.test/aipmandy.github.io','https://aipmandy.github.io:8443/']:
            self.assertFalse(own_url(bad))
        self.assertTrue(own_url('https://aipmandy.github.io/FreePublish/'))
    def test_sitemap_roots_and_aliases(self):
        paths=sitemap_paths(b'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://aipmandy.github.io/FreePublish/tool.html</loc></url><url><loc>https://evil.test/</loc></url></urlset>')
        self.assertEqual(paths,{'/FreePublish/'})
        self.assertIsNone(canonical_path('https://aipmandy.github.io/../private'))
    def test_public_targets_include_pages_and_known_mirror(self):
        repos={'freepublish':{'name':'FreePublish','has_pages':False},'antigravity-guide':{'name':'antigravity-guide','has_pages':True},'non-site':{'name':'non-site','has_pages':False}}
        rows=targets(repos,'| P0 | [Guide](https://github.com/AIPMAndy/antigravity-guide) |',{'/FreePublish/','/antigravity/','/private/'})
        urls={r['url']:r for r in rows}
        self.assertIn('https://aipmandy.github.io/antigravity/',urls)
        self.assertIn('https://aipmandy.github.io/FreePublish/',urls)
        self.assertNotIn('https://aipmandy.github.io/private/',urls)
        self.assertNotIn('https://aipmandy.github.io/non-site/',urls)
    def test_pdf_sampling(self):
        self.assertEqual(sample_pdf_links('https://aipmandy.github.io/test/',['./guide.pdf','https://elsewhere.test/file.pdf','./guide.pdf#page=2']),['https://aipmandy.github.io/test/guide.pdf'])
        p=PageInfo();p.feed('<html><head><title>Test</title><link rel="canonical" href="/test/"><meta name="viewport" content="width=device-width"></head><body><h1>Title</h1></body></html>')
        self.assertEqual(p.title,'Test');self.assertEqual(p.h1,1);self.assertTrue(p.viewport)
if __name__=='__main__':unittest.main()
