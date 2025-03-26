from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)  # Define email como único
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)

    username = None  # Remove o campo padrão de username

    USERNAME_FIELD = 'email'  # Define o email como campo único para login
    REQUIRED_FIELDS = ['first_name', 'last_name']  # Campos obrigatórios na criação do usuário

    def __str__(self):
        return self.email
