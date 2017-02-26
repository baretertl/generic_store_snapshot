import base64
from rest_framework import status
from rest_framework.test import APITestCase
from account.models import User
from .models import ConstantGroup, Constant

#tests for r'^app_constant_group' url
class ConstantGroupGetTest(APITestCase):
	fixtures = [
		'app_constant_constantgroup.json',
		'app_constant_constant.json',
	]

	def setUp(self):
		#setup users and superusers
		self.superuser_data = {'email': 'admin@example.com', 'password': '123456789'}
		self.supseruser = User.objects.create_superuser(email=self.superuser_data['email'], password=self.superuser_data['password'])
		self.data = {
			'group_codes': [{
				'constant_group_code': 'navigation',
				'constant_codes': [
					'location',
					'menu',
					'admin'
				]
			}]
		}

	def test_superuser_get(self):
		auth_str = '{}:{}'.format(self.superuser_data['email'], self.superuser_data['password'])
		auth_key = base64.b64encode(auth_str.encode()).decode()
		response = self.client.post('/api/app_constant/constant_group/', self.data, format='json', HTTP_AUTHORIZATION='Basic {}'.format(auth_key))
		self.assertEqual(response.status_code, status.HTTP_200_OK)

		response_data = response.data
		const_grp_obj = ConstantGroup.objects.get(constant_group_code=self.data['group_codes'][0]['constant_group_code'])
		const_list = Constant.objects.filter(constant_group=const_grp_obj)
		self.assertEqual(len(response_data[0]['constant']), const_list.count())

	def test_get(self):
		response = self.client.post('/api/app_constant/constant_group/', self.data, format='json')
		self.assertEqual(response.status_code, status.HTTP_200_OK)

		response_data = response.data
		const_grp_obj = ConstantGroup.objects.get(constant_group_code=self.data['group_codes'][0]['constant_group_code'])
		const_list = Constant.objects.filter(constant_group=const_grp_obj, superuser_only=False, staff_only=False)
		self.assertEqual(len(response_data[0]['constant']), const_list.count()) 