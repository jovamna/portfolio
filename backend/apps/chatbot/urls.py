
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ChatbotViewSet
from rest_framework import routers






#router = DefaultRouter()
#router.register(r'chat', ChatbotViewSet, basename='chat')
#urlpatterns = router.urls


#FUNCIONA
router = routers.DefaultRouter()
router.register('chat', ChatbotViewSet)

app_name = 'chatbot'


urlpatterns = [
    path('', include(router.urls)),
   

]