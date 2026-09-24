import os
import unittest

from mysite import app


class PortfolioAppTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.previous_site_url = os.environ.get("SITE_URL")
        os.environ["SITE_URL"] = "https://portfolio.example"
        app.config.update(TESTING=True)
        cls.client = app.test_client()

    @classmethod
    def tearDownClass(cls):
        if cls.previous_site_url is None:
            os.environ.pop("SITE_URL", None)
        else:
            os.environ["SITE_URL"] = cls.previous_site_url

    def get(self, path):
        response = self.client.get(path)
        self.addCleanup(response.close)
        return response

    def test_portfolio_routes_render_prerendered_content(self):
        expected_titles = {
            "/": "Edgardo Paz-Romero | Software Engineer",
            "/about-me": "About | Edgardo Paz-Romero",
            "/experience": "Experience | Edgardo Paz-Romero",
            "/projects": "Projects | Edgardo Paz-Romero",
        }

        for path, title in expected_titles.items():
            with self.subTest(path=path):
                response = self.get(path)
                self.assertEqual(response.status_code, 200)
                self.assertIn(b"Edgardo Paz-Romero.", response.data)
                self.assertIn(f"<title>{title}</title>".encode(), response.data)

    def test_accessibility_landmarks_and_controls_are_present(self):
        response = self.get("/")
        html = response.get_data(as_text=True)

        self.assertIn('class="skip-link" href="#root"', html)
        self.assertIn('<main id="root" tabindex="-1">', html)
        self.assertIn('<details class="mobile-nav">', html)
        self.assertIn('role="tablist"', html)
        self.assertIn('role="tabpanel"', html)
        self.assertIn("prefers-reduced-motion", self.get("/static/css/main.css").get_data(as_text=True))

    def test_compiled_assets_replace_runtime_transpilation(self):
        response = self.get("/")
        html = response.get_data(as_text=True)

        self.assertNotIn("babel.min.js", html)
        self.assertNotIn("text/babel", html)
        self.assertIn("/static/dist/app.js", html)
        self.assertEqual(self.get("/static/dist/app.js").status_code, 200)
        self.assertEqual(self.get("/static/css/main.css").status_code, 200)

    def test_crawler_endpoints_use_configured_site_url(self):
        robots = self.get("/robots.txt")
        sitemap = self.get("/sitemap.xml")

        self.assertEqual(robots.status_code, 200)
        self.assertEqual(robots.mimetype, "text/plain")
        self.assertIn(
            "Sitemap: https://portfolio.example/sitemap.xml",
            robots.get_data(as_text=True),
        )

        self.assertEqual(sitemap.status_code, 200)
        self.assertEqual(sitemap.mimetype, "application/xml")
        sitemap_xml = sitemap.get_data(as_text=True)
        for path in ("/", "/about-me", "/experience", "/projects"):
            self.assertIn(f"https://portfolio.example{path}", sitemap_xml)


if __name__ == "__main__":
    unittest.main()
