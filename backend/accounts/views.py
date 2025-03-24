from django.contrib.auth.models import User
from django.contrib.auth import get_user_model, authenticate
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from django.conf import settings
from django.middleware.csrf import get_token


@api_view(["POST"])
def register(request):
    """Registro de novo usuário"""
    email = request.data.get("email")
    password = request.data.get("password")

    if User.objects.filter(email=email).exists():
        return Response({"error": "Usuário já existe"}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(email=email, password=password)
    return Response({"message": "Usuário criado com sucesso!"}, status=status.HTTP_201_CREATED)


User = get_user_model()

@api_view(["POST"])
def login(request):
    """Autenticação de usuário e armazenamento do JWT em cookie HTTP-only"""
    email = request.data.get("email")
    password = request.data.get("password")

    user = authenticate(email=email, password=password)
    
    if user:
        refresh = RefreshToken.for_user(user)
        response = Response({"message": "Login realizado com sucesso!"})

        # Definir o token de acesso como um cookie seguro
        response.set_cookie(
            key="access_token",
            value=str(refresh.access_token),
            httponly=True,  # Impede que JavaScript acesse o cookie
            secure=False,  # Mude para True em produção (HTTPS obrigatório)
            samesite="Lax",
        )

        response.set_cookie(
            key="refresh_token",
            value=str(refresh),
            httponly=True,
            secure=False, 
            samesite="Lax",
        )

        # Retornar o CSRF Token também
        response.data["csrf_token"] = get_token(request)

        return response

    return Response({"error": "Credenciais inválidas"}, status=401)


@api_view(["POST"])
def logout(request):
    """Remove os cookies de autenticação"""
    response = Response({"message": "Logout realizado com sucesso!"})
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")
    return response


@api_view(["GET"])
def csrf_token(request):
    """Retorna o CSRF Token para o frontend"""
    return Response({"csrfToken": get_token(request)})