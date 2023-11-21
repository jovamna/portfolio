from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from apps.blog.models import Post
from apps.blog.serializers import *
from .models import Review
from .serializers import ReviewSerializer
from rest_framework.authentication import TokenAuthentication
from django.shortcuts import get_object_or_404

from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import PermissionDenied

from django.conf import settings
User = settings.AUTH_USER_MODEL



class GetPostReviewsView(APIView):
    permission_classes = [AllowAny] # built-in permission class used

    def get(self, request, slug, format=None):
        try:
            post = Post.objects.get(slug=slug)
        except Post.DoesNotExist:
            return Response(
                {'error': 'This post does not exist'},
                status=status.HTTP_404_NOT_FOUND
            )
        results = []
        
   
        if Review.objects.filter(post=post).exists():
            reviews = Review.objects.order_by('-published_date').filter(post=post)
                
            for review in reviews:
                item = {}

                item['id'] = review.id
                item['hearts'] = review.hearts
                item['title'] = review.title
                item['comment'] = review.comment
                item['published_date'] = review.published_date
                item['user'] = review.user.first_name

                results.append(item)
            
        # Obtener el total de comentarios
            total_reviews = Review.objects.filter(post=post).count()

            return Response(
                {'reviews': results, 'total_reviews': total_reviews},
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                {'reviews': results, 'total_reviews': 0},  # Si no hay reseñas
                status=status.HTTP_200_OK
            )
      

    


class GetPostReviewView(APIView):
    permission_classes = (permissions.AllowAny, )
    
    def get(self, request, review_id, format=None):
        try:
            review = Review.objects.get(id=review_id)
        except Review.DoesNotExist:
            return Response(
                {'error': 'Review does not exist'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        result = {
            'id': review.id,
            'title' : review.title,
            'comment': review.comment,
            'hearts': review.hearts,
            'published_date': review.published_date,
            'user': review.user.first_name if review.user else None
        }
        
        return Response(
            {'review': result},
            status=status.HTTP_200_OK
        )
        





class CreatePostReviewView(APIView):
    permission_classes = (IsAuthenticated,)
   
    def post(self, request, slug, format=None):
        user = self.request.user
        #print(user)
        if not user.is_authenticated:
            raise PermissionDenied(detail="You need to be logged in to change your password.")

        data = self.request.data
        #print(data)
        try:
            hearts = data['hearts']
            title = str(data.get('title', ''))
            comment = str(data.get('comment', ''))
            post = get_object_or_404(Post, slug=slug)  # Obtener la instancia de Recipe por el slug
            #title = str(data['title'])
            #comment = str(data['comment'])
            #serializer = PostSerializer(post)  # Utiliza 

           # max_title_length = 90
            #max_comment_length = 1000

            #if len(title) > max_title_length or len(comment) > max_comment_length:
                #error_message = "El título o el comentario exceden el límite de caracteres permitidos."
                #return Response({'error': error_message}, status=status.HTTP_400_BAD_REQUEST)

            review = Review.objects.create(
                user=user,
                post=post,  # Asignar la instancia de Recipe al campo recipe
                hearts=hearts,
                title=title,
                comment=comment
            )

            serializer = ReviewSerializer(review)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except KeyError as e:
            return Response({'error': f'Missing key: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
        except Post.DoesNotExist:
            return Response({'error': 'This post does not exist'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        





class UpdatePostReviewView(APIView):
   permission_classes = (IsAuthenticated,)

   def put(self, request, slug, review_id, format=None):
        user = self.request.user
        print(user)
        data = self.request.data
        print(data)

        
        if 'slug' in data:
            slug = data['slug']

        try:
            post = get_object_or_404(Post, slug=slug)
            print(post)
        except Post.DoesNotExist:
            return Response(
                {'error': 'This post does not exist'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        try:
            hearts = data.get('hearts')
            print(hearts)
            if hearts is None:
                return Response(
                    {'error': 'Heart value is missing'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            hearts = float(hearts)
            print(hearts)
        except (KeyError, ValueError):
            return Response(
                {'error': 'Invalid hearts or comment'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            comment = data.get('comment')
            if comment is None:
                return Response(
                    {'error': 'Comment value is missing'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            comment = str(comment)
            print(comment)
        except KeyError:
            return Response(
                {'error': 'Must pass a comment when creating review'},
                status=status.HTTP_400_BAD_REQUEST
            )



        try:
            review = Review.objects.get(id=review_id, user=user, post=post)
            print(review)
        except Review.DoesNotExist:
            return Response(
                {'error': 'Review for this post does not exist'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        if review.user != user:
            return Response(
                {'error': 'Only the author of the review can update it'},
                status=status.HTTP_401_UNAUTHORIZED
                )
        review.hearts = hearts
        review.comment = comment
        review.save()




        updated_reviews = Review.objects.filter(post=post).order_by('-published_date')

        result = {
                'id': updated_reviews[0].id,
                'hearts': updated_reviews[0].hearts,
                'comment': updated_reviews[0].comment,
                'published_date': updated_reviews[0].published_date,
                'user': updated_reviews[0].user.first_name
            }

        results = []
        for review in updated_reviews:
            item = {
                'id': review.id,
                'hearts': review.hearts,
                'comment': review.comment,
                'published_date': review.published_date,
                'user': review.user.first_name
                }
            results.append(item)
            
        return Response(
                {'review': result, 'reviews': results},
                status=status.HTTP_200_OK
            )





# CON ESTO if review.user != self.request.user: 
# NO ES NECESARIO PONER   permission_classes = (IsAuthenticated,)
class DeletePostReviewView(APIView):
    def delete(self, request, review_id, format=None):
        try:
            review = Review.objects.get(id=review_id)
        except Review.DoesNotExist:
            return Response(
                {'error': 'Review does not exist'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Verificar si el usuario autenticado es el autor del review
        if review.user != self.request.user:
            return Response(
                {'error': 'Only the author of the review can delete it'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        review.delete()
        
        return Response(
            {'message': 'Review deleted successfully'},
            status=status.HTTP_204_NO_CONTENT
        )









class FilterPostReviewsView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, slug, format=None):
        try:
            post = Post.objects.get(slug=slug)
        except Post.DoesNotExist:
            return Response(
                {'error': 'This recipe does not exist'},
                status=status.HTTP_404_NOT_FOUND
            )

        hearts = request.query_params.get('hearts')
        try:
            if hearts:
                hearts = float(hearts)
                if hearts < 0.5:
                    hearts = 0.5
                elif hearts > 5.0:
                    hearts = 5.0
            else:
                hearts = 5.0

            results = []
            reviews = Review.objects.filter(post=post, hearts__gte=hearts - 0.5, hearts__lte=hearts).order_by('-published_date')

            for review in reviews:
                item = {}
                item['id'] = review.id
                item['hearts'] = review.hearts
                item['comment'] = review.comment
                item['published_date'] = review.published_date
                item['user'] = review.user.first_name
                results.append(item)

            return Response(
                {'reviews': results},
                status=status.HTTP_200_OK
            )
        except ValueError:
            return Response(
                {'error': 'hearts must be a decimal value'},
                status=status.HTTP_400_BAD_REQUEST
            )
        except:
            return Response(
                {'error': 'Something went wrong when filtering reviews for the recipe'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


