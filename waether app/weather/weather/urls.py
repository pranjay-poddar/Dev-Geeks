
from django.contrib import admin
from django.urls import path
from . import views
from .views import get_weather
urlpatterns = [
    path('admin/', admin.site.urls),
    path('',views.index,name='index'),
    path('api/weather/<str:city>/', get_weather, name='get_weather'),
]
