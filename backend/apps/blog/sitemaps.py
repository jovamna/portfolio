from django.contrib.sitemaps import Sitemap
from .models import Post
from apps.category.models import Category
from django.utils import timezone # ⬅️ IMPORTANTE: Importa timezone


class BlogPostSitemap(Sitemap):
    changefreq = "weekly"
    priority = 0.8

    def items(self):
        # ⬅️ Vuelve a filtrar solo por publicados
        return Post.objects.filter(status='published')
    
    def location(self, obj):
        return f'/blog/post/{obj.slug}'

    def lastmod(self, obj):
        # Usa updated_at, ya que está garantizado que no es nulo (auto_now=True)
        # No necesitas la lógica de respaldo if/else si el campo es auto_now=True.
        return obj.updated_at
    
    
class BlogCategorySitemap(Sitemap):
    changefreq = "monthly"
    priority = 0.6
    
    def items(self):
        return Category.objects.all()

    def location(self, obj):
        return f'/categories/{obj.slug}'