from django.contrib import admin

# Register your models here.
from django.contrib import admin
from apps.myprojects import models
# Register your models here.
from .models import *
from django.core.mail import send_mail



admin.site.register(Contact)
admin.site.register(Subscribe)
#admin.site.register(Newsletter)

class NewsletterAdmin(admin.ModelAdmin):
    list_display = ['subject', 'get_message_preview', 'send_newsletter_button']

    def get_message_preview(self, obj):
        return obj.body[:50] + '...'  # Muestra solo los primeros 50 caracteres del mensaje
    get_message_preview.short_description = 'Body Preview'

    def send_newsletter_button(self, obj):
        return f'<a class="button" href="/admin/send-newsletter/{obj.id}/">Enviar Newsletter</a>'
    send_newsletter_button.allow_tags = True

    def send_newsletter_action(self, request, queryset):
        # Obtener el asunto y mensaje del newsletter
        subject = queryset.first().subject
        message = queryset.first().message

        # Obtener la lista de correos electrónicos de los suscriptores
        subscribers_emails = Subscribe.objects.filter(subscribed=True).values_list('email', flat=True)

        # Enviar el newsletter a los suscriptores
        from_email = 'tu_correo@gmail.com'  # Cambia esto por tu dirección de correo electrónico
        try:
            send_mail(subject, message, from_email, subscribers_emails, fail_silently=False)
        except Exception as e:
            # Manejo de errores, si es necesario
            pass

    send_newsletter_action.short_description = 'Enviar newsletter a suscriptores'

    actions = [send_newsletter_action]
   

admin.site.register(Newsletter, NewsletterAdmin)


