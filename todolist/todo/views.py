from django.core.urlresolvers import reverse
from django.shortcuts import render
from rest_framework import viewsets

from .models import Todo
from .serializers import TodoSerializer


class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer


def index(request):
    return render(request, 'base.html')


def welcome(request):
    context = {
        'todo_url': reverse('todo:index')
    }
    return render(request, 'welcome.html', context=context)