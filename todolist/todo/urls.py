from django.conf.urls import url, include
from rest_framework import routers

from . import views

todo_router = routers.DefaultRouter()
todo_router.register(r'todos', views.TodoViewSet, base_name='todos')

app_name = "todo"

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^welcome/', views.welcome, name='welcome'),
    url('^api/', include(todo_router.urls)),
]