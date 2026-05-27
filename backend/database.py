import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

def get_connection():
  conn = psycopg2.connect(
    host = os.getenv("DB_HOST"),
    port = os.getenv("DB_PORT"),
    dbname = os.getenv("DB_NAME"),
    user = os.getenv("DB_USER"),
    password = os.getenv("DB_PASS")
  )
  return conn

def init_db():
    conn = get_connection()
    cur = conn.cursor()

    cur.execute('create schema if not exists "backstage_supply";')

    cur.execute("""
              create table if not exists backstage_supply.products (
                id serial primary key,
                name varchar(100) not null,
                price decimal(10, 2) not null,
                quantity integer not null
                );
                """)
    conn.commit()
    cur.close()
    conn.close()
    print("Database Ready!")          