from rest_framework import serializers
from .models import AppLocaleName

class AppLocaleNameSerializer(serializers.ModelSerializer):
	locale_code = serializers.CharField(max_length=15, read_only=True)
	locale_name = serializers.CharField(max_length=50, read_only=True)

	class Meta:
		model = AppLocaleName
		fields = ('id', 'locale_code', 'locale_name')