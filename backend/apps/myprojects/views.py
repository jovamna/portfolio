from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from apps.myprojects import serializers
from apps.myprojects.models import Project, Category, Tag, Authors, ViewCount
from apps.myprojects.serializers import ProjectListSerializer, ProjectSerializer, CategorySerializer, TagSerializer, AuthorsSerializer, CreateSerializer

from apps.myprojects import models
from apps.user.models import User
from apps.user.serializers import UserSerializer
from .pagination import SmallSetPagination, MediumSetPagination, LargeSetPagination
from rest_framework.permissions import AllowAny




# Create your views here.
class ProjectListView(APIView):
    authentication_classes = []  # Desactiva la autenticación
    permission_classes = [AllowAny]  # Permite el acceso a cualquier usuario
    serializer_classes = serializers.ProjectListSerializer
    

    def get(self, request, format=None):
        if Project.projectobjects.all().exists():

            projects = Project.projectobjects.all()

            paginator = SmallSetPagination()
            results = paginator.paginate_queryset(projects, request)
            serializer = ProjectListSerializer(results, many=True)
            return paginator.get_paginated_response({'projects': serializer.data})
        else:
            return Response({'error': 'No projects found'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




class ProjectDetailView(APIView):
    authentication_classes = []  
    permission_classes = [AllowAny]  
    serializer_classes = serializers.ProjectSerializer
   

    def get(self, request, slug, format=None):
        if Project.objects.filter(slug=slug).exists():

            project = Project.objects.get(slug=slug)
            serializer = ProjectSerializer(project)

            address = request.META.get('HTTP_X_FORWARDED_FOR')
            if address:
                ip = address.split(',')[-1].strip()
            else:
                ip= request.META.get('REMOTE_ADDR')

            if not ViewCount.objects.filter(project=project, ip_address=ip):
                view = ViewCount(project=project, ip_address=ip)
                view.save()
                project.views += 1
                project.save()

            return Response({'project':serializer.data})
        else:
            return Response({'error': 'Project doesnt exist'},
                status=status.HTTP_404_NOT_FOUND)






    













