from django.db import models
from datetime import datetime

# Create your models here.
class Information(models.Model):
    author = models.CharField(max_length=100)
    tittle_news = models.CharField(max_length=200)
    subtittle_news = models.CharField(max_length=400)
    text_news = models.TextField()
    image_news = models.ImageField(upload_to='images_news/', blank=True)
    date_news = models.DateTimeField(default=datetime.now, blank=True)
    click_count = models.IntegerField(default=0)


    def __str__(self):
        return self.tittle_news

    class Meta:
        verbose_name = 'information'
        verbose_name_plural = 'informations'