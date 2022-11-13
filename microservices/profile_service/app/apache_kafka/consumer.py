import os
import asyncio
import json
from aiokafka import AIOKafkaConsumer
from crud.profile_crud import UserSqlRepository
from logic.profile_logic import ProfileService

profile_service = ProfileService(user_repoisitory=UserSqlRepository())


async def consume_created_user_data():
    consumer = AIOKafkaConsumer(
        os.getenv('PROFILE_TOPIC_NAME'),
        bootstrap_servers=os.getenv('KAFKA_URL'),
        group_id=1
    )

    await consumer.start()
    try:
        async for msg in consumer:
            created_user_data = json.loads(msg.value.decode('utf-8'))
            print(created_user_data)
            await profile_service.create_new_user_profiles(created_user_data)
    finally:
        await consumer.stop()
