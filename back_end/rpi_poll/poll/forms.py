from django import forms
from .models import Poll


class PollForm(forms.ModelForm):
    class Meta:
        model = Poll
        fields = ['id', 'title', 'description', 'question', 'answers', 'is_open']