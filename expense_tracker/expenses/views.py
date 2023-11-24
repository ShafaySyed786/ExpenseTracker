from django.shortcuts import render
from django.http import HttpResponse

from rest_framework import viewsets
from .models import Expense
from .serializers import ExpenseSerializer

class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

# Create your views here.
def home(request):
    return HttpResponse('Hello, this is the expense tracker home.')

