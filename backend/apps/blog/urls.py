from django.urls import path

from .views import *


urlpatterns = [
    path('list', BlogListView.as_view(), name='post-list'),
    path('category/<slug:category_slug>', BlogListCategoryView.as_view()),
    path('detail/<post_slug>', PostDetailView.as_view(), name='post-detail'),
    path('search',SearchBlogView.as_view()),
   
]

