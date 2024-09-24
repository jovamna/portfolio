from rest_framework import serializers
from .models import  Review
from django.contrib.auth.models import User

from apps.blog.serializers import PostSerializer


class ReviewSerializer(serializers.ModelSerializer):
	comment = serializers.CharField(max_length=1000, write_only=True, required=True)
	title = serializers.CharField(max_length=80, write_only=True, required=True)
	
	
	#comment = serializers.CharField()
	class Meta:
		model = Review
		fields = ( "hearts", "title", "comment", "published_date", "post")

	def validate_hearts(self, value):
		allowed_values = [choice[0] for choice in Review.HEARTS]
		if value not in allowed_values:
			raise serializers.ValidationError("Invalid hearts value")
		return value




