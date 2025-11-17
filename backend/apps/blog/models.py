from django.db import models
import uuid
from django.utils import timezone
from apps.category.models import Category
#from apps.chatbot.models import ChatMessage
from tinymce.models import HTMLField  # Asegúrate de que tienes tinymce instalado
import os
from django.dispatch import receiver



def blog_directory_path(instance, filename):
   return 'blog/{0}/{1}'.format(instance.slug, filename)
    #return 'images/{0}/'.format(filename)


class Post(models.Model):

    class PostObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status='published')

    options = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )

    blog_uuid = models.UUIDField(default=uuid.uuid4, unique=True)
    title = models.CharField(max_length=90)
    slug = models.SlugField(unique=True)
    thumbnail = models.ImageField(upload_to=blog_directory_path, blank=True, null=True)
    video = models.FileField(upload_to=blog_directory_path, blank=True, null=True)
    excerpt = models.CharField(max_length=140, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to=blog_directory_path, blank=True, null=True)
    content = HTMLField(blank=True, null=True)  # Usando HTMLField para TinyMCE
    author =  models.CharField(max_length=255, blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.PROTECT)
    published = models.DateTimeField(default=timezone.now)
    status = models.CharField(max_length=10, choices=options, default='draft')
    views = models.IntegerField(default=0, blank=True, verbose_name="Vistas")
    objects =  models.Manager()  # default manager el manager que siempre se usa
    post_objects = PostObjects()  # custom manager

    class Meta:
        ordering = ('-published',)

    def __str__(self):
        return self.title

    def get_video(self):
        if self.video:
            return self.video.url
        return ''

    def get_thumbnail(self):
        if self.thumbnail:
            return self.thumbnail.url
        return ''
    
    def get_image(self):
        if self.image:
            return self.image.url
        return ''
    

    def get_view_count(self):
        views = PostViewCount.objects.filter(post=self).count()
        return views
    
    @staticmethod
    def get_popular_posts():
        return Post.objects.filter(status='published').annotate(view_count=PostViewCount('post_view_count')).order_by('-view_count')
    
    @staticmethod
    def popular_posts(num_posts):
        return Post.objects.filter(status='published').order_by('-views')[:num_posts]
    
    
# 1) Borrar archivo cuando se borra un Post
@receiver(models.signals.post_delete, sender=Post)
def auto_delete_files_on_delete(sender, instance, **kwargs):
    fields = ['image', 'thumbnail', 'video']
    for field in fields:
        file = getattr(instance, field)
        if file and file.name and os.path.isfile(file.path):
            os.remove(file.path)


# 2) Borrar archivo viejo cuando se cambia por uno nuevo
@receiver(models.signals.pre_save, sender=Post)
def auto_delete_old_file_on_change(sender, instance, **kwargs):
    if not instance.pk:
        return

    try:
        old_post = Post.objects.get(pk=instance.pk)
    except Post.DoesNotExist:
        return

    fields = ['image', 'thumbnail', 'video']
    for field in fields:
        old_file = getattr(old_post, field)
        new_file = getattr(instance, field)

        if old_file and old_file != new_file:
            if os.path.isfile(old_file.path):
                os.remove(old_file.path)


    


    
class PostViewCount(models.Model):
    post = models.ForeignKey(Post, related_name='post_view_count', on_delete=models.CASCADE)
    ip_address = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.ip_address}"
    
