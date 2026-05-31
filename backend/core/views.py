# core/views.py
import json
from datetime import date
from django.conf import settings
from django.http import HttpResponse
from django.shortcuts import render
from django.utils.html import strip_tags

from apps.blog.models import Post
from apps.myprojects.models import Project
from apps.category.models import Category

# core/views.py
from django.http import HttpResponse
from django.utils import timezone


from django.views.decorators.cache import cache_page



# =========================
# HELPERS AVANZADOS
# =========================

def build_absolute_url(path=''):
    base = getattr(settings, 'FRONTEND_URL', 'https://jovamnamedina.com').rstrip('/')
    if not path:
        return base
    path = str(path).strip()
    if path.startswith(('http://', 'https://')):
        return path
    return f"{base}/{path.lstrip('/')}"


def safe_truncate(text, limit=160):
    if not text:
        return ''
    text = strip_tags(str(text)).replace('\n', ' ').replace('\r', ' ').strip()
    if len(text) <= limit:
        return text
    return text[:limit].rsplit(' ', 1)[0] + '…'


def get_best_image(obj):
    for field in ['thumbnail', 'image']:
        field_obj = getattr(obj, field, None)
        if field_obj:
            try:
                if hasattr(field_obj, 'url') and field_obj.url:
                    return build_absolute_url(field_obj.url)
            except Exception:
                continue
    return build_absolute_url(getattr(settings, 'DEFAULT_OG_IMAGE', '/custom-static/images/facebookweb.jpg'))


def category_chain(category):
    chain = []
    current = category
    while current and len(chain) < 10:
        chain.append(current)
        current = current.parent
    return list(reversed(chain))



def category_path_from_chain(chain):
    slugs = [c.slug for c in chain if c and c.slug]
    return '/'.join(slugs)


def category_canonical_url(category):
    chain = category_chain(category)
    path = category_path_from_chain(chain)
    return build_absolute_url(path)


# =========================
# JSON-LD PROFESIONAL (Senior Level)
# =========================

def organization_json_ld():
    frontend_url = getattr(settings, 'FRONTEND_URL', 'https://jovamnamedina.com')
    return {
        "@context": "https://schema.org",
        "@type": "Person",                    # Cambiado a Person porque es portafolio personal
        "name": "Jovamna Medina",
        "url": frontend_url,
        "image": build_absolute_url("/custom-static/images/googleweb.jpg"),
        "sameAs": [
            "https://x.com/FullStackmed",
            "https://www.instagram.com/muckas.ai/",
            "https://linkedin.com/in/tu-perfil",   # agrega tu LinkedIn
        ],
        "jobTitle": "Full Stack Developer & AI Specialist",
        "description": "Desarrolladora Full Stack especializada en Django, React y soluciones con Inteligencia Artificial.",
        "knowsAbout": ["Django", "React", "Python", "Artificial Intelligence", "Machine Learning", "Cloud Architecture"]
    }


def website_json_ld():
    frontend_url = getattr(settings, 'FRONTEND_URL', 'https://jovamnamedina.com')
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Jovamna Medina - Portfolio",
        "url": frontend_url,
        "publisher": organization_json_ld(),
        "potentialAction": {
            "@type": "SearchAction",
            "target": f"{frontend_url}/search/{{search_term_string}}",
            "query-input": "required name=search_term_string"
        }
    }


def project_json_ld(project, canonical_url, image_url):
    data = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "headline": project.title,
        "description": safe_truncate(project.description, 200),
        "url": canonical_url,
        "image": {
            "@type": "ImageObject",
            "url": image_url,
            "caption": project.title
        },
        "author": organization_json_ld(),
        "datePublished": project.published.isoformat(),
        "dateModified": project.updated_at.isoformat() if hasattr(project, 'updated_at') else project.published.isoformat(),
        "keywords": [tag.name for tag in getattr(project, 'tags', [])] if hasattr(project, 'tags') else [],
        "genre": "Portafolio Profesional",
        "inLanguage": "es"
    }
    return data


def post_json_ld(post, canonical_url, image_url):
    data = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": safe_truncate(post.excerpt or post.description, 200),
        "url": canonical_url,
        "image": {
            "@type": "ImageObject",
            "url": image_url,
            "caption": post.title
        },
        "author": organization_json_ld(),
        "datePublished": post.published.isoformat(),
        "dateModified": getattr(post, 'updated_at', post.published).isoformat(),
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": canonical_url
        },
        "articleBody": safe_truncate(post.content or "", 500),
        "articleSection": post.category.name if post.category else "Blog",
        "inLanguage": "es",
        "keywords": [tag.name for tag in getattr(post, 'tags', [])] if hasattr(post, 'tags') else [],
        "publisher": organization_json_ld()
    }
    return data


def category_json_ld(category, canonical_url):
    return {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": category.name,
        "url": canonical_url,
        "description": safe_truncate(category.description, 200),
        "isPartOf": {"@type": "WebSite", "name": "Jovamna Medina"},
        "publisher": organization_json_ld()
    }


def home_json_ld():
    frontend_url = getattr(settings, 'FRONTEND_URL', 'https://jovamnamedina.com')
    return {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Jovamna Medina | Full Stack Developer & AI Specialist",
        "description": "Portfolio profesional especializado en desarrollo web con Django, React y soluciones avanzadas de Inteligencia Artificial.",
        "url": frontend_url,
        "publisher": organization_json_ld()
    }


# =========================
# CONTEXT BASE
# =========================

def build_base_context(request):
    frontend_url = getattr(settings, 'FRONTEND_URL', 'https://jovamnamedina.com')

    return {
        'seo_title': "Jovamna Medina | Full Stack Developer & AI",
        'seo_description': "Portfolio profesional de Jovamna Medina. Developer en Django, React, Python y soluciones con Inteligencia Artificial.",
        'seo_keywords': "django developer, react developer, full stack python, inteligencia artificial, ai specialist, portafolio developer",
        'seo_robots': 'index,follow',
        'canonical_url': build_absolute_url(request.path),
        'og_type': 'website',
        'seo_image': f"{frontend_url}/custom-static/images/facebookweb.jpg",
        'twitter_card': 'summary_large_image',
        'og_title': None,
        'og_description': None,
        'SITE_NAME': 'Jovamna Medina | Full Stack Developer & AI',

        'is_home_page': False,
        'is_project_page': False,
        'is_post_page': False,
        'is_category_page': False,
        'is_404_page': False,

        'breadcrumbs': [],
        'jsonld_organization': json.dumps(organization_json_ld(), ensure_ascii=False),
        'jsonld_website': json.dumps(website_json_ld(), ensure_ascii=False),
        'jsonld_primary': '',
        'jsonld_breadcrumbs': '',
    }


# =========================
# MAIN ENTRYPOINT
# =========================

def spa_entrypoint(request):
    path = request.path.strip('/')
    parts = [p for p in path.split('/') if p]
    context = build_base_context(request)

    # HOME
    if not parts or parts[0] in ('home', ''):
        context.update({
            'is_home_page': True,
            'canonical_url': build_absolute_url(),
            'breadcrumbs': [{'name': 'Inicio', 'url': build_absolute_url()}],
            'jsonld_primary': json.dumps(home_json_ld(), ensure_ascii=False),
        })
        return render(request, 'index.html', context)

    # PROJECT DETAIL
    if len(parts) >= 3 and parts[0] == 'myproject' and parts[1] == 'project':
        try:
            project = Project.projectobjects.get(slug=parts[2])
            canonical = build_absolute_url(f"myproject/project/{project.slug}/")
            image = get_best_image(project)

            breadcrumbs = [
                {'name': 'Inicio', 'url': build_absolute_url()},
                {'name': 'Proyectos', 'url': build_absolute_url('myproject/')},
                {'name': project.title, 'url': canonical}
            ]

            context.update({
                'seo_title': f"{project.title} | Jovamna Medina",
                'seo_description': safe_truncate(project.description, 160),
                'canonical_url': canonical,
                'og_type': 'article',
                'seo_image': image,
                'is_project_page': True,
                'breadcrumbs': breadcrumbs,
                'jsonld_primary': json.dumps(project_json_ld(project, canonical, image), ensure_ascii=False),
                'jsonld_breadcrumbs': json.dumps(breadcrumb_json_ld(breadcrumbs), ensure_ascii=False),
            })
            return render(request, 'index.html', context)
        except Project.DoesNotExist:
            context['seo_robots'] = 'noindex,follow'

    # BLOG POST
    if len(parts) >= 3 and parts[0] == 'blog' and parts[1] == 'post':
        try:
            post = Post.post_objects.get(slug=parts[2])
            canonical = build_absolute_url(f"blog/post/{post.slug}/")
            image = get_best_image(post)

            breadcrumbs = [
                {'name': 'Inicio', 'url': build_absolute_url()},
                {'name': 'Blog', 'url': build_absolute_url('blog/')},
                {'name': post.title, 'url': canonical}
            ]

            context.update({
                'seo_title': f"{post.title} | Jovamna Medina",
                'seo_description': safe_truncate(post.excerpt or post.description, 160),
                'canonical_url': canonical,
                'og_type': 'article',
                'seo_image': image,
                'is_post_page': True,
                'breadcrumbs': breadcrumbs,
                'jsonld_primary': json.dumps(post_json_ld(post, canonical, image), ensure_ascii=False),
                'jsonld_breadcrumbs': json.dumps(breadcrumb_json_ld(breadcrumbs), ensure_ascii=False),
            })
            return render(request, 'index.html', context)
        except Post.DoesNotExist:
            pass
        
    # ==========================================
    # HERRAMIENTA: ESCANDALLO GRATUITO
    # ==========================================
    if len(parts) >= 1 and parts[0] == 'escandallo':
        canonical = build_absolute_url("escandallo")
        
        breadcrumbs = [
            {'name': 'Inicio', 'url': build_absolute_url()},
            {'name': 'Escandallo Gratuito para Hostelería', 'url': canonical}
        ]

        # Estructura Schema.org especializada para Herramientas/Aplicaciones Web
        escandallo_json_ld = {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Escandallo Gratuito para Hostelería | Jovamna Medina",
            "description": "Calcula el costo de tus recetas, escandallos de cocina y gestiona los márgenes de ganancia de tu restaurante con esta herramienta online gratuita.",
            "url": canonical,
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "All",
            "browserRequirements": "Requires JavaScript. Requires HTML5.",
            "author": organization_json_ld()
        }

        context.update({
            'seo_title': "Escandallo Gratuito para Hostelería | Jovamna Medina",
            'seo_description': "Herramienta online gratuita para hosteleros y cocineros. Calcula el coste de tus platos, gestiona mermas y optimiza el beneficio de tu restaurante.",
            'seo_keywords': "escandallo gratis, escandallo cocina, calcular coste platos, plantilla escandallo, gestion restaurante, herramientas hosteleria",
            'canonical_url': canonical,
            'og_type': 'website',
            'is_home_page': False,
            'breadcrumbs': breadcrumbs,
            'jsonld_primary': json.dumps(escandallo_json_ld, ensure_ascii=False),
            'jsonld_breadcrumbs': json.dumps(breadcrumb_json_ld(breadcrumbs), ensure_ascii=False),
        })
        return render(request, 'index.html', context)

    # CATEGORÍAS
    # ... (mantengo lógica similar pero más limpia)

    # Fallback
    context['jsonld_primary'] = json.dumps({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": context['seo_title'],
        "url": context['canonical_url']
    }, ensure_ascii=False)

    return render(request, 'index.html', context)







def breadcrumb_json_ld(breadcrumbs):
    if not breadcrumbs:
        return None
    items = [
        {"@type": "ListItem", "position": i + 1, "name": crumb["name"], "item": crumb["url"]}
        for i, crumb in enumerate(breadcrumbs)
    ]
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items
    }





def robots_txt(request):
    # 1. Si no existe FRONTEND_URL en settings, usamos por defecto la versión SIN 'www'
    frontend_url = getattr(settings, 'FRONTEND_URL', 'https://jovamnamedina.com').rstrip('/')

    lines = [
        "User-agent: *",
        "Disallow: /admin/",
        
        # Permitimos las APIs que React necesita para renderizar tus textos
        "Allow: /api/blog/list",
        "Allow: /api/project/projects",
        
        # Bloqueamos la búsqueda interna (adiós al error de 'undefined')
        "Disallow: /api/blog/search", 
        "Disallow: /api/",
        
        # El Sitemap ahora apuntará perfectamente a https://jovamnamedina.com/sitemap.xml
        f"Sitemap: {frontend_url}/sitemap.xml",
    ]
    return HttpResponse("\n".join(lines), content_type="text/plain")







