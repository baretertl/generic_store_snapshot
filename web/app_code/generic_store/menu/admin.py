from django.contrib import admin
from .models import Category, CategoryTranslate, Item, ItemTranslate, Variation, VariationTranslate, ItemChoice

class CategoryAdmin(admin.ModelAdmin):
	list_display = ('sort', )

class CategoryTranslateAdmin(admin.ModelAdmin):
	list_display = ('category', 'locale', 'name', 'description', )

class ItemAdmin(admin.ModelAdmin):
	list_display = ('category', 'image_url', 'price', 'sort', )

class ItemTranslateAdmin(admin.ModelAdmin):
	list_display = ('item', 'locale', 'name', 'description', )

class VariationAdmin(admin.ModelAdmin):
	list_display = ('item', 'image_url', 'price', 'sort', )

class VariationTranslateAdmin(admin.ModelAdmin):
	list_display = ('variation', 'locale', 'name', )

class ItemChoiceAdmin(admin.ModelAdmin):
	list_display = ('item', 'option', 'choice', )

# Register your models here.
admin.site.register(Category, CategoryAdmin)
admin.site.register(CategoryTranslate, CategoryTranslateAdmin)
admin.site.register(Item, ItemAdmin)
admin.site.register(ItemTranslate, ItemTranslateAdmin)
admin.site.register(Variation, VariationAdmin)
admin.site.register(VariationTranslate,VariationTranslateAdmin)
admin.site.register(ItemChoice, ItemChoiceAdmin)