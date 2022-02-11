from peewee import PostgresqlDatabase
import os
from playhouse.db_url import connect

if 'DATABASE_URL' in os.environ:
    DATABASE = connect(os.environ.get('DATABASE_URL'))
else:
    DATABASE = PostgresqlDatabase('anime')

def initialize(tables):
    DATABASE.connect()
    DATABASE.create_tables(tables, safe=True)
    print("Some tables were created!")
    DATABASE.close()
