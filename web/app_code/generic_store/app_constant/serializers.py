from rest_framework import serializers
from generic_store.settings import LANGUAGE_CODE, SESSION_KEY	
from .models import AppConstant, AppConstantTranslate


#helper functions for getting translation objects
def get_current_locale(request):
	if SESSION_KEY["CURRENT_LOCALE"] in request.session:
		return request.session[SESSION_KEY["CURRENT_LOCALE"]]

	else:
		return LANGUAGE_CODE

def get_app_constant_translate(request, app_constant_obj):
	#query for object
	locale = get_current_locale(request)

	try:
		return AppConstantTranslate.objects.get(app_constant=app_constant_obj, locale=locale)

	except AppConstantTranslate.DoesNotExist:
		return AppConstantTranslate.objects.get(app_constant=app_constant_obj, locale=LANGUAGE_CODE)

#serializer classes
class AppConstantSerializer(serializers.ModelSerializer):
	#fields
	constant_code = serializers.CharField(max_length=30, read_only=True)
	constant_value = serializers.CharField(max_length=500, read_only=True)
	#method fields
	constant_value_translate = serializers.SerializerMethodField(read_only=True)

	class Meta:
		model = AppConstant
		fields = ('id', 'constant_code', 'constant_value', 'constant_value_translate', )

	#serializer method fields
	def get_constant_value_translate(self, obj):
		request = self.context.get('request')
		return get_app_constant_translate(request, obj).constant_value