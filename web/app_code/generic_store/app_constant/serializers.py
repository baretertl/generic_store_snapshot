from rest_framework import serializers
from generic_store.settings import LANGUAGE_CODE, SESSION_KEY	
from .models import AppConstant, AppConstantTranslate

#helper functions for getting translation objects
def get_current_locale(request):
	if SESSION_KEY['CURRENT_LOCALE'] in request.session:
		return request.session[SESSION_KEY['CURRENT_LOCALE']]

	else:
		return LANGUAGE_CODE

def get_app_constant_translate(request, app_constant_obj):
	#query for object
	locale = get_current_locale(request)
	try:
		return AppConstantTranslate.objects.get(app_constant=app_constant_obj, locale=locale)

	except AppConstantTranslate.DoesNotExist:
		return None

#serializer classes
class AppConstantSerializer(serializers.ModelSerializer):
	#fields
	constant_code = serializers.CharField(max_length=30, read_only=True)
	#method fields
	constant_value = serializers.SerializerMethodField(read_only=True)

	class Meta:
		model = AppConstant
		fields = ('id', 'constant_code', 'constant_value', 'constant_value_translate', )

	#serializer method fields
	def get_constant_value(self, obj):
		request = self.context.get('request')
		translate_obj = get_app_constant_translate(request, obj)
		if not translate_obj is None:
			return translate_obj.constant_value

		return obj.constant_value