from django.db import models

class Expense(models.Model):
    description = models.CharField(max_length=255)
    amount = models.FloatField()
    date = models.DateField()
    category = models.CharField(max_length=100)  # Add this line

    def __str__(self):
        return self.description
