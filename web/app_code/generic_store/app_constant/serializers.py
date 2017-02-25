from rest_framework import serializers
from generic_store.settings import LANGUAGE_CODE, SESSION_KEY	
from .models import AppConstantGroup, AppConstantGroupTranslate, AppConstant, AppConstantTranslate

#helper functions for getting translation objects
def get_current_locale(request):
	if SESSION_KEY['CURRENT_LOCALE'] in request.session:
		return request.session[SESSION_KEY['CURRENT_LOCALE']]

	else:
		return LANGUAGE_CODE

def get_app_constant_group_translate(request, app_constant_group_obj):
	#query for object
	locale = get_current_locale(request)
	try:
		return AppConstantGroupTranslate.objects.get(app_constant_group=app_constant_group_obj, locale=locale)

	except AppConstantGroupTranslate.DoesNotExist:
		return None

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
		fields = ('id', 'constant_code', 'constant_value', )

	#serializer method fields
	def get_constant_value(self, obj):
		request = self.context.get('request')
		translate_obj = get_app_constant_translate(request, obj)
		if not translate_obj is None:
			return translate_obj.constant_value

		return obj.constant_value

class AppConstantGroupSerializer(serializers.ModelSerializer):
	#fields
	constant_group_code = serializers.CharField(max_length=30, read_only=True)
	#method fields
	constant_group_name = serializers.SerializerMethodField(read_only=True)
	app_constant = serializers.SerializerMethodField(read_only=True)

	class Meta:
		model = AppConstantGroup
		fields = ('id', 'constant_group_code', 'constant_group_name', 'app_constant', )

	#serializer method fields
	def constant_group_name(self, obj):
		translate_obj = get_app_constant_group_translate(request, obj)
		if not translate_obj is None:
			return translate_obj.constant_group_name

		return obj.constant_group_name

	def get_app_constant(self, obj):
		request = self.context.get('request')
		post_data = request.data['group_codes']
		constant_codes = None
		app_const_qry_set = None
		
		for i in post_data:
			if obj.constant_group_code == i['constant_group_code'] and 'constant_codes' in i:
				constant_codes = i['constant_codes']
				break

		if constant_codes is None:
			#get all codes for this group, but filter on user permissions
			if request.user.is_superuser:
				app_const_qry_set = AppConstant.objects.filter(app_constant_group=obj)								

			elif request.user.is_staff:
				app_const_qry_set = AppConstant.objects.filter(app_constant_group=obj, superuser_only=False)

			else:
				app_const_qry_set = AppConstant.objects.filter(app_constant_group=obj, superuser_only=False, staff_only=False)

		else:
			#get only the specified codes and filter on user permissions
			if request.user.is_superuser:
				app_const_qry_set = AppConstant.objects.filter(app_constant_group=obj, constant_code__in=constant_codes)

			elif request.user.is_staff:
				app_const_qry_set = AppConstant.objects.filter(app_constant_group=obj, constant_code__in=constant_codes, superuser_only=False)

			else:
				app_const_qry_set = AppConstant.objects.filter(app_constant_group=obj, constant_code__in=constant_codes, superuser_only=False, staff_only=False)

		app_const_ser = AppConstantSerializer(app_const_qry_set, many=True, context=self.context)
		return app_const_ser.data