from rest_framework import serializers
from .models import Information

class InformationSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Information
        fields = '__all__'

    def get_image_url(self, obj):
        if obj.image_news:
            return obj.image_news.url  # Retorna a URL da imagem hospedada no Cloudinary
        return None