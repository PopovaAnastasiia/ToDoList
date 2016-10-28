from rest_framework import serializers
from .models import Todo


class TodoSerializer(serializers.ModelSerializer):
    name = serializers.CharField()
    is_completed = serializers.BooleanField
    class Meta:
        model = Todo
        fields=('id', 'name', 'is_completed')
