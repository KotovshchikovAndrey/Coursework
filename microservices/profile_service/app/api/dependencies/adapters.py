import typing as tp

import httpx
from fastapi import Request
from utils.exceptions.api_error import ApiError


class AuthAdapter:
    _auth_service_url: str

    def __init__(self, auth_service_url: str) -> None:
        self._auth_service_url = auth_service_url

    async def __call__(self, request: Request) -> Request:
        access_token = request.headers.get('authorization', None)
        if access_token is None:
            raise ApiError.unauthorized(
                message='Ошибка аутентификации!', errors_list=['Токен не был получен!'])

        async with httpx.AsyncClient() as client:
            response = await client.get('http://127.0.0.1/api/v1/auth/current_user')
            
        print(response.json())

        return request
