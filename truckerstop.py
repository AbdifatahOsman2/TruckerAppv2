from db import DATABASE
from stop import Stop
from user import User
from peewee import *

class TruckerStop(Model):
    stop = ForeignKeyField(Stop, backref="truckerstop", on_delete="CASCADE")
    user = ForeignKeyField(User, backref="truckerstop", on_delete="CASCADE")
    class Meta:
        database = DATABASE
