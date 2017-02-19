from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import viewsets
from generic_store.settings import LANGUAGE_CODE, SESSION_KEY	
from .models import AppLocaleName
from .serializers import AppLocaleNameSerializer

#get current locale in session 
@api_view(['GET'])
def current(request, format='json'):
	if not SESSION_KEY["CURRENT_LOCALE"] in request.session:
		request.session[SESSION_KEY["CURRENT_LOCALE"]] = LANGUAGE_CODE

	app_locale_obj = AppLocaleName.objects.get(locale_code=request.session[SESSION_KEY["CURRENT_LOCALE"]])
	app_locale_ser = AppLocaleNameSerializer(app_locale_obj)
	return Response(app_locale_ser.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def set(request, format='json'):
	try:
		app_locale_obj = AppLocaleName.objects.get(locale_code=request.data.get("locale_code"))
		app_locale_ser = AppLocaleNameSerializer(app_locale_obj)
		request.session[SESSION_KEY["CURRENT_LOCALE"]] = app_locale_obj.locale_code
		return Response(app_locale_ser.data, status=status.HTTP_200_OK)

	except AppLocaleName.DoesNotExist:
		return Response({"detail": "Invalid locale code"}, status=status.HTTP_400_BAD_REQUEST)

#class view for retrieving available locale
class AppLocaleNameViewSet(viewsets.ReadOnlyModelViewSet):
	queryset = AppLocaleName.objects.all()
	serializer_class = AppLocaleNameSerializer