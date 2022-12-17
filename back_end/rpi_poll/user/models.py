import json
from json import JSONEncoder

from django.db import models
from django.contrib.postgres.fields import ArrayField


class User(models.Model):
    id = models.AutoField(primary_key=True)
    rcs_id = models.CharField(max_length=200, unique=True, db_index=True, null=False, blank=False)
    name = models.CharField(max_length=200)
    password = models.CharField(max_length=200)

    class UserEncoder(JSONEncoder):
        def default(self, o):
            return o.__dict__

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__,
                          sort_keys=True, indent=4)

    class Meta:
        db_table = 'user'
