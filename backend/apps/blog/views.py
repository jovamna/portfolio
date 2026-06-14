from apps.category.models import Category
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models.query_utils import Q
from .serializers import PostSerializer, PostListSerializer
from .pagination import SmallSetPagination, MediumSetPagination
from django.db.models import Sum
from rest_framework.permissions import AllowAny
from django.core.cache import cache
from django.shortcuts import get_object_or_404
from .models import Post, PostViewCount
from apps.reviews.models import  Review
from django.core.cache import cache
from django.db.models import Sum, F
from django.shortcuts import get_object_or_404


#Entrar al VPS
#ssh usuario@tu-servidor
#2. Ir al proyecto
#cd /ruta/de/tu/proyecto
#3. Activar el entorno virtual
#source venv/bin/activate

#4. Abrir el shell de Django
#python manage.py shell
#5. Ejecutar los comandos
#from blog.models import Post, PostViewCount
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
        if Post.post_objects.all().exists():
            
            category = Category.objects.get(slug=category_slug)    
            posts = Post.post_objects.all().filter(category=category)
            #print(posts)
            paginator = SmallSetPagination()
            results = paginator.paginate_queryset(posts, request)
            
            serializer = PostListSerializer(results, many=True)

            return paginator.get_paginated_response({'posts': serializer.data})
        else:
            return Response({'error': 'No posts found'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




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

        post = get_object_or_404(
            Post,
            slug=post_slug
        )

        self.register_view(
            post=post,
            ip=ip
        )
        
        post.refresh_from_db(fields=["views"])

        data = self.get_post_data(post)
  
        # Actualizamos el contador de vistas para que siempre
        # refleje el valor real de la base de datos.
        data["views"] = post.views

        return Response(
            data,
            status=status.HTTP_200_OK
        )
        
        
        
        
        

class originalPostDetailView(APIView):
    authentication_classes = []  # Desactiva autenticación
    permission_classes = [AllowAny]  # Permite acceso a cualquiera

    CACHE_TIMEOUT = 60 * 15  # 15 minutos

    def get(self, request, post_slug, format=None):
        cache_key = f'post_{post_slug}'  # clave única para caché
        cached_response = cache.get(cache_key)

        if cached_response:
            # Devuelve la respuesta cacheada
            return Response(cached_response, status=status.HTTP_200_OK)

        # Si no está en caché, buscamos en la DB
        post = get_object_or_404(Post, slug=post_slug)

        # Calcula total de hearts
        total_hearts = Review.objects.filter(post=post).aggregate(
            total_hearts=Sum('hearts')
        )['total_hearts'] or 0

        serializer = PostSerializer(post)
        serialized_data = serializer.data
        serialized_data['total_hearts'] = total_hearts

        # Contar views por IP
        ip = request.META.get('HTTP_X_FORWARDED_FOR', request.META.get('REMOTE_ADDR')).split(',')[-1].strip()
        if not PostViewCount.objects.filter(post=post, ip_address=ip).exists():
            PostViewCount.objects.create(post=post, ip_address=ip)
            post.views += 1
            post.save(update_fields=['views'])

        #response_data = {'post': serialized_data}
        response_data = serialized_data

        # Guardar la respuesta en caché
        cache.set(cache_key, response_data, self.CACHE_TIMEOUT)

        return Response(response_data, status=status.HTTP_200_OK)
    



    

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