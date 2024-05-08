import asyncio
import websockets
import json
import sqlite3
import time


def setup_database():
    conn = sqlite3.connect('quiz_responses.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS responses (
            question TEXT,
            client_name TEXT,
            answer TEXT,
            points INTEGER
        )
    ''')
    conn.commit()
    conn.close()


setup_database()

connected_clients = {}
question_start_times = {}  # Map of IDs to their starttimes in ms


async def handler(websocket, path):
    client_name = None
    try:
        async for message in websocket:
            data = json.loads(message)

            if 'name' in data:
                client_name = data['name']
                connected_clients[websocket] = client_name
                await broadcast_clients_list()
                print(f"{client_name} connected")
            elif 'answer' in data and 'id' in data:
                question_id = data['id']
                start_time = question_start_times.get(
                    question_id, time.time() * 1000)
                end_time = time.time() * 1000
                response_time = int(end_time - start_time)
                thirty_seconds_in_ms = 30000
                result = int(thirty_seconds_in_ms - response_time)

                save_response(data['id'], client_name, data['answer'], result)
                print(f"Response Time for {client_name}: {
                      response_time} ms, Points: {result}")
            elif 'question' in data and 'id' in data:
                question_start_times[data['id']] = time.time() * 1000
                await broadcast(json.dumps(data))

    except websockets.exceptions.ConnectionClosed:
        print(f"{client_name if client_name else 'A client'} disconnected")
    finally:
        if websocket in connected_clients:
            del connected_clients[websocket]
            await broadcast_clients_list()


async def broadcast_clients_list():
    clients_list = list(connected_clients.values())
    update = json.dumps({"type": "clients_list", "data": clients_list})
    await broadcast(update)


async def broadcast(message):
    tasks = [asyncio.create_task(client.send(message))
             for client in connected_clients]
    if tasks:
        await asyncio.wait(tasks)


def save_response(question, client_name, answer, points):
    conn = sqlite3.connect('quiz_responses.db')
    c = conn.cursor()
    c.execute('''INSERT INTO responses (question, client_name, answer, points)
                VALUES (?, ?, ?, ?)''',
              (question, client_name, answer, points))
    conn.commit()
    conn.close()


start_server = websockets.serve(handler, "localhost", 12345)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
