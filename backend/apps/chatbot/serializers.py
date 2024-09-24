
from rest_framework import serializers
from .models import ChatMessage

class ChatMessageSerializer(serializers.ModelSerializer):
    bot_image = serializers.ImageField(allow_null=True)
    class Meta:
        model = ChatMessage
        fields = ('user_message', 'bot_response', 'bot_image', 'timestamp')
