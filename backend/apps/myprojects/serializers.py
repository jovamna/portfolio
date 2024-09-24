from rest_framework import serializers

from apps.myprojects.models import Project, Category, Tag, Authors

from apps.user.serializers import UserSerializer

from django.utils.html import strip_tags





class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['name']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name', 'thumbnail']


class AuthorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Authors
        fields = ['name']




class ProjectListSerializer(serializers.ModelSerializer):
    authors = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
    )

    category = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
    )

    tags = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
    )


    class Meta:
        model= Project
        fields = [
            'author',
            'title',
            'description',
            'slug', 
            'url', 
            'category',
            'tags', 
            'authors', 
            'published', 
            'views', 
          'status', 
        ]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['description'] = strip_tags(instance.description)
        return data
        





class ProjectSerializer(serializers.ModelSerializer):
    authors = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
    )
  

    category = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
    )

    tags = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
    )


    class Meta:
        model= Project
        fields = [
            'author',
            'title',
            'description', 
            'slug', 
            'url', 
            'category',
            'tags', 
            'authors', 
            'published', 
            'views', 
            'status', 
             ]


class CreateSerializer(serializers.ModelSerializer):
  
    class Meta: 
        model=Project
        fields=[
            'id',
            'author',
            'title',
            'thumbnail',
            'description',
            'published',
            'slug',
            'authors',
            'category',
            'tags',
            'status',
          
        ]

    
    def to_representation(self, instance):
        self.fields['user'] = UserSerializer(read_only=True)
        return super(CreateSerializer, self).to_representation(instance)

    def create(self, validated_data):
        category = validated_data.pop('category', [])

        obj= super().create(validated_data)

        if category:
            obj.category.set(category)

        return obj 
