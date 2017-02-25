from django.contrib import admin
from .models import AppConstantGroup, AppConstantGroupTranslate, AppConstant, AppConstantTranslate

class AppConstantGroupAdmin(admin.ModelAdmin):
	list_display = ('id', 'constant_group_code', 'constant_group_name', )

class AppConstantGroupTranslateAdmin(admin.ModelAdmin):
	list_display = ('id', 'app_constant_group', 'locale', 'constant_group_name', )

class AppConstantAdmin(admin.ModelAdmin):
	list_display = ('id', 'app_constant_group', 'constant_code', 'constant_value', 'staff_only', 'superuser_only', )

class AppConstantTranslateAdmin(admin.ModelAdmin):
	list_display = ('id', 'app_constant', 'locale', 'constant_value', )

admin.site.register(AppConstantGroup, AppConstantGroupAdmin)
admin.site.register(AppConstantGroupTranslate, AppConstantGroupTranslateAdmin)
admin.site.register(AppConstant, AppConstantAdmin)
admin.site.register(AppConstantTranslate, AppConstantTranslateAdmin)