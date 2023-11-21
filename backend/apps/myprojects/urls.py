from django.urls import path, include
from apps.myprojects import views
from .views import *

app_name = 'myprojects'

urlpatterns = [
    
     path('list' ,ProjectListView.as_view()),
     path('<slug>', ProjectDetailView.as_view()),
     #path('create', CreateProjectView.as_view()),
    
]
