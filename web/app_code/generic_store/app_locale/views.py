from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import viewsets
from generic_store.settings import LANGUAGE_CODE, SESSION_KEY	
from .models import LocaleName
from .serializers import LocaleNameSerializer

#get current locale in session 
@api_view(['GET'])
def get_locale(request, format='json'):
	if not SESSION_KEY['CURRENT_LOCALE'] in request.session:
		request.session[SESSION_KEY['CURRENT_LOCALE']] = LANGUAGE_CODE

	locale_obj = LocaleName.objects.get(locale_code=request.session[SESSION_KEY['CURRENT_LOCALE']])
	locale_ser = LocaleNameSerializer(locale_obj)
	return Response(locale_ser.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def set_locale(request, format='json'):
	try:
		locale_obj = LocaleName.objects.get(locale_code=request.data.get('locale_code'))
		locale_ser = LocaleNameSerializer(locale_obj)
		request.session[SESSION_KEY['CURRENT_LOCALE']] = locale_obj.locale_code
		return Response(locale_ser.data, status=status.HTTP_200_OK)

	except LocaleName.DoesNotExist:
		return Response({'detail': 'Invalid locale code'}, status=status.HTTP_400_BAD_REQUEST)

#class view for retrieving available locale
class AppLocaleNameViewSet(viewsets.ReadOnlyModelViewSet):
	queryset = LocaleName.objects.all()
	serializer_class = LocaleNameSerializer