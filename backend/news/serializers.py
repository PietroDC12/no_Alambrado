from rest_framework import serializers
from .models import Information

class InformationSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Information
        fields = '__all__'

    def get_image_url(self, obj):
        request = self.context.get('request')  # Obtém a request para gerar URL absoluta
        if obj.image and request:  # Substitua `image` pelo nome correto do campo
            return request.build_absolute_uri(obj.image.url)
        return None