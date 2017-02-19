from rest_framework import status
from rest_framework.test import APITestCase
from .models import AppLocaleName

# Create your tests here.
class AppLocaleNameTest(APITestCase):

	fixtures = ['app_locale.json'] 

	def test_get_list(self):
		response = self.client.get('/api/app_locale/AppLocaleName/')
		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual(len(response.data), AppLocaleName.objects.count())

	def test_get(self):
		response = self.client.get('/api/app_locale/AppLocaleName/1/')
		self.assertEqual(response.status_code, status.HTTP_200_OK)
		responseObj = response.data
		modelObj = AppLocaleName.objects.get(pk=1)
		self.assertEqual(responseObj["locale_code"], modelObj.locale_code)