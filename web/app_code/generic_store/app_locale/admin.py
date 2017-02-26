from django.contrib import admin
from .models import LocaleName

# Register your models here.
class LocaleNameAdmin(admin.ModelAdmin):
	list_display = ('id', 'locale_code', 'locale_name', )

admin.site.register(LocaleName, LocaleNameAdmin)