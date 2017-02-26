from rest_framework import status
from rest_framework.test import APITestCase
from generic_store.settings import LANGUAGE_CODE
from .models import LocaleName

#tests for r'get_locale/$' url
class GetLocaleTest(APITestCase):
	fixtures = ['app_locale_localename.json'] 

	def test_get_locale(self):
		response = self.client.get('/api/app_locale/get_locale/')
		self.assertEqual(response.status_code, status.HTTP_200_OK)

		response_obj = response.data
		self.assertEqual(response_obj['locale_code'], LANGUAGE_CODE)

#tests for r'set_locale/$' url
class SetLocaleTest(APITestCase):
	fixtures = ['app_locale_localename.json'] 

	def setUp(self):
		self.data = { 'locale_code': 'en-us' }

	def test_set_locale(self):
		response = self.client.post('/api/app_locale/set_locale/', self.data, format='json')
		self.assertEqual(response.status_code, status.HTTP_200_OK)

		response_obj = response.data
		self.assertEqual(response_obj['locale_code'], self.data['locale_code'])

#tests for r'^' urls
class LocaleNameGetTest(APITestCase):
	fixtures = ['app_locale_localename.json'] 

	def test_get_list(self):
		response = self.client.get('/api/app_locale/locale_name/')
		self.assertEqual(response.status_code, status.HTTP_200_OK)

		response_obj = response.data
		self.assertEqual(len(response_obj), LocaleName.objects.count())

	def test_get(self):
		response = self.client.get('/api/app_locale/locale_name/1/')
		self.assertEqual(response.status_code, status.HTTP_200_OK)

		response_obj = response.data
		model_obj = LocaleName.objects.get(pk=1)
		self.assertEqual(response_obj['locale_code'], model_obj.locale_code)