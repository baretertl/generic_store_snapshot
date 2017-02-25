from django.http import Http404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import AppConstantGroup
from .serializers import AppConstantGroupSerializer


class AppConstantGroupView(APIView):

	#post method needed to retrieve constants of specific group/codes
	def post(self, request, format='json'):
		post_data = request.data.get('group_codes')
		app_constt_grp_cds_lst = []		
		for i in post_data:
			app_constt_grp_cds_lst.append(i['constant_group_code'])

		app_const_grp_qry_set = AppConstantGroup.objects.filter(constant_group_code__in=app_constt_grp_cds_lst)
		app_const_grp_ser = AppConstantGroupSerializer(app_const_grp_qry_set, many=True, context={'request': self.request})
		return Response(app_const_grp_ser.data, status=status.HTTP_200_OK)