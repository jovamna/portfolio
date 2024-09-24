from .models import *
from rest_framework import serializers

class CategorySerializer(serializers.ModelSerializer):
    #thumbnail=serializers.CharField(source='get_thumbnail', allow_null=True)
    thumbnail = serializers.ImageField(allow_null=True)
    class Meta:
        model=Category
        fields=[
           'slug',
            'name',
            'thumbnail',
        ]
        