from django.shortcuts import render
from django.http import HttpResponse
from django.db.models import Sum, Avg
from django.db.models.functions import TruncMonth

from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Expense
from .serializers import ExpenseSerializer

class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

class ExpenseAnalyticsView(APIView):
    def get(self,request, format=None):
        total_expenses_per_month = Expense.objects.annotate(month=TruncMonth('date')).values('month').annotate(total=Sum('amount')).order_by('month')
        average_expense = Expense.objects.aggregate(Avg('amount'))

        return Response({
            'total_expenses_per_month': total_expenses_per_month,
            'average_expense': average_expense
        })

# Create your views here.
def home(request):
    return HttpResponse('Hello, this is the expense tracker home.')

