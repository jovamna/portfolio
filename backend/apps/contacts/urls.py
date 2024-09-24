from django.urls import path
from .views import *
from django.urls import path
#from .views import SendNewsletterView

from . import views



urlpatterns = [
    path('', ContactCreateView.as_view()),
    path('subscribe', SubscribeView.as_view(), name='subscribe'),
    path('admin/send-newsletter/<int:newsletter_id>/', SendNewsletterView.as_view(), name='send_newsletter'),


    path('newsletters/', CreateNewsletterView.as_view(), name='create-newsletter'),
    path('newsletters/edit/<int:newsletter_id>/', EditNewsletterView.as_view(), name='edit-newsletter'),
    path('newsletters/delete/<int:newsletter_id>/', DeleteNewsletterView.as_view(), name='delete-newsletter'),


    path('unsubscribe/<str:email>/<str:token>/', views.unsubscribe_view, name='unsubscribe'),
    #path('unsubscribe/<str:email>/', views.unsubscribe_view, name='unsubscribe'),
    #path('send-newsletter', SendNewsletterView.as_view(), name='send-newsletter'),
]
