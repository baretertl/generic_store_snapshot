from rest_framework import status
from rest_framework.test import APITestCase
from .models import Category

#tests for r'category' url
class CategoryGetTest(APITestCase):
	fixtures = ['app_locale_applocalename.json', 
							'menu_category.json',
							'menu_categorytranslate.json',
							'menu_item.json',
							'menu_itemtranslate.json',
							'menu_variation.json',
							'menu_variationtranslate.json',
							'menu_itemchoice.json']

	def test_get_category(self):
		response = self.client.get('/api/menu/category/')
		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual(len(response.data), Category.objects.count())