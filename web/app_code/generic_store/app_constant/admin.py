from django.contrib import admin
from .models import ConstantGroup, ConstantGroupTranslate, Constant, ConstantTranslate

class ConstantGroupAdmin(admin.ModelAdmin):
	list_display = ('id', 'constant_group_code', 'constant_group_name', )

class ConstantGroupTranslateAdmin(admin.ModelAdmin):
	list_display = ('id', 'constant_group', 'locale', 'constant_group_name', )

class ConstantAdmin(admin.ModelAdmin):
	list_display = ('id', 'constant_group', 'constant_code', 'constant_value', 'staff_only', 'superuser_only', )

class ConstantTranslateAdmin(admin.ModelAdmin):
	list_display = ('id', 'constant', 'locale', 'constant_value', )

admin.site.register(ConstantGroup, ConstantGroupAdmin)
admin.site.register(ConstantGroupTranslate, ConstantGroupTranslateAdmin)
admin.site.register(Constant, ConstantAdmin)
admin.site.register(ConstantTranslate, ConstantTranslateAdmin)