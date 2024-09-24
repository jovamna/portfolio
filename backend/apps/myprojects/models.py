
from django.db import models
from django.utils import timezone
from apps.user.models import User
import uuid
from django.conf import settings #IMPORTANTE PARA EL AUTHOR DEL MODEL POST
User = settings.AUTH_USER_MODEL  #IMPORTANTE PARA EL AUTHOR DEL MODEL POST
from tinymce.models import HTMLField  # Asegúrate de que tienes tinymce instalado



#funcion para imagenes
def project_thumbnail_directory(instance, filename):
    return 'myproject/{0}/{1}'.format(instance.title, filename)

def project_thumbnail_directory_category(instance, filename):
    return 'myproject/{0}/{1}'.format(instance.name, filename)


class Tag(models.Model):
    """ modelo del tag"""
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    thumbnail = models.ImageField(upload_to=project_thumbnail_directory, max_length=500, blank=True, null=True)

    def __str__(self):
        return self.name
    
    
class Category(models.Model):
    """ modelo ingrediente"""
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    thumbnail = models.ImageField(upload_to=project_thumbnail_directory_category, max_length=500, blank=True, null=True)
    
    
    def __str__(self):
        return self.name
    

class Authors(models.Model):
    name = models.CharField(max_length=100)
  
    def __str__(self):
        return self.name



# Create your models here.
class Project(models.Model):
    class ProjectObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status='published')

    options = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )

    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE, related_name="author", verbose_name = "Autor"
    )
    title = models.CharField(max_length=100)
    description = HTMLField(blank=True, null=True)  # Usando HTMLField para TinyMCE
    slug = models.SlugField(max_length=255, unique=True)
    thumbnail = models.ImageField(upload_to=project_thumbnail_directory, max_length=500, blank=True, null=True)
    url = models.URLField(blank=True, null=True)
    category = models.ManyToManyField('Category', related_name="category", blank=True)
    tags = models.ManyToManyField('Tag', related_name="tag", verbose_name = "Keywords", blank=True)
    authors = models.ManyToManyField('Authors', verbose_name = "Autores", related_name="authors", blank=True)
    published = models.DateTimeField(default=timezone.now)
    views = models.IntegerField(default=0, blank=True)
    status =  models.CharField(max_length=10, choices=options, default='draft')

    objects =    models.Manager()  # default manager
    projectobjects =  ProjectObjects()  # custom manager

    class Meta:
        ordering = ('-published',)

    def __str__(self) -> str:
        return self.title

    def get_view_count(self):
        views = ViewCount.objects.filter(project=self).count()
        return views

    def get_status(self):
        status = self.status
        return status

    #def save(self, *args, **kwargs):
        #self.slug = slugify(self.name, allow_unicode=True)
        #return super(Project, self).save(*args, **kwargs)


class ViewCount(models.Model):
    project = models.ForeignKey(Project, related_name='myproject_view_count', on_delete=models.CASCADE)
    ip_address = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.ip_address}"