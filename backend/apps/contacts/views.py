from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import requests
from .serializers import *
from django.core.mail import send_mail, BadHeaderError
from django.http import HttpResponse
from django.shortcuts import render
from .forms import NewsletterForm
from .models import Contact, Subscribe, Newsletter
from django.urls import reverse
from core.settings import EMAIL_HOST_USER
from rest_framework.permissions import AllowAny



class ContactCreateView(APIView):
    authentication_classes = []  # Desactiva la autenticación
    permission_classes = [AllowAny]  # Permite el acceso a cualquier usuario

    def post(self, request, format=None):
        serializer = ContactSerializer(data=request.data)
        print('Before is_valid()')
        if serializer.is_valid():
            print('is_valid() returned True')
            serializer.save()
            print('Data saved to database')

            # Obtén los datos del formulario
            name = serializer.validated_data['name']
            email = serializer.validated_data['email']
            subject = serializer.validated_data['subject']
            phone = serializer.validated_data['phone']
            message = serializer.validated_data['message']
            budget = serializer.validated_data['budget']

            # Convierte el campo budget a un número decimal
            budget_decimal = budget

            try:
                # Simulación de error
                if subject == 'error_test':
                    raise Exception('Error de prueba en el servidor.')
                # Envia el correo electrónico
                send_mail(
                    subject,
                    f"Name: {name}\nEmail: {email}\nPhone: {phone}\nMessage: {message}\nBudget: {budget_decimal}",
                     EMAIL_HOST_USER,  # Cambia esto por tu dirección de correo electrónico de Gmail o del servidor de correo que desees utilizar
                    ["jocoderina@gmail.com"],  # Cambia esto por la dirección de correo electrónico de destino
                    fail_silently=False,
                )
                print("Correo electrónico enviado con éxito")  # Agrega este registro
            except BadHeaderError:
                print("Error en la cabecera del correo electrónico")  # Agrega este registro
                # Ocurrió un error en la cabecera del correo
                return Response({'error': 'Invalid header found.'}, status=400)
            except Exception as e:
                print(f"Error al enviar el correo electrónico: {str(e)}")  # Agrega este registro
                # Otro tipo de error al enviar el correo
                return Response({'error': str(e)}, status=500)

            return Response({'success': 'Message sent successfully'})
        else:
            return Response(serializer.errors, status=400)
        


# views.py
class SubscribeView(APIView):
    authentication_classes = []  # Desactiva la autenticación
    permission_classes = [AllowAny]  # Permite el acceso a cualquier usuario


    def post(self, request, format=None):
        email = request.data.get('email')
        
        # Verificar si el correo electrónico ya existe en la base de datos de suscriptores
        if Subscribe.objects.filter(email=email).exists():
            #return Response({'error': 'Ya estás suscrito.'}, status=status.HTTP_400_BAD_REQUEST)
            return Response({'error': 'Ya estás suscrito.'}, status=status.HTTP_409_CONFLICT)

        # Crear un nuevo objeto Contact para el nuevo suscriptor (si aún no existe en la tabla de Contact)
        try:
            # Crear un nuevo objeto Contact para el nuevo suscriptor (si aún no existe en la tabla de Contact)
            contact, created = Contact.objects.get_or_create(email=email, defaults={'subscribed': True})

            # Crear un nuevo objeto Subscribe para el nuevo suscriptor
            subscriber, created = Subscribe.objects.get_or_create(email=email, defaults={'subscribed': True})

            return Response({'success': 'Te has suscrito correctamente.'}, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': 'Ha ocurrido un error al suscribirse. Inténtalo de nuevo más tarde.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class CreateNewsletterView(APIView):
    def post(self, request):
        form = NewsletterForm(request.data)
        if form.is_valid():
            # Obtiene los datos validados del formulario
            subject = form.cleaned_data['subject']
            body = form.cleaned_data['body']
            
            # Crea un nuevo objeto Newsletter y guárdalo en la base de datos
            newsletter = Newsletter.objects.create(subject=subject, body=body)
            
            return Response({'message': 'Newsletter creado con éxito', 'newsletter_id': newsletter.id}, status=status.HTTP_201_CREATED)
        return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)


class EditNewsletterView(APIView):
    def put(self, request, newsletter_id):
        newsletter = Newsletter.objects.get(pk=newsletter_id)  # Obtener el newsletter existente

        # Verifica que la solicitud sea de tipo PUT
        if request.method == 'PUT':
            form = NewsletterForm(request.data)  # Crea un formulario en blanco
            if form.is_valid():
                # Asigna manualmente los datos de la instancia del newsletter
                newsletter.subject = form.cleaned_data['subject']
                newsletter.body = form.cleaned_data['body']
                newsletter.save()  # Guardar los cambios en el newsletter

                # Enviar una respuesta JSON para indicar que la edición fue exitosa
                return Response({'message': 'Newsletter editado con éxito'}, status=status.HTTP_200_OK)
            else:
                return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)
        
        # En caso de que la solicitud no sea PUT, puedes manejarla según tus necesidades
        # Por ejemplo, devolver un error si no se proporciona un método PUT válido
        return Response({'error': 'Método no permitido'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
                  



class DeleteNewsletterView(APIView):
    def delete(self, request, newsletter_id):
        try:
            newsletter=Newsletter.objects.get(pk=newsletter_id)
        except Newsletter.DoesNotExist:
            return Response(
                {'error': 'Newslett does not exist'},
                status=status.HTTP_404_NOT_FOUND
            )
        newsletter.delete()
        return Response(
            {'message': 'Newsletter deleted successfully'},
            status=status.HTTP_200_OK
        )
    

# views.py
import secrets

class SendNewsletterView(APIView):
    def post(self, request):
        form = NewsletterForm(request.data)
        if form.is_valid():
            subject = form.cleaned_data['subject']
            message = form.cleaned_data['message']
            from_email = form.cleaned_data['from_email']
           
            contacts = Subscribe.objects.filter(subscribed=True).values_list('email', flat=True)

            

            # Aquí puedes agregar la lógica para enviar el newsletter a los suscriptores
            # Por ejemplo, obtener la lista de suscriptores y enviar correos electrónicos.
            try:
                # Envía el correo electrónico a los suscriptores
                for email in contacts:
                    # Genera un token único para cada suscriptor
                    token = secrets.token_urlsafe(32)
                    # Agrega el token a la URL de "Darse de baja" utilizando reverse
                    unsubscribe_link = request.build_absolute_uri(reverse('unsubscribe', args=[email, token]))
                    # Incorpora el enlace de "Darse de baja" en el contenido del mensaje del correo electrónico
                    message_with_unsubscribe = f"{message}\n\nPara darte de baja, haz clic aquí: {unsubscribe_link}"
                    send_mail(
                        subject,
                        message_with_unsubscribe,
                        from_email,
                        [email],  # Envía el correo a cada suscriptor individualmente
                        fail_silently=False,
                    )
                    # Aquí devolvemos la respuesta solo después de que todos los correos electrónicos se envíen con éxito
                return JsonResponse({'message': 'Newsletter enviado con éxito'}, status=status.HTTP_200_OK)
            except Exception as e:
                # En caso de error, devuelve una respuesta JSON con detalles sobre el error
                return JsonResponse({'error': f'Error al enviar el newsletter: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return JsonResponse({'error': 'Datos del formulario no válidos'}, status=status.HTTP_400_BAD_REQUEST)
        

        










from django.http import JsonResponse



def unsubscribe_view(request, email, token):
    authentication_classes = []  # Desactiva la autenticación
    permission_classes = [AllowAny]  # Permite el acceso a cualquier usuario
    # Verifica si el token es válido para el email dado
    try:
        subscriber = Subscribe.objects.get(email=email)
        if token == subscriber.unsubscribe_token:  # Considera agregar un campo 'unsubscribe_token' al modelo Subscribe
            # Procesar la acción de darse de baja para el suscriptor encontrado
            subscriber.subscribed = False
            subscriber.save()
            return JsonResponse({'message': 'Te has dado de baja correctamente.'}, status=200)
            #return render(request, 'unsubscribe_success.html')
    except Subscribe.DoesNotExist:
        pass

    # Si el token no es válido o no se encuentra el suscriptor, muestra un mensaje de error
    return JsonResponse({'message': 'No se puede procesar la solicitud de darse de baja.'}, status=400)



