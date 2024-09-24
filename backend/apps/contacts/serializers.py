from rest_framework import serializers
from .models import Contact


class ContactSerializer(serializers.ModelSerializer):
    #name = serializers.CharField(max_length=100)
    #email = serializers.EmailField()
    #subject = serializers.CharField(max_length=200)
    #message = serializers.CharField()
    #phone = serializers.CharField(max_length=20)
    budget = serializers.DecimalField(max_digits=10, decimal_places=2, allow_null=True)
    class Meta:
        model = Contact
        fields = ['name', 'email', 'subject', 'message', 'phone', 'budget']