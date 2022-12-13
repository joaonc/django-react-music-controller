from django.urls import path

from . import views

urlpatterns = [
    path('rooms/', views.ListRoomsView.as_view()),
    path('room/<str:code>/', views.GetRoomView.as_view()),
    path('room/', views.CreateRoomView.as_view()),
]
