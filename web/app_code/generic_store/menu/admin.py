from django.contrib import admin
from .models import Category, CategoryTranslate, Item, ItemTranslate, Variation, VariationTranslate, ItemChoice

class CategoryAdmin(admin.ModelAdmin):
	list_display = ('id', 'category_code', 'sort', 'name', 'description', )

class CategoryTranslateAdmin(admin.ModelAdmin):
	list_display = ('id', 'category', 'locale', 'name', 'description', )

class ItemAdmin(admin.ModelAdmin):
	list_display = ('id', 'category', 'image_url', 'price', 'sort', 'name', 'description', )

class ItemTranslateAdmin(admin.ModelAdmin):
	list_display = ('id', 'item', 'locale', 'name', 'description', )

class VariationAdmin(admin.ModelAdmin):
	list_display = ('id', 'item', 'image_url', 'price', 'sort', 'name', )

class VariationTranslateAdmin(admin.ModelAdmin):
	list_display = ('id', 'variation', 'locale', 'name', )

class ItemChoiceAdmin(admin.ModelAdmin):
	list_display = ('id', 'item', 'option', 'choice', )

admin.site.register(Category, CategoryAdmin)
admin.site.register(CategoryTranslate, CategoryTranslateAdmin)
admin.site.register(Item, ItemAdmin)
admin.site.register(ItemTranslate, ItemTranslateAdmin)
admin.site.register(Variation, VariationAdmin)
admin.site.register(VariationTranslate,VariationTranslateAdmin)
admin.site.register(ItemChoice, ItemChoiceAdmin)