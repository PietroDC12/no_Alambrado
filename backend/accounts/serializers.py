from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers

# Obtém o modelo customizado de usuário
User = get_user_model()

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        # Cria o token e adiciona informações extras, como email
        token = super().get_token(user)
        token["email"] = user.email  # Adiciona o email ao token
        return token

    def validate(self, attrs):
        # Recupera email e senha do payload da requisição
        email = attrs.get("email")
        password = attrs.get("password")

        # Verifica se o usuário existe no banco de dados
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError("Credenciais inválidas. Verifique e tente novamente.")

        # Valida a senha do usuário
        if not user.check_password(password):
            raise serializers.ValidationError("Credenciais inválidas. Verifique e tente novamente.")

        # Necessário para que o SimpleJWT gere o token corretamente
        attrs["username"] = user.email  # Usa o email como substituto para o campo username
        return super().validate(attrs)
