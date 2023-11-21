from django.shortcuts import render, get_object_or_404
from apps.category.models import Category

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

from django.db.models.query_utils import Q

from .models import Post, PostViewCount
from apps.reviews.models import Review
from .serializers import PostSerializer, PostListSerializer
from .pagination import SmallSetPagination, MediumSetPagination
from django.db.models import Sum

import logging

logger = logging.getLogger(__name__)




#el postobjects es igual cuanod usamos Posts.objects.all() pero hemos cambiado
#en nuestro model la logiga de objects como postobjects
class BlogListView(APIView):
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
    def get(self, request, post_slug,format=None):
        #print(post_slug)
        #print(f"Received request for post_slug: {post_slug}")
        post = get_object_or_404(Post, slug=post_slug)
        # Calcula el total de hearts sumando los valores de hearts de todas las revisiones asociadas a la publicación
        total_hearts = Review.objects.filter(post=post).aggregate(total_hearts=Sum('hearts'))['total_hearts'] or 0
        serializer = PostSerializer(post)
        serialized_data = serializer.data
        serialized_data['total_hearts'] = total_hearts  # Asigna el total de hearts al campo total_hearts
        #print(f"Serialized data: {serialized_data}")
        address = request.META.get('HTTP_X_FORWARDED_FOR')
        if address:
            ip = address.split(',')[-1].strip()
        else:
                ip = request.META.get('REMOTE_ADDR')

        if not PostViewCount.objects.filter(post=post, ip_address=ip):
                view = PostViewCount(post=post,ip_address=ip)
                view.save()
                post.views += 1
                post.save()

        return Response({'post':serializer.data}, status=status.HTTP_200_OK)
   

    

class SearchBlogView(APIView):
    
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