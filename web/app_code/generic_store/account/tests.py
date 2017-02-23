import base64
from requests.auth import HTTPBasicAuth
from rest_framework import status
from rest_framework.test import APITestCase
from .models import User

#tests for r'^create/$' url
class UserCreateTest(APITestCase):

	def setUp(self):
		self.data = {'email': 'example@example.com', 'password': '123456789', 'confirm_password': '123456789'}
	
	def test_create_user(self):
		response = self.client.post('/api/account/create/', self.data, format='json')
		self.assertEqual(response.status_code, status.HTTP_201_CREATED)

		response_obj = response.data
		user_obj = User.objects.get(pk=1)
		self.assertEqual(response_obj['email'], user_obj.email)

#tests for r'^login/$' url
class UserLoginTest(APITestCase):

	def setUp(self):
		self.data = {'email': 'example@example.com', 'password': '123456789'}
		self.user = User.objects.create_user(email=self.data['email'], password=self.data['password'])

	def test_user_login(self):
		auth_str = '{}:{}'.format(self.data['email'], self.data['password'])
		auth_key = base64.b64encode(auth_str.encode()).decode()
		response = self.client.get('/api/account/login/', HTTP_AUTHORIZATION='Basic {}'.format(auth_key))
		self.assertEqual(response.status_code, status.HTTP_200_OK)

#tests for r'^logout/$' url
class UserLogoutTest(APITestCase):

	def setUp(self):
		self.data = {'email': 'example@example.com', 'password': '123456789'}
		self.user = User.objects.create_user(email=self.data['email'], password=self.data['password'])

	def test_user_logout(self):
		auth_str = '{}:{}'.format(self.data['email'], self.data['password'])
		auth_key = base64.b64encode(auth_str.encode()).decode()
		response = self.client.delete('/api/account/logout/', HTTP_AUTHORIZATION='Basic {}'.format(auth_key))
		self.assertEqual(response.status_code, status.HTTP_200_OK)

#tests for r'^(?P<pk>[0-9]+)$' url
class UserDetailGetTest(APITestCase):

	def setUp(self):
		self.data = {'email': 'example@example.com', 'password': '123456789'}
		self.user = User.objects.create_user(email=self.data['email'], password=self.data['password'])

	def test_user_detail_get(self):
		auth_str = '{}:{}'.format(self.data['email'], self.data['password'])
		auth_key = base64.b64encode(auth_str.encode()).decode()
		response = self.client.get('/api/account/{}'.format(self.user.id), HTTP_AUTHORIZATION='Basic {}'.format(auth_key))
		self.assertEqual(response.status_code, status.HTTP_200_OK)

		response_obj = response.data
		self.assertEqual(response_obj['id'], self.user.id)

class UserDetailPutTest(APITestCase):

	def setUp(self):
		self.data = {'email': 'example@example.com', 'password': '123456789'}
		self.user = User.objects.create_user(email=self.data['email'], password=self.data['password'])

	def test_user_detail_put(self):
		auth_str = '{}:{}'.format(self.data['email'], self.data['password'])
		auth_key = base64.b64encode(auth_str.encode()).decode()
		put_data = {'email': 'example2@example.com', 'first_name': 'x', 'last_name': 'x' }
		response = self.client.put('/api/account/{}'.format(self.user.id), put_data, format='json', HTTP_AUTHORIZATION='Basic {}'.format(auth_key))
		self.assertEqual(response.status_code, status.HTTP_200_OK)

		response_obj = response.data
		self.assertEqual(response_obj['email'], put_data['email'])

class UserDetailPatchTest(APITestCase):

	def setUp(self):
		self.data = {'email': 'example@example.com', 'password': '123456789'}
		self.user = User.objects.create_user(email=self.data['email'], password=self.data['password'])

	def test_user_detail_patch(self):
		auth_str = '{}:{}'.format(self.data['email'], self.data['password'])
		auth_key = base64.b64encode(auth_str.encode()).decode()
		patch_data = {'old_password': self.data['password'], 'password': '111111111', 'confirm_password': '111111111'}
		response = self.client.patch('/api/account/{}'.format(self.user.id), patch_data, format='json', HTTP_AUTHORIZATION='Basic {}'.format(auth_key))
		self.assertEqual(response.status_code, status.HTTP_200_OK)

		response = self.client.get('/api/account/{}'.format(self.user.id), HTTP_AUTHORIZATION='Basic {}'.format(auth_key))
		self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
		
		self.data['password'] = patch_data['password']
		auth_str = '{}:{}'.format(self.data['email'], self.data['password'])
		auth_key = base64.b64encode(auth_str.encode()).decode()
		response = self.client.get('/api/account/{}'.format(self.user.id), HTTP_AUTHORIZATION='Basic {}'.format(auth_key))
		self.assertEqual(response.status_code, status.HTTP_200_OK)