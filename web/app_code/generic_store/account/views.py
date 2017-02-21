from django.http import Http404
from django.contrib.auth import login as auth_login, logout as auth_logout
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from .models import User
from .serializers import UserSerializer
from .permissions import IsUserSelf

#method for User create
@api_view(['POST'])
def create(request, format='json'):
	user_ser = UserSerializer(data=request.data)
	if user_ser.is_valid():
		user = user_ser.save()
		if user:
			return Response(user_ser.data, status=status.HTTP_201_CREATED)

	return Response(user_ser.errors, status=status.HTTP_400_BAD_REQUEST)

#method for user login
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def login(request, format='json'):
	auth_login(request, request.user)
	user_ser = UserSerializer(request.user)
	return Response(user_ser.data, status=status.HTTP_200_OK)

#method for user logout
@api_view(['DELETE'])
@permission_classes((IsAuthenticated, ))
def logout(request):
	auth_logout(request)
	return Response(status=status.HTTP_200_OK)

#class view for user details
class UserDetail(APIView):
	
	permission_classes = (IsAuthenticated, IsUserSelf)

	#helper to get user object
	def get_object(self, request, pk):
		try:
			user_obj = User.objects.get(pk=pk)			
			return user_obj

		except User.DoesNotExist:
			raise Http404

	#get method to retrieve detail
	def get(self, request, pk, format='json'):
		user_obj = self.get_object(request, pk)
		self.check_object_permissions(self.request, user_obj)
		user_ser = UserSerializer(user_obj)
		return Response(user_ser.data, status=status.HTTP_200_OK)

	#put method to update user email and name
	def put(self, request, pk, format='json'):
		user_obj = self.get_object(request, pk)
		self.check_object_permissions(self.request, user_obj)
		put_data = {
			'email': request.data.get('email', None), 
			'first_name': request.data.get('first_name', None),
			'last_name': request.data.get('last_name', None)}

		user_ser = UserSerializer(user_obj, data=put_data, partial=True)
		if user_ser.is_valid():
			user_ser.save()
			return Response(user_ser.data, status=status.HTTP_200_OK)

		return Response(user_ser.errors, status=status.HTTP_400_BAD_REQUEST)

	#patch method for update password	
	def patch(self, request, pk, format='json'):
		user_obj = self.get_object(request, pk)
		self.check_object_permissions(self.request, user_obj)
		patch_data = {
			'old_password': request.data.get('old_password', None),
			'password': request.data.get('password', None),
			'confirm_password': request.data.get('confirm_password', None)}

		user_ser = UserSerializer(user_obj, data=patch_data, partial=True)
		if user_ser.is_valid():
			user_ser.save()
			return Response(user_ser.data, status=status.HTTP_200_OK)

		return Response(user_ser.errors, status=status.HTTP_400_BAD_REQUEST)