from .models import Data
from rest_framework.serializers import ModelSerializer


class DataModelSerializer(ModelSerializer):
    class Meta:
        model=Data
        fields='__all__'