from django.db import models

# Create your models here.
class AppLocaleName(models.Model):
	locale_code = models.CharField(unique=True, max_length=15)
	locale_name = models.CharField(max_length=50)

	def __str__(self):
		return self.locale_code