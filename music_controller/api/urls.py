from django.urls import path

from . import views

urlpatterns = [
    path('room/', views.CreateRoomView.as_view()),
]
