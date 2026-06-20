from django.urls import path

from .views import *


urlpatterns = [
    path('categories', ListCategoriesView.as_view()),
    path('<slug:categorySlug>/', CategoryDetailView.as_view(), name='category-detail-slug'),
    # Categoría + subcategoría
    path('<slug:categorySlug>/<slug:subcategorySlug>/', CategoryDetailView.as_view(), name='subcategory-detail'),
    # Categoría + subcategoría + child
]
