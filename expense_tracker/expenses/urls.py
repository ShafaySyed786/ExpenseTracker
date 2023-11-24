from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ExpenseViewSet, ExpenseAnalyticsView

router = DefaultRouter()
router.register(r'expenses', ExpenseViewSet)

urlpatterns = [
    #urls from the router
    path('', include(router.urls)),

    #custom view url
    path('analytics/', ExpenseAnalyticsView.as_view(), name='expense-analytics'),
]