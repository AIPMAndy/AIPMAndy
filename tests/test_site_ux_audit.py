import unittest
from scripts.site_ux_audit import sources,assess,choose_home
class UXScanTest(unittest.TestCase):
    def test_home_preference(self):
        self.assertEqual(choose_home({'site/index.html','index.html'}),'site/index.html')
    def test_quality_flags_are_only_warnings(self):
        issues=assess('<title>Demo site</title>','body{color:#000}',{'index.html'},'index.html','P1')
        names=[x['issue'] for x in issues]
        self.assertTrue(any('canonical' in x for x in names))
        self.assertTrue(any('减少动态' in x for x in names))
        self.assertTrue(all(x['severity']>0 for x in issues))
    def test_plan_parser_requires_33_unique(self):
        with self.assertRaises(ValueError):sources('| P0 | fake |')
if __name__=='__main__':unittest.main()
