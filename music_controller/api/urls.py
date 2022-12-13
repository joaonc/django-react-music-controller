from django.urls import path

from . import views

urlpatterns = [
    path('rooms/', views.ListRoomsView.as_view()),
    path('room/join/', views.JoinRoomView.as_view()),
    path('room/user-in-room/', views.UserInRoomView.as_view()),
    path('room/<str:code>/', views.GetRoomView.as_view()),
    path('room/', views.CreateRoomView.as_view()),
]
