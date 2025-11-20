from unicodedata import category
from rest_framework import serializers
from .models import Post
from apps.category.serializers import CategorySerializer

class PostSerializer(serializers.ModelSerializer):
    total_hearts = serializers.IntegerField(read_only=True)
    thumbnail=serializers.CharField(source='get_thumbnail')
    video=serializers.CharField(source='get_video')
    image=serializers.CharField(source='get_image')
    category=CategorySerializer()
    class Meta:
        model=Post
        fields=[   
            'title',
            'slug',
            'thumbnail',
            'video',
            'description',
            'narrative',
            'excerpt',
            'image',
            'content',
            'category',
            'published',
            'status',
            'author',
            'total_hearts',
             'blog_uuid',
             'views'
        ]



class PostListSerializer(serializers.ModelSerializer):
    category=CategorySerializer()
    class Meta: 
        model=Post
        fields=[
            'id',
            'title',
            'slug',
            'excerpt',
            'video',
            'thumbnail',
            'description',
            'published',
            'views',
            'category',
            'status'
        ]