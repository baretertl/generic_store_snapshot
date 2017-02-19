from django.core.exceptions import ValidationError
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import User

class UserSerializer(serializers.ModelSerializer):
	#field names with basic validations
	email = serializers.EmailField(required=True,
																validators=[UniqueValidator(queryset = User.objects.all())])
	password = serializers.CharField(min_length=8, write_only=True)
	confirm_password = serializers.CharField(min_length=8, write_only=True)
	first_name = serializers.CharField(max_length=30, required=False, allow_blank=True, default='')
	last_name = serializers.CharField(max_length=30, required=False, allow_blank=True, default='')
	#field used for changing password
	old_password = serializers.CharField(write_only=True, required=False)

	def create(self, validated_data):
		#check for password and confirm password on create
		if validated_data.get('password', None) != validated_data.get('confirm_password', None):
			raise serializers.ValidationError('Password does not match.')
			
		#create the user
		user_obj = User.objects.create_user(email=validated_data.get('email', None),
																				password=validated_data.get('password', None),
																				first_name=validated_data.get('first_name', None),
																				last_name=validated_data.get('last_name', None))
		return user_obj

	def update(self, instance, validated_data):
		old_pass = validated_data.get('old_password', None)		

		if old_pass is None:
			#update user profile fields
			instance.email = validated_data.get('email', instance.email)
			instance.first_name = validated_data.get('first_name', instance.first_name)
			instance.last_name = validated_data.get('last_name', instance.last_name)

		else:
			new_pass = validated_data.get('password', None) 
			confirm_new_pass =  validated_data.get('confirm_password', None)

			#old password passed in, change the password
			if not instance.check_password(old_pass):
				raise serializers.ValidationError("Current password is incorrect")

			if new_pass is None:
				raise serializers.ValidationError("New password needed")

			if new_pass != confirm_new_pass:
				raise serializers.ValidationError('Password does not match')

			if new_pass == old_pass:
				raise serializers.ValidationError('New password cannot match the current password')

			#passed the validations for changing password
			instance.set_password(new_pass)
		
		instance.save()
		return instance

	class Meta:
		model = User
		fields = ('id', 'email', 'password', 'confirm_password', 'first_name', 'last_name', 'old_password')
