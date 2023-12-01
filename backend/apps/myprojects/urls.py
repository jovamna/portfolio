from django.urls import path, include
from apps.myprojects import views
from .views import *

app_name = 'myprojects'

urlpatterns = [
    
     path('projects', ProjectListView.as_view(), name='project-list'),
     path('<slug>', ProjectDetailView.as_view()),
 
    
]
