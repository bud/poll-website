from django.urls import path

from . import views

urlpatterns = [
    path('create_poll', views.create_poll, name='create_poll'),
    path('edit_poll', views.edit_poll, name='edit_poll'),
    path('delete_poll', views.delete_poll, name='delete_poll'),
    path('get_all_polls', views.get_all_polls, name='get_all_polls'),
    path('get_polls_by_user', views.get_polls_by_user, name='get_polls_by_user'),
    path('get_polls_answered_by_user', views.get_polls_answered_by_user, name='get_polls_answered_by_user'),
    path('get_poll_by_id', views.get_poll_by_id, name='get_poll_by_id'),
    path('get_polls_by_title', views.get_polls_by_title, name='get_polls_by_title'),
    path('get_poll_statistics', views.get_poll_statistics, name='get_poll_statistics'),
]
