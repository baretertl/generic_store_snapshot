from django.db import models
from app_locale.models import AppLocaleName

class AppConstant(models.Model):
	constant_code = models.CharField(unique=True, max_length=30, db_index=True)
	constant_value = models.CharField(max_length=500)
	staff_only = models.BooleanField()
	superuser_only = models.BooleanField()

	def __str__(self):
		return self.constant_code

class AppConstantTranslate(models.Model):
	app_constant = models.ForeignKey(AppConstant, on_delete=models.CASCADE, related_name='app_constant_translate')
	locale = models.ForeignKey(AppLocaleName, to_field='locale_code', on_delete=models.CASCADE, related_name='app_constant_translate_locale')
	constant_value = models.CharField(max_length=500)

	class Meta:
		unique_together = ('app_constant', 'locale', )