# apps/blog/sitemaps.py
from django.contrib.sitemaps import Sitemap
from .models import Post
from django.conf import settings


class BlogPostSitemap(Sitemap):
    changefreq = "weekly"
    priority = 0.9

    def items(self):
        return Post.post_objects.all()   # Mejor usar tu manager personalizado

   
    
    def location(self, obj):
        return f'/blog/post/{obj.slug}'
    

    def lastmod(self, obj):
        return obj.updated_at

    # Imágenes (muy recomendado)
    def images(self, obj):
        if obj.thumbnail:
            return [{
                'loc': obj.thumbnail.url,
                'title': obj.title,
                'caption': obj.title[:100]
            }]
        return []