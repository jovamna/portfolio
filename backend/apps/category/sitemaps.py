# apps/category/sitemaps.py
from django.contrib.sitemaps import Sitemap
from django.utils import timezone
from .models import Category


class CategorySitemap(Sitemap):
    changefreq = "weekly"
    priority = 0.75

    def items(self):
        # Solo categorías activas / con contenido
        return Category.objects.all().select_related('parent')

    def location(self, obj):
        """Usamos la ruta que realmente tienes en React"""
        return f'/categories/{obj.slug}'

    def lastmod(self, obj):
        # Si no tienes updated_at, usa la fecha actual o agrega el campo
        return timezone.now()