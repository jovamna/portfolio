from apps.category.serializers import CategorySerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Category
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny


class ListCategoriesView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request, format=None):
        categories = Category.objects.select_related('parent').all()

        result = []

        # 1. Filtrar solo categorías padre
        parents = [cat for cat in categories if cat.parent is None]

        for parent in parents:
            item = {
                'slug': parent.slug,
                'name': parent.name,
                'thumbnail': parent.thumbnail.url if parent.thumbnail else None,
                'sub_categories': []
            }

            # 2. Subcategorías
            for cat in categories:
                if cat.parent and cat.parent.slug == parent.slug:
                    item['sub_categories'].append({
                        'slug': cat.slug,
                        'name': cat.name,
                        'thumbnail': cat.thumbnail.url if cat.thumbnail else None,
                    })

            result.append(item)

        return Response({'categories': result}, status=status.HTTP_200_OK)
