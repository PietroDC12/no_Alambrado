from django.contrib import admin
from .models import Information

class Informations(admin.ModelAdmin):
    list_display = ('id', 'tittle_news')
    list_display_links = ('id', 'tittle_news')
    search_fields = ('id',)
    list_filter = ('tittle_news',)
    list_per_page = 10

admin.site.register(Information, Informations)
