from django.db import models

# Create your models here.
class Expense(models.Model):
    description = models.CharField(max_length=255)
    amount = models.FloatField()
    date = models.DateField()
    
