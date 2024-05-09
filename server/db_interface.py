import os
from dotenv import load_dotenv
import sqlite3
# import uuid

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


def get_dbconn():
    return sqlite3.connect(sql_db)


def save_response(eventid, question, client_name, answer, points):
    conn = get_dbconn()
    c = conn.cursor()
    c.execute('''INSERT INTO responses
                (eventid, question, client_name, answer, points)
                VALUES (?, ?, ?, ?)''',
              (eventid, question, client_name, answer, points))
    conn.commit()
    conn.close()


def get_events_table(byid="", byname=""):

    with get_dbconn() as conn:
        c = conn.cursor()

        # Select by ID
        if byid:
            c.execute("SELECT * FROM events WHERE id = ?", (byid,))

        # Select by Name
        elif byname:
            search_term = f"%{byname}%"
            c.execute("SELECT * FROM events WHERE name LIKE ?", (search_term,))

        # Select all if no parameters are provided
        else:
            c.execute("SELECT * FROM events")

        # Fetch all results from the query
        results = c.fetchall()

    # Return the fetched results
    return results


def get_question_table(eventid):
    # TODO Create the logic
    return eventid


def responses_table(event_id, question_id=""):
    with get_dbconn() as conn:
        c = conn.cursor()

        if event_id:
            if question_id:
                c.execute('''
                SELECT * FROM responses
                WHERE eventid = ? and
                question_id = ? ''', (event_id, question_id))
            else:
                c.execute('''SELECT * FROM responses
                WHERE eventid = ?''', (event_id,))
            result = c.fetchall()

        else:
            result = []

    return result
