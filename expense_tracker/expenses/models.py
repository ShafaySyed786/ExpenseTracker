from django.db import models

# Create your models here.
class Expense(models.Model):
    decription = models.CharField(max_length=256)
    amount = models.FloatField()
    date = models.DateField()
    
