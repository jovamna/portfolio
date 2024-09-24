from django.urls import path
from .views import *
from django.views.decorators.csrf import csrf_exempt



app_name = 'reviews'

urlpatterns = [
    path('get-reviews/<slug>', GetPostReviewsView.as_view()),
    path('get-review/<int:review_id>', GetPostReviewView.as_view(), name='review-detail'),
    path('create-review/<slug>', CreatePostReviewView.as_view(), name='create-review'),
    path('update-review/<slug>/<int:review_id>', UpdatePostReviewView.as_view(), name='edit-review'),
    path('delete-review/<int:review_id>', DeletePostReviewView.as_view(), name='delete-review'),
    path('filter-reviews/<slug>', FilterPostReviewsView.as_view()),
   
      

]
   
  