import os
from dotenv import load_dotenv

load_dotenv()

# Tortoise orm settings
TORTOISE_ORM = {
    "connections": {"db_url": os.getenv('DEV_DB_URL')},
    "apps": {
        "models": {
            "models": ["aerich.models", "db.models"],
            "default_connection": "db_url",
        },
    },
}
