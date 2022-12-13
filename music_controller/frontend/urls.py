from django.urls import path

from . import views


# All frontend urls need to be declared here, as well as in React Router.
# Here they all redirect to `index.html`, which renders the React `App` component.
urlpatterns = [
    path('', views.index),
    path('join', views.index),
    path('create', views.index),
    path('room/<str:roomCode>', views.index),
]
