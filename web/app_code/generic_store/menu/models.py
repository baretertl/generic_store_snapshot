from django.db import models
from generic_store.settings import LANGUAGE_CODE
from app_locale.models import AppLocaleName

# Create your models here.
class Category(models.Model):
	category_code = models.CharField(max_length=15, unique=True)
	sort = models.IntegerField(unique=True)

	class Meta:
		ordering = ('sort', )

	def __str__(self):
		return CategoryTranslate.objects.get(category=self, locale=LANGUAGE_CODE).name

class CategoryTranslate(models.Model):
	category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='category_translate')
	locale = models.ForeignKey(AppLocaleName, to_field='locale_code', on_delete=models.CASCADE, related_name='category_translate_locale')
	name = models.CharField(max_length=100)
	description = models.CharField(max_length=500, blank=True)

	class Meta:
		unique_together = ('category', 'locale', )

class Item(models.Model):
	category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='item')
	image_url = models.CharField(max_length=100)
	price = models.DecimalField(max_digits=10, decimal_places=2)
	sort = models.IntegerField()

	class Meta:
		ordering = ('sort', )
		unique_together = ('category', 'sort', )

	def __str__(self):
		return ItemTranslate.objects.get(item=self, locale=LANGUAGE_CODE).name

class ItemTranslate(models.Model):
	item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='item_translate')
	locale = models.ForeignKey(AppLocaleName, to_field='locale_code', on_delete=models.CASCADE, related_name='item_translate_locale')
	name = models.CharField(max_length=100)
	description = models.CharField(max_length=500, blank=True)

	class Meta:
		unique_together = ('item', 'locale', )

class Variation(models.Model):
	item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='variation')
	image_url = models.CharField(max_length=100)
	price = models.DecimalField(max_digits=10, decimal_places=2)
	sort = models.IntegerField()

	class Meta:
		ordering = ('sort', )
		unique_together = ('item', 'sort', )

	def __str__(self):
		return VariationTranslate.objects.get(variation=self, locale=LANGUAGE_CODE).name

class VariationTranslate(models.Model):
	variation = models.ForeignKey(Variation, on_delete=models.CASCADE, related_name='variation_translate')
	locale = models.ForeignKey(AppLocaleName, to_field='locale_code', on_delete=models.CASCADE, related_name='variation_translate_locale')
	name = models.CharField(max_length=100)

	class Meta:
		unique_together = ('variation', 'locale', )

class ItemChoice(models.Model):
	item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='item_choice')
	option = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='item_choice_option')
	choice = models.IntegerField()

	class Meta:
		unique_together = ('item', 'option', 'choice', )
