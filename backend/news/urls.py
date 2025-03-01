from django.urls import path
from .views import *

urlpatterns = [
    path('', index, name='index'),
    path('redes_sociais/', redes_sociais, name='redes_sociais'),

    path('list_news/', list_news, name='list_news'),
    path('publish_news/', publish_news, name='publish_news'),
    path('<int:news_id>/', news, name='news'),

    path('register/', register, name='register'),
    path('logon/', logon, name='logon'),
    path('logoff/', logoff, name='logoff'),
]
    