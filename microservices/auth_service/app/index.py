import typing as tp

from fastapi import FastAPI
from fastapi.requests import Request
from fastapi.responses import JSONResponse
from tortoise.contrib.fastapi import register_tortoise

from db.config import TORTOISE_ORM
from api.api_v1.routers.auth_router import router as auth_router
from utils.exceptions.api_error import ApiError

app = FastAPI()

register_tortoise(app, config=TORTOISE_ORM)

app.include_router(auth_router, prefix='/api/v1')


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

        print(exc)
        return JSONResponse(
            status_code=500,
            content={'message': 'Непредвиденная ошибка сервера!', 'details': []}
        )
