from .models import *
from rest_framework import serializers


class RecursiveField(serializers.Serializer):
    def to_representation(self, value):
        serializer = self.parent.parent.__class__(value, context=self.context)
        return serializer.data

class CategorySerializer(serializers.ModelSerializer):
    ancestors = serializers.SerializerMethodField()
    parent = serializers.SerializerMethodField()

    # Jerarquía recursiva (alias de children)
    sub_categories = RecursiveField(many=True, source='children')

    thumbnail = serializers.ImageField(allow_null=True)
   

    class Meta:
        model = Category
        fields = [
            'id', 'slug', 'name', 'views',
            'sub_categories',  # 👈 children renombrado
            'thumbnail',
            'parent', 'ancestors'
        ]

    def get_ancestors(self, obj):
        ancestors = []
        current = obj.parent
        while current:
            ancestors.insert(0, {
                'id': current.id,
                'slug': current.slug,
                'name': current.name
            })
            current = current.parent
        return ancestors

    def get_parent(self, obj):
        if obj.parent:
            return {
                'id': obj.parent.id,
                'slug': obj.parent.slug,
                'name': obj.parent.name
            }
        return None


    def get_sub_categories(self, obj):
        # Serializa las subcategorías
        children = obj.children.all()
        return CategorySerializer(children, many=True).data

  