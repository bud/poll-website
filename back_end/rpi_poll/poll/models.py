from django.db import models
from django.contrib.postgres.fields import ArrayField


class Poll(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey('user.User', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=2000)
    question = models.CharField(max_length=2000)
    answers = ArrayField(models.CharField(max_length=2000), blank=False, null=False)
    is_open = models.BooleanField(default=True)

    class Meta:
        db_table = 'poll'
