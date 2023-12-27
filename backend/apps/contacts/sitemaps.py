from django.contrib.sitemaps import Sitemap
from .models import Newsletter


class NewsletterSitemap(Sitemap):
    changefreq = "weekly"
    priority = 0.8

    def items(self):
        return Newsletter.objects.all()

    def lastmod(self, obj):
        return obj.updated_at