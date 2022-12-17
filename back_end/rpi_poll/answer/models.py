from django.db import models

from django.db import models


class Answer(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey('user.User', on_delete=models.CASCADE)
    poll = models.ForeignKey('poll.Poll', on_delete=models.CASCADE)
    answer = models.IntegerField()

    class Meta:
        db_table = 'answer'
