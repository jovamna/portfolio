from rest_framework import viewsets
from rest_framework.response import Response
from .models import ChatMessage
from .serializers import ChatMessageSerializer
from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny



class ChatbotViewSet(viewsets.ViewSet):
    authentication_classes = []  # Desactiva la autenticación
    permission_classes = [AllowAny]  # Permite el acceso a cualquier usuario
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer

    def create(self, request):
        user_message = request.data.get('user_message', '').lower()
     

        if not user_message:
            return Response({'error': 'Debe proporcionar un mensaje de usuario'}, status=status.HTTP_400_BAD_REQUEST)

        if user_message.lower() in ['hola', 'buenos días', 'buenos dias', 'buenas tardes', 'buenas noches']:
            bot_response = '¡Hola! ¿En qué puedo ayudarte?'
            print(user_message.lower())

        elif user_message.lower() in ['que temas trata el blog', 'de que temas trata el blog?']:
            bot_response = 'En el blog puedes encontrar temas sobre tecnologia, diseño, historias, curiosidades'
            print(user_message.lower())

        elif user_message.lower() in ['dame un presupuesto para una pagina web', 'puedes construirme una api?', 'me gustaia tener una entrevista contigo']: 
            bot_response = 'Para mas información de tu consulta, puedes enviar un correo a jocoderina@gmail.com, te responderé lo mas pronto posible, gracias'
            print(user_message.lower())
           
        
        elif user_message in ['Me gustaria ver mas acerca de tus projectos, donde se pueden ver?']:
        #elif 'Donde están las recetas para veganos' in user_message.lower():
            category = 'veganos'
            bot_response = f'Puede visitar esta página en este enlace: https://www.ejemplo.com/categorias/{category}/'
            #bot_response = 'ES EL COLMO'
            print(user_message.lower())

        elif 'categoria' in user_message:
            # Obtener la categoría del mensaje del usuario (puedes implementar la lógica para extraer la categoría del mensaje)
            category = 'Recetas saludables'
            bot_response = f'Puedes encontrar la categoría "{category}" en este enlace: https://www.ejemplo.com/categorias/{category}/'
        else:
            bot_response = 'Lo siento, no entiendo lo que estás diciendo. ¿Podrías reformular tu pregunta?'

        chat = ChatMessage(user_message=user_message, bot_response=bot_response)
        #chat.save()

        serializer = ChatMessageSerializer(chat)
        return Response(serializer.data, status=201)
