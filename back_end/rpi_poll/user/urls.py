from django.urls import path

from . import views

urlpatterns = [
    path('sign_up', views.user_sign_up, name='create_user'),
    path('log_in', views.user_log_in, name='log_in'),
    path('get_user_by_id', views.get_user_by_id, name='get_user_by_id'),
]