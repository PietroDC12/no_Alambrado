from news.models import Information
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from news.serializers import InformationSerializer
from rest_framework.response import Response
from rest_framework import status
from news.serializers import InformationSerializer
from django.http import JsonResponse
from django.shortcuts import get_object_or_404

@api_view(['GET'])
def list_news(request):
    noticias = Information.objects.all().order_by('-date_news')  # Ordena pela data mais recente
    serializer = InformationSerializer(noticias, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def news_details(request, news_id):
    try:
        noticia = Information.objects.get(pk=news_id)
        serializer = InformationSerializer(noticia)
        return Response(serializer.data)
    except Information.DoesNotExist:
        return Response({"error": "Notícia não encontrada"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_news(request):
    print(request.POST)  # Mostra os dados recebidos no terminal
    
    serializer = InformationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    print(serializer.errors)  # Exibe os erros de validação caso existam
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'PATCH'])
def update_news(request, id):
    try:
        news = Information.objects.get(id=id)
    except Information.DoesNotExist:
        return Response({"error": "Notícia não encontrada"}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = InformationSerializer(news, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_news(request, id):
    try:
        news = Information.objects.get(id=id)
        news.delete()
        return Response({"message": "Notícia deletada com sucesso"}, status=status.HTTP_204_NO_CONTENT)
    except Information.DoesNotExist:
        return Response({"error": "Notícia não encontrada"}, status=status.HTTP_404_NOT_FOUND)
    
# Contagem de cliques em cada notícia
def count_click(request, news_id):
    noticia = get_object_or_404(Information, id=news_id)
    noticia.click_count += 1
    noticia.save()
    return JsonResponse({"message": "Clique registrado", "clicks": noticia.click_count})

def noticias_mais_clicadas(request):
    noticias = Information.objects.order_by("-click_count")[:10].values("id", "tittle_news", "click_count")
    return JsonResponse(list(noticias), safe=False)