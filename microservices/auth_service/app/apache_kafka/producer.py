import os
import asyncio
import json
from aiokafka import AIOKafkaProducer


async def send_created_user_data_in_profile_service(user_data: dict):
    producer = AIOKafkaProducer(
        bootstrap_servers=os.getenv('KAFKA_URL'))

    await producer.start()
    try:
        await producer.send_and_wait(
            os.getenv('PROFILE_TOPIC_NAME'), json.dumps(user_data).encode('utf-8'))
    finally:
        await producer.stop()
