from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.conf import settings
from rest_framework.documentation import include_docs_urls
from django.contrib.sitemaps.views import sitemap
from apps.blog.sitemaps import BlogPostSitemap
from apps.myprojects.sitemaps import ProjectSitemap
from apps.contacts.sitemaps import NewsletterSitemap




sitemaps = {
    'blog': BlogPostSitemap,
    'projects': ProjectSitemap,
    'newsletter': NewsletterSitemap,
}




urlpatterns = [
    path('api/user/', include('apps.user.urls')),
    path('api/project/', include('apps.myprojects.urls')),
    path('api/blog/', include('apps.blog.urls')),
    path('api/category/', include('apps.category.urls')),
    path('api/reviews/', include('apps.reviews.urls')),
    path('docs/', include_docs_urls(title='Portfolio API')),
    path('api/chatbot/', include('apps.chatbot.urls')),
    path('api/contacts/', include('apps.contacts.urls')),
    path(settings.ADMIN_URL, admin.site.urls),
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap'),
  
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [re_path(r'^.*',
                        TemplateView.as_view(template_name='index.html'))]  #PARA CONECTAR REACT

#urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)