from django.db import models
from django.utils import timezone

class ChatMessage(models.Model):
    user_message = models.CharField(max_length=255)
    bot_response = models.TextField()
    bot_image = models.ImageField(upload_to='media/chatbot/', blank=True, null=True)
    timestamp = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"User: {self.user_message} | Bot: {self.bot_response}"



