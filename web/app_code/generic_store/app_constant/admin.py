from django.contrib import admin
from .models import AppConstant, AppConstantTranslate

class AppConstantAdmin(admin.ModelAdmin):
	list_display = ('id', 'constant_code', 'constant_value', 'staff_only', 'superuser_only', )

class AppConstantTranslateAdmin(admin.ModelAdmin):
	list_display = ('id', 'app_constant', 'locale', 'constant_value', )

admin.site.register(AppConstant, AppConstantAdmin)
admin.site.register(AppConstantTranslate, AppConstantTranslateAdmin)