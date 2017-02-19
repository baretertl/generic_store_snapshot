from rest_framework import viewsets
from .models import Category, CategoryTranslate, Item, ItemTranslate, Variation, VariationTranslate, ItemChoice
from .serializers import CategorySerializer

# Create your views here.
class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
	queryset = Category.objects.all()
	serializer_class = CategorySerializer