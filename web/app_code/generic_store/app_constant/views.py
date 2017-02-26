from django.http import Http404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import ConstantGroup
from .serializers import ConstantGroupSerializer


class ConstantGroupView(APIView):

	#post method needed to retrieve constants of specific group/codes
	def post(self, request, format='json'):
		post_data = request.data.get('group_codes')
		const_grp_cds_lst = []		
		for i in post_data:
			const_grp_cds_lst.append(i['constant_group_code'])

		const_grp_qry_set = ConstantGroup.objects.filter(constant_group_code__in=const_grp_cds_lst)
		const_grp_ser = ConstantGroupSerializer(const_grp_qry_set, many=True, context={'request': self.request})
		return Response(const_grp_ser.data, status=status.HTTP_200_OK)