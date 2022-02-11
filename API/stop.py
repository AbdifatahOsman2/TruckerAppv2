from peewee import *
import datetime

from db import DATABASE

class Stop(Model):
    id = AutoField()
    address = CharField()
    delivery_location= CharField()
    route_length= IntegerField()
    description_of_stop= CharField()
    created_at = DateTimeField(default=datetime.datetime.now)

    class Meta:
        database = DATABASE