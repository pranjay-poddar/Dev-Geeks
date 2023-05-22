from django.shortcuts import render
from django.http import JsonResponse
import requests

def get_weather(request,city):

    url = f'https://api.openweathermap.org/data/2.5/weather?q={city}&appid=84a1b6b42bb8510b8ad4467672d33010&units=metric'
    response = requests.get(url)
    data = response.json()
    return JsonResponse(data)

def index(request):
    return render(request,'index.html')