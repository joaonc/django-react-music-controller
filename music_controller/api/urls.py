from django.urls import path

from . import views


urlpatterns = [
    path('room/', views.RoomViewList.as_view()),
    path('room/', views.RoomViewCreate.as_view()),
]
