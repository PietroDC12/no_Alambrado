from django.urls import path
from .views import *

urlpatterns = [

    path('noticias/', list_news, name='list_news'),
    path('noticias/<int:news_id>/', news_details, name='news_details'),
    path('noticias/criar/', create_news, name="create_news"),
    path('noticias/<int:id>/editar/', update_news, name='update_news'),
    path('noticias/<int:id>/deletar/', delete_news, name='delete_news'),
    path('noticia/<int:news_id>/clique/', count_click, name='count_click'),
    path("noticias-mais-clicadas/", noticias_mais_clicadas, name="noticias-mais-clicadas"),

]
    