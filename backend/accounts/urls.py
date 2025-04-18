from django.urls import path
from .views import *

urlpatterns = [
    path("register/", register, name="register"),
    path("login/", login, name="login"),
    path("logout/", logout, name="logout"),
    path("csrf/", csrf_token, name="csrf_token"),
    ]