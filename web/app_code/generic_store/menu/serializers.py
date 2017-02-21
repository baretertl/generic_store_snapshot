from rest_framework import serializers
from generic_store.settings import LANGUAGE_CODE, SESSION_KEY	
from .models import Category, CategoryTranslate, Item, ItemTranslate, Variation, VariationTranslate, ItemChoice

#helper functions for getting translation objects
def get_current_locale(request):
	if SESSION_KEY['CURRENT_LOCALE'] in request.session:
		return request.session[SESSION_KEY['CURRENT_LOCALE']]

	else:
		return LANGUAGE_CODE

def get_category_translate(request, category_obj):
	#query for object
	locale = get_current_locale(request)
	try:
		return CategoryTranslate.objects.get(category=category_obj, locale=locale)
	
	except CategoryTranslate.DoesNotExist:
		return None

def get_item_translate(request, item_obj):
	#query for object
	locale = get_current_locale(request)
	try:
		return ItemTranslate.objects.get(item=item_obj, locale=locale)
	
	except ItemTranslate.DoesNotExist:
		return None

def get_variation_translate(request, variation_translate):
	#query for object
	locale = get_current_locale(request)
	try:
		return VariationTranslate.objects.get(variation=variation_translate, locale=locale)
	
	except VariationTranslate.DoesNotExist:
		return None

#serializer classes
class VariationSerializer(serializers.ModelSerializer):
	#fields
	image_url = serializers.CharField(max_length=100, read_only=True)
	price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
	sort = serializers.IntegerField(read_only=True)
	#method fields
	name = serializers.SerializerMethodField(read_only=True)

	class Meta:
		model = Variation
		fields = ('id', 'image_url', 'price', 'sort', 'name', )

	#serializer method fields
	def get_name(self, obj):
		request = self.context.get('request')
		translate_obj = get_variation_translate(request, obj)
		if not translate_obj is None:
			return translate_obj.name

		return obj.name

class ItemSerializer(serializers.ModelSerializer):
	#fields
	image_url = serializers.CharField(max_length=100, read_only=True)
	price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
	sort = serializers.IntegerField(read_only=True)
	#method fields
	name = serializers.SerializerMethodField(read_only=True)
	description = serializers.SerializerMethodField(read_only=True)	
	item_choice = serializers.SerializerMethodField(read_only=True)
	#nested fields
	variation = VariationSerializer(many=True, read_only=True)

	class Meta:
		model = Item
		fields = ('id', 'image_url', 'price', 'sort', 'name', 'description', 'variation', 'item_choice', )

	#serializer method fields
	def get_name(self, obj):
		request = self.context.get('request')
		translate_obj = get_item_translate(request, obj)
		if not translate_obj is None:
			return translate_obj.name

		return obj.name

	def get_description(self, obj):
		request = self.context.get('request')
		translate_obj = get_item_translate(request, obj)
		if not translate_obj is None:
			return translate_obj.description

		return obj.description

	def get_item_choice(self, obj):
		request = self.context.get('request')
		try:
			#get item choices for this item
			item_choice_list = ItemChoice.objects.filter(item=obj)
			ret_list = {}
			for item in item_choice_list:
				#create choice key
				choice_key = str(item.choice)
				if not choice_key in ret_list:
					ret_list[choice_key] = []

				#get item translate object
				item_translate_obj = get_item_translate(request, item.option)
				if item_translate_obj is None:
					item_name = item.option.name
				
				else:
					item_name = item_translate_obj.name

				#check if there are variations on this item
				variation_list = Variation.objects.filter(item=item.option)
				if variation_list.count() > 0:
					#get all variations
					for variation in variation_list:
						variation_translate_obj = get_variation_translate(request, variation)
						if variation_translate_obj is None:
							ret_list[choice_key].append({'item_id': item.option.id, 'item_name': item_name,
																					 'variation_id': variation.id, 'variation_name': variation.name})
							
						else:
							ret_list[choice_key].append({'item_id': item.option.id, 'item_name': item_name,
																					 'variation_id': variation.id, 'variation_name': variation_translate_obj.name})


				else:
					#no variations, just add item name					
					ret_list[choice_key].append({'item_id': item.option.id, 'item_name': item_name})

			return ret_list

		except ItemChoice.DoesNotExist:
			return {}

class CategorySerializer(serializers.ModelSerializer):
	#fields
	category_code = serializers.CharField(max_length=15, read_only=True)
	sort = serializers.IntegerField(read_only=True)
	#method fields
	name = serializers.SerializerMethodField(read_only=True)
	description = serializers.SerializerMethodField(read_only=True)	
	#nested fields
	item = ItemSerializer(many=True, read_only=True)

	class Meta:
		model = Category
		fields = ('id', 'category_code', 'sort', 'name', 'description', 'item', )

	#serializer method fields
	def get_name(self, obj):
		request = self.context.get('request')
		translate_obj = get_category_translate(request, obj)
		if not translate_obj is None:
			return translate_obj.name

		return obj.name

	def get_description(self, obj):
		request = self.context.get('request')
		translate_obj = get_category_translate(request, obj)
		if not translate_obj is None:
			return translate_obj.description

		return obj.description