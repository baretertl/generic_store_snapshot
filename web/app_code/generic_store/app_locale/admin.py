from django.contrib import admin
from .models import AppLocaleName

# Register your models here.
class AppLocaleNameAdmin(admin.ModelAdmin):
	list_display = ('id', 'locale_code', 'locale_name', )

admin.site.register(AppLocaleName, AppLocaleNameAdmin)