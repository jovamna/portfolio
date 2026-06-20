from apps.category.serializers import CategorySerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

from django.shortcuts import get_object_or_404
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny
from .models import Category, CategorySlugHistory
from django.http import Http404

import logging

logger = logging.getLogger(__name__)










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


class CategoryDetailView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, *args, **kwargs):
        logger.info("=" * 50)
        categorySlug = kwargs.get('categorySlug')
        subcategorySlug = kwargs.get('subcategorySlug')

        # ============================================
        # 1. VALIDACIÓN BÁSICA
        # ============================================
        if not categorySlug:
            return Response(
                {'error': 'Category Slug required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # ============================================
        # 2. PREPARAR SLUGS A VERIFICAR
        # ============================================
        slugs_to_check = [s for s in [categorySlug, subcategorySlug] if s]
        redirect_slugs = {}
        need_redirect = False

        # ============================================
        # 3. VERIFICAR CADA SLUG (actual o histórico)
        # ============================================
        for slug in slugs_to_check:
            try:
                # Intentar obtener categoría actual
                category = Category.objects.get(slug=slug)
                redirect_slugs[slug] = slug
                logger.info(f"✅ Slug '{slug}' encontrado como categoría actual")
                
            except Category.DoesNotExist:
                # Buscar en historial
                history = (
                    CategorySlugHistory.objects
                    .filter(old_slug=slug)
                    .select_related('category')
                    .first()
                )

                if history:
                    redirect_slugs[slug] = history.category.slug
                    need_redirect = True
                    logger.info(f"🔄 Slug '{slug}' redirige a '{history.category.slug}'")
                else:
                    logger.error(f"❌ Slug '{slug}' no encontrado en ninguna parte")
                    return Response(
                        {'error': f"Slug '{slug}' no encontrado"}, 
                        status=status.HTTP_404_NOT_FOUND
                    )

        # ============================================
        # 4. SI HAY REDIRECCIÓN, DEVOLVERLA
        # ============================================
        if need_redirect:
            new_path_parts = [redirect_slugs.get(slug, slug) for slug in slugs_to_check]
            
            # ✅ CON /blog/ para tu frontend
            frontend_url = '/blog/' + '/'.join(new_path_parts)

            logger.info(f"🔄 Redirigiendo a: {frontend_url}")
            
            return Response({
                'redirect': True,
                'frontend_url': frontend_url,
                'new_slugs': new_path_parts,
                'message': 'URL movida permanentemente'
            }, status=status.HTTP_308_PERMANENT_REDIRECT)

        # ============================================
        # 5. SI NO HAY REDIRECCIÓN, DEVOLVER LA CATEGORÍA
        # ============================================
        # ¡ESTA ES LA PARTE QUE TE FALTABA!
        try:
            target_slug = slugs_to_check[-1]
            current_category = Category.objects.get(slug=target_slug)
            
            # Serializar con contexto
            serializer = CategorySerializer(current_category, context={'request': request})
            
            logger.info(f"✅ Categoría encontrada: {current_category.name}")
            
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        except Category.DoesNotExist:
            logger.error(f"❌ Categoría con slug '{target_slug}' no encontrada")
            return Response(
                {'error': f"Category with slug '{target_slug}' not found"},
                status=status.HTTP_404_NOT_FOUND
            )




    permission_classes = (permissions.AllowAny,)

    def get(self, request, *args, **kwargs):
        logger.info("=" * 50)
        categorySlug = kwargs.get('categorySlug')
        subcategorySlug = kwargs.get('subcategorySlug')

        if not categorySlug:
            return Response(
                {'error': 'Category Slug required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        slugs_to_check = [s for s in [categorySlug, subcategorySlug] if s]
        redirect_slugs = {}
        need_redirect = False

        # Comprobar todos los slugs en el historial
        for slug in slugs_to_check:
            try:
                category = Category.objects.get(slug=slug)
                redirect_slugs[slug] = slug
            except Category.DoesNotExist:
                history = (
                    CategorySlugHistory.objects
                    .filter(old_slug=slug)
                    .select_related('category')
                    .first()
                )

                if history:
                    redirect_slugs[slug] = history.category.slug
                    need_redirect = True
                else:
                    return Response(
                        {'error': f"Slug '{slug}' no encontrado"}, 
                        status=status.HTTP_404_NOT_FOUND
                    )

        # REDIRECT SI HACE FALTA
        if need_redirect:
            new_path_parts = [redirect_slugs.get(slug, slug) for slug in slugs_to_check]
            frontend_url = '/' + '/'.join(new_path_parts) + '/'

            return Response({
                'redirect': True,
                'frontend_url': frontend_url,
                'new_slugs': new_path_parts,
                'message': 'URL movida permanentemente'
            }, status=status.HTTP_308_PERMANENT_REDIRECT)

        # =========================================================================
        # ¡AQUÍ ESTÁ LA MAGIA CORREGIDA CON EL SERIALIZER!
        # =========================================================================
        target_slug = slugs_to_check[-1]
        current_category = Category.objects.get(slug=target_slug)
        
        # 1. Pasamos el objeto por tu CategorySerializer pasándole el contexto de la petición
        serializer = CategorySerializer(current_category, context={'request': request})
        
        # 2. Respondemos con los datos del serializador (que ya incluyen parent y sub_categories)
        return Response(serializer.data, status=status.HTTP_200_OK)