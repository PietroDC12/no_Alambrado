from rest_framework import serializers
from .models import Information

class InformationSerializer(serializers.ModelSerializer):

    #text_news = serializers.SerializerMethodField()

    #def get_text_news(self, obj):
    #    return obj.text_news.replace("\n", "<br>") 
    
    class Meta:
        model = Information
        fields = '__all__'