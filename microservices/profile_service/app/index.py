import typing as tp

import asyncio
from fastapi import FastAPI
from fastapi.requests import Request
from fastapi.responses import JSONResponse
from tortoise.contrib.fastapi import register_tortoise

from db.config import TORTOISE_ORM
from api.api_v1.routers.profile_router import router as profile_router
from utils.exceptions.api_error import ApiError
from apache_kafka import consumer

app = FastAPI()

register_tortoise(app, config=TORTOISE_ORM)

app.include_router(profile_router, prefix='/api/v1')
asyncio.create_task(consumer.consume_created_user_data())


@app.middleware('http')
async def exceptions_middleware(request: Request, call_next: tp.Callable):
    try:
        return await call_next(request)
    except Exception as exc:
        if isinstance(exc, ApiError):
            return JSONResponse(
                status_code=exc.status_code,
                content={
                    'message': exc.message,
                    'details': exc.errors_list
                }
            )

        return JSONResponse(
            status_code=500,
            content={'message': 'Непредвиденная ошибка сервера!', 'details': []}
        )
