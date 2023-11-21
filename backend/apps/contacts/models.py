from django.db import models
from django.utils import timezone



    
    
from django.db import models

class Contact(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    subject = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    message = models.TextField(blank=True)
    budget = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    contact_date = models.DateTimeField(default=timezone.now, blank=True)
    subscribed = models.BooleanField(default=False)  # Nuevo campo para indicar la suscripción

    def __str__(self):
        return self.email




class Subscribe(models.Model):
    email = models.EmailField(unique=True)  # Utiliza unique=True para asegurar que cada email sea único
    date_added=models.DateTimeField(auto_now_add=True)
    subscribed = models.BooleanField(default=True)  # Por defecto, los nuevos registros estarán suscritos

    def __str__(self):
        return self.email
    



class Newsletter(models.Model):
    name=models.CharField(max_length=250)
    subject=models.CharField(max_length=255)
    body=models.TextField(blank=True, null=True)
    contacts = models.ManyToManyField(Subscribe, related_name='newsletters', blank=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.subject