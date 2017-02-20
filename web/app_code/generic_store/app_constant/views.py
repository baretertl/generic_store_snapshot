from django.http import Http404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import AppConstantSerializer
from .models import AppConstant, AppConstantTranslate

# Create your views here
class AppConstantView(APIView):

	#post method needed to retrieve constants of specific codes
	def post(self, request, format='json'):
		app_const_obj_lst = []
		constant_code_list = request.data.get('constant_codes', [])

		if request.user.is_superuser:
			#get all allowed
			app_const_obj_lst = AppConstant.objects.filter(constant_code__in=constant_code_list)

		elif request.user.is_staff: 
			#get staff only codes
			app_const_obj_lst = AppConstant.objects.filter(constant_code__in=constant_code_list, superuser_only=False)

		else:
			#basic codes
			app_const_obj_lst = AppConstant.objects.filter(constant_code__in=constant_code_list, superuser_only=False, staff_only=False)

		app_const_ser = AppConstantSerializer(app_const_obj_lst, many=True, context={"request": self.request})

		print(app_const_ser.data)

		return Response(app_const_ser.data, status=status.HTTP_200_OK)
