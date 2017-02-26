from django.db import models
from app_locale.models import LocaleName

class ConstantGroup(models.Model):
	constant_group_code = models.CharField(unique=True, max_length=30, db_index=True)
	constant_group_name = models.CharField(max_length=500)

	def __str__(self):
		return self.constant_group_name

class ConstantGroupTranslate(models.Model):
	constant_group = models.ForeignKey(ConstantGroup, on_delete=models.CASCADE, related_name='constant_group_translate')
	locale = models.ForeignKey(LocaleName, to_field='locale_code', on_delete=models.CASCADE, related_name='constant_group_translate_locale')
	constant_group_name = models.CharField(max_length=500)

	class Meta:
		unique_together = ('constant_group', 'locale', )

class Constant(models.Model):
	constant_group = models.ForeignKey(ConstantGroup, on_delete=models.CASCADE, related_name='constant')
	constant_code = models.CharField(unique=True, max_length=30, db_index=True)
	constant_value = models.CharField(max_length=500)
	staff_only = models.BooleanField()
	superuser_only = models.BooleanField()

	def __str__(self):
		return self.constant_code

class ConstantTranslate(models.Model):
	constant = models.ForeignKey(Constant, on_delete=models.CASCADE, related_name='constant_translate')
	locale = models.ForeignKey(LocaleName, to_field='locale_code', on_delete=models.CASCADE, related_name='constant_translate_locale')
	constant_value = models.CharField(max_length=500)

	class Meta:
		unique_together = ('constant', 'locale', )