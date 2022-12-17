from django.urls import path

from . import views

urlpatterns = [
    path('submit_answer', views.submit_answer, name='submit_answer'),
]
