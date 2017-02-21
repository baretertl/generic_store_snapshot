from django.contrib import admin
from .models import Location, ContactInfo, StoreHour, StoreHourTranslate

class LocationAdmin(admin.ModelAdmin):
	list_display = ('id', 'address_line_1', 'address_line_2', 'city', 'state_code', 'state_name', 'postal_code', 'country', 'longitude', 'latitude', )

class ContactInfoAdmin(admin.ModelAdmin):
	list_display = ('id', 'phone_number', 'email_address', )

class StoreHourAdmin(admin.ModelAdmin):
	list_display = ('id', 'day_code', 'open_hour', 'close_hour', 'day', )

class StoreHourTranslateAdmin(admin.ModelAdmin):
	list_display = ('id', 'store_hour', 'locale', 'day', )

admin.site.register(Location, LocationAdmin)
admin.site.register(ContactInfo, ContactInfoAdmin)
admin.site.register(StoreHour, StoreHourAdmin)
admin.site.register(StoreHourTranslate, StoreHourTranslateAdmin)