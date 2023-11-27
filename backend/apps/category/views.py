from apps.category.serializers import CategorySerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Category
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny


class ListCategoriesView(APIView):
    authentication_classes = []  # Desactiva la autenticación
    permission_classes = [AllowAny]  # Permite el acceso a cualquier usuario

    def get(self, request, format=None):
        if Category.objects.all().exists():
            categories = Category.objects.all()

            result = []

            for category in categories:
                if not category.parent:
                    item = {}
                    item['slug'] = category.slug
                    item['name'] = category.name
                    # Verifica si la imagen (thumbnail) está presente antes de obtener la URL
                if category.thumbnail:
                    item['thumbnail'] = category.thumbnail.url
                else:
                    item['thumbnail'] = None

                item['sub_categories'] = []

                for cat in categories:
                    sub_item = {}
                    if cat.parent and cat.parent.slug== category.slug:
                        sub_item['slug'] = cat.slug
                        sub_item['name'] = cat.name

                        # Verifica si la imagen (thumbnail) está presente antes de obtener la URL
                        if cat.thumbnail:
                            sub_item['thumbnail'] = cat.thumbnail.url
                        else:
                            sub_item['thumbnail'] = None

                        item['sub_categories'].append(sub_item)

                result.append(item)

        return Response({'categories': result}, status=status.HTTP_200_OK)