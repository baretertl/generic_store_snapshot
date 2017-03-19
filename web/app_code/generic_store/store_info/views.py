from rest_framework import viewsets
from .models import Location, ContactInfo, StoreHour, StoreName
from .serializers import LocationSerializer, ContactInfoSerializer, StoreHourSerializer, StoreNameSerializer

class LocationViewSet(viewsets.ReadOnlyModelViewSet):
	queryset = Location.objects.all()
	serializer_class = LocationSerializer

class ContactInfoViewSet(viewsets.ReadOnlyModelViewSet):
	queryset = ContactInfo.objects.all()
	serializer_class = ContactInfoSerializer

class StoreHourViewSet(viewsets.ReadOnlyModelViewSet):
	queryset = StoreHour.objects.all()
	serializer_class = StoreHourSerializer


class StoreNameViewSet(viewsets.ReadOnlyModelViewSet):
	queryset = StoreName.objects.all()
	serializer_class = StoreNameSerializer