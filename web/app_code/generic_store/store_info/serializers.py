from rest_framework import serializers
from generic_store.settings import LANGUAGE_CODE, SESSION_KEY	
from .models import Location, ContactInfo, StoreHour, StoreHourTranslate, StoreName

#helper functions for getting translation objects
def get_current_locale(request):
	if SESSION_KEY['CURRENT_LOCALE'] in request.session:
		return request.session[SESSION_KEY['CURRENT_LOCALE']]

	else:
		return LANGUAGE_CODE

def get_store_hour_translate(request, store_hour_obj):
		#query for object
	locale = get_current_locale(request)
	try:
		return StoreHourTranslate.objects.get(store_hour=store_hour_obj, locale=locale)

	except StoreHourTranslate.DoesNotExist:
		return None

#serializer classes
class LocationSerializer(serializers.ModelSerializer):
	#fields
	address_line_1 = serializers.CharField(max_length=255, read_only=True)
	address_line_2 = serializers.CharField(max_length=255, read_only=True)
	city = serializers.CharField(max_length=50, read_only=True)
	state_code = serializers.CharField(max_length=2, read_only=True)
	state_name = serializers.CharField(max_length=20, read_only=True)
	postal_code = serializers.CharField(max_length=20, read_only=True)
	country = serializers.CharField(max_length=40, read_only=True)
	longitude = serializers.FloatField(read_only=True)
	latitude = serializers.FloatField(read_only=True)

	class Meta:
		model = Location
		fields = ('id', 'address_line_1', 'address_line_2', 'city', 'state_code', 'state_name', 'postal_code', 'country', 'longitude', 'latitude', )

class ContactInfoSerializer(serializers.ModelSerializer):
	#fields
	phone_number = serializers.CharField(max_length=16, read_only=True)
	email_address = serializers.EmailField(read_only=True)

	class Meta:
		model = ContactInfo
		fields = ('id', 'phone_number', 'email_address', )

class StoreHourSerializer(serializers.ModelSerializer):
	#fields
	day_code = serializers.IntegerField(read_only=True)
	open_hour = serializers.TimeField(read_only=True)
	close_hour = serializers.TimeField(read_only=True)
	#method fields
	day = serializers.SerializerMethodField(read_only=True)

	class Meta: 
		model = StoreHour
		fields = ('id', 'day_code', 'open_hour', 'close_hour', 'day', )

	def get_day(self, obj):
		request = self.context.get('request')
		translate_obj = get_store_hour_translate(request, obj)
		if not translate_obj is None:
			return translate_obj.day

		return obj.day

class StoreNameSerializer(serializers.ModelSerializer):
	#fields
	name = serializers.CharField(max_length=2000, read_only=True)

	class Meta:
		model = StoreName
		fields = ('id', 'name')