from rest_framework import status
from rest_framework.test import APITestCase
from .models import Location, ContactInfo, StoreHour

#tests for r'location' url
class LocationGetTest(APITestCase):
	fixtures = ['store_info_location.json']

	def test_get_list(self):
		response = self.client.get('/api/store_info/location/')
		self.assertEqual(response.status_code, status.HTTP_200_OK)

		response_obj = response.data
		self.assertEqual(len(response_obj), Location.objects.count())

#tests for r'contact_info' url
class ContactInfoGetTest(APITestCase):
	fixtures = ['store_info_contactinfo.json']

	def test_get_list(self):
		response = self.client.get('/api/store_info/contact_info/')
		self.assertEqual(response.status_code, status.HTTP_200_OK)

		response_obj = response.data
		self.assertEqual(len(response_obj), ContactInfo.objects.count())

#tests r'store_hour' url
class StoreHourGetTest(APITestCase):
	fixtures = [
		'app_locale_applocalename.json',
		'store_info_storehour.json', 
		'store_info_storehourtranslate.json',
	]

	def test_get_list(self):
		response = self.client.get('/api/store_info/store_hour/')
		self.assertEqual(response.status_code, status.HTTP_200_OK)

		response_obj = response.data
		self.assertEqual(len(response_obj), StoreHour.objects.count())