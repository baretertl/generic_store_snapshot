from rest_framework import status
from rest_framework.test import APITestCase
from .models import Category, CategoryTranslate, Item, ItemTranslate, Variation, VariationTranslate, ItemChoice

#create your tests here
class MenuTest(APITestCase):

	fixtures = ['app_locale.json', 'menu.json']

	def test_get_category(self):
		response = self.client.get('/api/menu/Category/')
		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual(len(response.data), Category.objects.count())