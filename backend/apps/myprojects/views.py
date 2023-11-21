from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status
from django.shortcuts import get_object_or_404
from apps.myprojects import serializers
#from slugify import slugify
from apps.myprojects.models import Project, Category, Tag, Authors, ViewCount
from apps.myprojects.serializers import ProjectListSerializer, ProjectSerializer, CategorySerializer, TagSerializer, AuthorsSerializer, CreateSerializer

from apps.myprojects import models

from apps.user.models import User
from apps.user.serializers import UserSerializer
#from rest_framework import generic

from .pagination import SmallSetPagination, MediumSetPagination, LargeSetPagination


# Create your views here.
class ProjectListView(APIView):
    serializer_classes = serializers.ProjectListSerializer
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        if Project.projectobjects.all().exists():

            projects = Project.projectobjects.all()

            paginator = SmallSetPagination()
            results = paginator.paginate_queryset(projects, request)
            serializer = ProjectListSerializer(results, many=True)
            #serializer = ProjectListSerializer(projects, many=True)
            #return Response({'projects': serializer.data})
            return paginator.get_paginated_response({'projects': serializer.data})
        else:
            return Response({'error': 'No projects found'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




class ProjectDetailView(APIView):
    serializer_classes = serializers.ProjectSerializer
    permission_classes = (permissions.AllowAny,)

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






    








def post(self, request):
        user_serialized = UserSerializer(request.user)
        payload={
            **request.data,
            **user_serialized.data}
        print(payload)
        serializer_event = ProjectSerializer(data=request.data)

        if serializer_event.is_valid(raise_exception=True):
          print(serializer_event.validated_data)
        serializer_event.save(author=request.user)
        print(serializer_event.save(author=request.user))
        return Response(serializer_event.data, status=status.HTTP_201_CREATED)
        print(serializer_event.errors)
        return Response(serializer_event.errors, status=status.HTTP_400_BAD_REQUEST)




