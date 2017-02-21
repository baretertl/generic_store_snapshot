from rest_framework import viewsets
from .models import Location, ContactInfo, StoreHour
from .serializers import LocationSerializer, ContactInfoSerializer, StoreHourSerializer

class LocationViewSet(viewsets.ReadOnlyModelViewSet):
	queryset = Location.objects.all()
	serializer_class = LocationSerializer

class ContactInfoViewSet(viewsets.ReadOnlyModelViewSet):
	queryset = ContactInfo.objects.all()
	serializer_class = ContactInfoSerializer

class StoreHourViewSet(viewsets.ReadOnlyModelViewSet):
	queryset = StoreHour.objects.all()
	serializer_class = StoreHourSerializer