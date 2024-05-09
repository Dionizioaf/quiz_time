import os
from dotenv import load_dotenv
import sqlite3

load_dotenv()

db_type = os.getenv('sql_type')
sql_db = os.getenv('sql_db')


def database_setup():
    if db_type == 'sqlite':
        sqllite_create_db()


def sqllite_create_db():
    conn = sqlite3.connect(sql_db)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS responses (
            event_id TEXT
            question TEXT,
            client_name TEXT,
            answer TEXT,
            points INTEGER
        )
    ''')
    conn.commit()

    # Table to store the events
    c.execute('''
        CREATE TABLE IF NOT EXISTS events (
            id TEXT,
            name TEXT
        )
    ''')
    conn.commit()
    conn.close()


def save_response(question, client_name, answer, points):
    conn = sqlite3.connect(sql_db)
    c = conn.cursor()
    c.execute('''INSERT INTO responses (question, client_name, answer, points)
                VALUES (?, ?, ?, ?)''',
              (question, client_name, answer, points))
    conn.commit()
    conn.close()
