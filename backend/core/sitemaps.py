# core/sitemaps.py
# core/sitemaps.py
from django.contrib.sitemaps import Sitemap
from django.utils import timezone


class StaticPagesSitemap(Sitemap):
    changefreq = "monthly"
    priority = 0.8

    def items(self):
        return [
            '/', 
            '/myproject/', 
            '/blog/', 
            '/contacto/',
            '/politica-cookies/',
            
            '/escandallo',
            '/hosteleria-ficha-tecnica',
            '/calcula-irpf',
        ]

    def location(self, item):
        return item

    def lastmod(self, item):
        return timezone.now()