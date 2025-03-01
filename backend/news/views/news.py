from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib import messages
from news.models import News
from  django.core.paginator import Paginator
from django.shortcuts import render, redirect, get_object_or_404


def redes_sociais(request):
    return render(request, 'pages/redes_sociais.html')

def list_news(request):

    news = News.objects.order_by('-date_news')
    paginator = Paginator(news, 10)
    page = request.GET.get('page')
    news_per_page = paginator.get_page(page)

    dados = {
        'news': news_per_page
    }
    return render(request, 'pages/list_information.html', dados)

def news(request, news_id):
    news = get_object_or_404(News, pk=news_id)

    show_news = {
        'news': news
    }
    
    return render(request,'pages/information.html', show_news)

def publish_news(request):

    if request.method == "POST":
        author = request.POST["author"]
        tittle_news = request.POST["tittle_news"]
        subtittle_news = request.POST["subtittle_news"]
        text_news = request.POST["text_news"]
        image_news = request.FILES["image_news"]

        news = News.objects.create(author=author, tittle_news=tittle_news,
            subtittle_news=subtittle_news, text_news=text_news, image_news=image_news,)

        news.save()

        messages.success(request, "Nova notícia postada.")
        return redirect("index")
    
    else:
        return render(request, 'pages/publish_information.html')
    

#def delete_information(request, receita_id):
#    receita = get_object_or_404(Information, pk=receita_id )
#    receita.delete()
#    return redirect('dashboard')

#def edit_information(request, receita_id):
#    receita = get_object_or_404(Information, pk=receita_id)
#    receita_a_editar = { 'receita':receita }
#    return render(request, 'pages/edit_information.html', receita_a_editar)

#def update_information(request):
#    if request.method == 'POST':
#        receita_id = request.POST['receita_id']
#        r = Information.objects.get(pk=receita_id)
#        r.author = request.POST['author']
#        r.tittle_information = request.POST['tittle_information']
#        r.subtittle_information = request.POST['subtittle_information']
#        r.text_information = request.POST['text_information']
#        if 'image_information' in request.FILES:
#            r.image_information = request.FILES['image_information']
#        r.save()
#        return redirect('dashboard')
