
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models.query_utils import Q
from .serializers import PostSerializer, PostListSerializer
from .pagination import SmallSetPagination, MediumSetPagination
from django.db.models import Sum
from rest_framework.permissions import AllowAny
from django.core.cache import cache
from .models import Post, PostViewCount
from apps.reviews.models import  Review
from django.core.cache import cache
from django.db.models import Sum, F
from django.shortcuts import get_object_or_404, redirect
from .models import Post, PostSlugHistory
from django.http import Http404
from apps.category.models import Category, CategorySlugHistory
from apps.category.serializers import CategorySerializer



#Entrar al VPS
#ssh usuario@tu-servidor
#2. Ir al proyecto
#cd /ruta/de/tu/proyecto
#3. Activar el entorno virtual
#source venv/bin/activate

#4. Abrir el shell de Django
#python manage.py shell
#5. Ejecutar los comandos
#from apps.blog.models import Post, PostViewCount
#Luego:
#PostViewCount.objects.all().delete()





import logging

logger = logging.getLogger(__name__)




#el postobjects es igual cuanod usamos Posts.objects.all() pero hemos cambiado
#en nuestro model la logiga de objects como postobjects
class BlogListView(APIView):
    authentication_classes = []  # Desactiva la autenticación
    permission_classes = [AllowAny]  # Permite el acceso a cualquier usuario
    def get(self, request, format=None):
        try:
            posts = Post.post_objects.all() #posts=Post.objects.values()-SIN SERIALIZER
            paginator = SmallSetPagination()
            results = paginator.paginate_queryset(posts, request)
            serializer = PostListSerializer(results, many=True)
            print(len(posts))  # Agregar esta línea para depurar
            if not results:
                return Response({'message': 'No posts found'}, status=status.HTTP_200_OK)

            return paginator.get_paginated_response({'posts': serializer.data})
        except Post.DoesNotExist:
            return Response({'message': 'No posts found'}, status=status.HTTP_200_OK)



class BlogListCategoryView(APIView):
    authentication_classes = []  # Desactiva la autenticación
    permission_classes = [AllowAny]  # Permite el acceso a cualquier usuario

    def get(self, request, category_slug, format=None):
        # 1. PASO 1: Intentamos buscar la categoría por su slug actual (Plan A)
        try:
            category = Category.objects.get(slug=category_slug)
            
        except Category.DoesNotExist:
            # 2. PASO 2: Si no existe, buscamos en el historial de categorías (Plan B)
            history = CategorySlugHistory.objects.filter(old_slug=category_slug).select_related('category').first()
            
            if history:
                # ¡La encontramos en el historial! Le avisamos a React para que redirija a la URL nueva
                frontend_url = f"/blog/{history.category.slug}"  # Ajusta la ruta según tu frontend
                return Response({
                    'redirect': True,
                    'frontend_url': frontend_url,
                    'new_slug': history.category.slug,
                    'message': 'La categoría cambió de slug'
                }, status=status.HTTP_308_PERMANENT_REDIRECT)
            
            # 3. PASO 3: Si tampoco está en el historial, entonces no existe de verdad
            return Response(
                {'error': 'La categoría no existe'}, 
                status=status.HTTP_404_NOT_FOUND
            )

        # 4. PASO 4: Si encontramos la categoría (Plan A), filtramos sus posts
        posts = Post.post_objects.filter(category=category)
        
        # Si no hay posts, simplemente devolvemos la lista vacía de forma elegante (sin romper el servidor)
        if not posts.exists():
            return Response({'posts': [], 'message': 'No hay posts en esta categoría'}, status=status.HTTP_200_OK)

        # Paginación y serialización normal
        paginator = SmallSetPagination()
        results = paginator.paginate_queryset(posts, request)
        serializer = PostListSerializer(results, many=True)

        return paginator.get_paginated_response({'posts': serializer.data})
    
class BlogListSubcategoryView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request, category_slug, subcategory_slug, format=None):
        slugs_to_check = [category_slug, subcategory_slug]
        redirect_slugs = {}
        need_redirect = False

        # =========================================================================
        # PASO 1: VALIDAR TODOS LOS SLUGS EN EL HISTORIAL
        # =========================================================================
        for slug in slugs_to_check:
            try:
                Category.objects.get(slug=slug)
                redirect_slugs[slug] = slug
            except Category.DoesNotExist:
                history = CategorySlugHistory.objects.filter(old_slug=slug).select_related('category').first()
                
                if history:
                    redirect_slugs[slug] = history.category.slug
                    need_redirect = True
                else:
                    return Response(
                        {'error': f"El slug '{slug}' no existe en el sistema"}, 
                        status=status.HTTP_404_NOT_FOUND
                    )

        # =========================================================================
        # PASO 2: REDIRECT SI ES NECESARIO
        # =========================================================================
        if need_redirect:
            new_category_slug = redirect_slugs.get(category_slug)
            new_subcategory_slug = redirect_slugs.get(subcategory_slug)
            
            # Construcción correcta de la URL
            frontend_url = f"/blog/{new_category_slug}/{new_subcategory_slug}/"
            
            return Response({
                'redirect': True,
                'frontend_url': frontend_url,
                'new_slugs': [new_category_slug, new_subcategory_slug],
                'message': 'La categoría o subcategoría cambió de slug'
            }, status=status.HTTP_308_PERMANENT_REDIRECT)

        # =========================================================================
        # PASO 3: TODO CORRECTO → LÓGICA NORMAL
        # =========================================================================
        category = Category.objects.get(slug=category_slug)
        subcategory = category.children.get(slug=subcategory_slug)

        try:
            all_subcategories = [subcategory] + list(subcategory.get_all_descendants())
        except AttributeError:
            all_subcategories = [subcategory]

        queryset = Post.post_objects.select_related('category').filter(category__in=all_subcategories)

        paginator = SmallSetPagination()
        results = paginator.paginate_queryset(queryset, request)

        serialized_data = []
        if results is not None:
            for p in results:
                data = PostListSerializer(p).data
                data['type'] = 'digital'
                serialized_data.append(data)

        return paginator.get_paginated_response({
            'category': CategorySerializer(category).data,
            'subcategory': CategorySerializer(subcategory).data,
            'posts': serialized_data
        })    
    

class PostDetailView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    CACHE_TIMEOUT = 60 * 15  # 15 minutos

    def get_client_ip(self, request):
        """
        Obtiene la IP real soportando:
        - Cloudflare
        - Reverse proxies
        - Desarrollo local
        """

        ip = request.META.get("HTTP_CF_CONNECTING_IP")

        if not ip:
            x_forwarded = request.META.get("HTTP_X_FORWARDED_FOR")

            if x_forwarded:
                ip = x_forwarded.split(",")[0].strip()
            else:
                ip = request.META.get("REMOTE_ADDR")

        return ip

    def register_view(self, post, ip):
        """
        Registra una única visita por IP para este post.
        Usa F() para evitar condiciones de carrera.
        """

        already_viewed = PostViewCount.objects.filter(
            post=post,
            ip_address=ip
        ).exists()

        if already_viewed:
            return False

        PostViewCount.objects.create(
            post=post,
            ip_address=ip
        )

        Post.objects.filter(pk=post.pk).update(
            views=F("views") + 1
        )

        post.refresh_from_db(fields=["views"])

        return True

    def get_post_data(self, post):
        """
        Obtiene datos cacheados o los genera si no existen.
        """

        cache_key = f"post_{post.slug}"

        data = cache.get(cache_key)

        if data:
            return data

        total_hearts = (
            Review.objects
            .filter(post=post)
            .aggregate(total_hearts=Sum("hearts"))
            .get("total_hearts")
            or 0
        )

        serializer = PostSerializer(post)

        data = serializer.data
        data["total_hearts"] = total_hearts

        cache.set(
            cache_key,
            data,
            self.CACHE_TIMEOUT
        )

        return data

    def get(self, request, post_slug, format=None):
        ip = self.get_client_ip(request)

        try:
            post = Post.objects.get(slug=post_slug)
            self.register_view(post=post, ip=ip)
            post.refresh_from_db(fields=["views"])
            data = self.get_post_data(post)
            data["views"] = post.views
            return Response(data, status=status.HTTP_200_OK)

        except Post.DoesNotExist:
            # Buscar en historial de slugs antiguos
            history = PostSlugHistory.objects.filter(old_slug=post_slug).select_related('post').first()
        
            if history:
                # ✅ USAR 308 PARA REDIRECCIÓN (más semántico)
                frontend_url = f"/blog/post/{history.post.slug}"
                return Response({
                    'redirect': True,
                    'frontend_url': frontend_url,
                    'new_slugs': [history.post.slug],
                    'message': 'El artículo cambió de slug'
                }, status=status.HTTP_308_PERMANENT_REDIRECT)  # ← CAMBIO IMPORTANTE
            
            # 404 real
            return Response(
                {'error': 'El artículo no existe'}, 
                status=status.HTTP_404_NOT_FOUND
            )






class SearchBlogView(APIView):
    authentication_classes = []  # Desactiva la autenticación
    permission_classes = [AllowAny]  # Permite el acceso a cualquier usuario
    
    def get(self,request,format=None):
    #def get(self,request,search_term):  
        search_term = request.query_params.get('s')  #?s=misterios(search_term)
        logger.info(f"Received search term: {search_term}")
        matches = Post.post_objects.filter(
            Q(title__icontains=search_term) |
            Q(description__icontains=search_term) |
            Q(excerpt__icontains=search_term) |
            Q(content__icontains=search_term) |
            Q(category__name__icontains=search_term)
        )
        logger.info(f"Number of matches found: {len(matches)}")
        print(matches)

        paginator = MediumSetPagination()
        results = paginator.paginate_queryset(matches, request)
        print(results)
        #serializer = PostSerializer(matches, many=True)
        serializer = PostListSerializer(results, many=True)
        response_data = {'filtered_posts': serializer.data}
        logger.info(f"Serialized data: {response_data}")

        return paginator.get_paginated_response({'filtered_posts': serializer.data})
        #return Response({'filtered_posts':serializer.data},status=status.HTTP_200_OK)