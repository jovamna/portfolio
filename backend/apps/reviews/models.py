from django.db import models
from apps.blog.models import Post
# Create your models here.

from django.conf import settings
User = settings.AUTH_USER_MODEL

#User = get_user_model()


class Review(models.Model):
    HEARTS = [
        (1, '💛'),
        (2, '💛💛'),
        (3, '💛💛💛'),
        (4, '💛💛💛💛'),
        (5, '💛💛💛💛💛'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="reviews")
    title = models.CharField(max_length=80)
    comment = models.TextField( max_length=1000)
    hearts = models.PositiveSmallIntegerField(choices=HEARTS, default=5)
    published_date = models.DateField(auto_now_add=True)


    def __str__(self):
        return f"{self.post.title}"  # Use "self.post.title" instead of "self.recipe.name"
        
    

    @property
    def total_hearts(self):
        return self.hearts.aggregate(total_hearts=Sum('hearts'))['total_hearts']
