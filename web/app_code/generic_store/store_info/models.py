from django.db import models
from django.core.validators import RegexValidator, MinValueValidator, MaxValueValidator
from generic_store.settings import LANGUAGE_CODE
from app_locale.models import AppLocaleName

class Location(models.Model):
	address_line_1 = models.CharField(max_length=255)
	address_line_2 = models.CharField(max_length=255, blank=True)
	city = models.CharField(max_length=50)
	state_code = models.CharField(max_length=2)
	state_name = models.CharField(max_length=20)
	postal_code = models.CharField(max_length=20)
	country = models.CharField(max_length=40)
	longitude = models.FloatField()
	latitude = models.FloatField()

class ContactInfo(models.Model):
	#regex validator
	phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', 
															 message='Phone number must be entered in the format: "+999999999". Up to 15 digits allowed.')

	phone_number = models.CharField(validators=[phone_regex], max_length=16)
	email_address = models.EmailField()

class StoreHour(models.Model):
	day_code = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(6)])
	open_hour = models.TimeField()
	close_hour = models.TimeField()
	day = models.CharField(max_length=10)

	def __str__(self):
		return self.day

class StoreHourTranslate(models.Model):
	store_hour = models.ForeignKey(StoreHour, on_delete=models.CASCADE, related_name='store_hour_translate')
	locale = models.ForeignKey(AppLocaleName, to_field='locale_code', on_delete=models.CASCADE, related_name='store_hour_translate_locale')
	day = models.CharField(max_length=10)