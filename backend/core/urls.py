from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.conf import settings
from rest_framework.documentation import include_docs_urls
from django.contrib.sitemaps.views import sitemap
from apps.blog.sitemaps import BlogPostSitemap
from apps.myprojects.sitemaps import ProjectSitemap
from django.shortcuts import render
from core.settings.base import SECRET_ADMIN_URL
from django.contrib.sitemaps.views import index as sitemap_index, sitemap
from core.views import spa_entrypoint, robots_txt


from apps.category.sitemaps import CategorySitemap   # ← Nuevo
from core.sitemaps import StaticPagesSitemap         # ← Nuevo

# ===================== SITEMAPS REGISTRY =====================
sitemaps = {
    'static': StaticPagesSitemap,      # Páginas estáticas (home, contacto, etc.)
    'blog': BlogPostSitemap,
    'projects': ProjectSitemap,
    'categories': CategorySitemap,
}



#ES DE REACT ISTALARLO EN SU TERMINAL
#PARECE QUE ES SOLO PARA LOCAL
#npm i baseline-browser-mapping@latest -D






urlpatterns = [
        # SEO files
    path("robots.txt", robots_txt, name="robots_txt"),
  
    
    
    # Sitemap Index (Principal)
    path('sitemap.xml', sitemap_index, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.index'),
    
    #path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap'),
    
    # Sitemaps individuales
    path('sitemap-<section>.xml', sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap'),

    # Admin
    path(f"{SECRET_ADMIN_URL}/admin/", admin.site.urls),

    # APIs
    path('api/user/', include('apps.user.urls')),
    path('api/project/', include('apps.myprojects.urls')),
    path('api/blog/', include('apps.blog.urls')),
    path('api/category/', include('apps.category.urls')),
    path('api/reviews/', include('apps.reviews.urls')),
    path('docs/', include_docs_urls(title='Portfolio API')),
    path('api/chatbot/', include('apps.chatbot.urls')),
    path('api/contacts/', include('apps.contacts.urls')),

  
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)






# Catch-all SPA
urlpatterns += [
    re_path(
        r'^(?!api/|admin/|static/|media/|tinymce/|sitemap-.*\.xml$|sitemap\.xml$|robots\.txt$).*$',
        spa_entrypoint,
        name='spa_fallback'
    ),
    
]


def error_404_view(request, exception):
    return render(request, '404.html', status=404)


handler404 = 'core.urls.error_404_view'



#urlpatterns += [re_path(r'^.*',
                        #TemplateView.as_view(template_name='index.html'))]  #PARA CONECTAR REACT

#urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)