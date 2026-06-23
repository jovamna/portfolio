from django.contrib.sitemaps import Sitemap
from .models import Project
from django.conf import settings


class ProjectSitemap(Sitemap):
    changefreq = "weekly"
    priority = 0.8

    def items(self):
        return Project.projectobjects.all()
    
 
    def location(self, obj):
        return f"/myproject/project/{obj.slug}"
        
    def lastmod(self, obj):
        return obj.published
