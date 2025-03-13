from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from news.models import Information

def index(request):
    news = Information.objects.order_by('-date_news').filter(id=5)

    dados = {
        'news': news
    }
    return render(request, 'pages/index.html', dados)

def register(request):

    if request.method == "POST":
        username = request.POST["username"]
        name = request.POST["name"]
        lastname = request.POST["lastname"]
        email = request.POST["email"]
        pass1 = request.POST["pass1"]
        pass2 = request.POST["pass2"]

        user = User.objects.create_user(username, email, pass1)
        user.first_name = name
        user.last_name = lastname

        user.save()

        messages.success(request, "Sua conta foi criada com sucesso.")

        return redirect("login")
    return render(request, 'login/register.html')


def logon(request):

    if request.method == "POST":
        username = request.POST["username"]
        pass1 = request.POST["pass1"]

        user = authenticate(username=username, password=pass1)

        if user is not None:
            login(request, user)
            name = user.first_name
            return render(request, "pages/index.html", {"name": name})


        else:
            messages.error(request, "Falha no login")
            return redirect("index")
            

    return render(request, 'login/login.html')

def logoff(request):
    logout(request)
    messages.success(request, "Login encerrado com sucesso.")
    return redirect("index")


