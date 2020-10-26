from django.db import models

# Create your models here.

class Data(models.Model):
    userId= models.IntegerField()
    title=models.CharField(max_length=600)
    body=models.TextField()