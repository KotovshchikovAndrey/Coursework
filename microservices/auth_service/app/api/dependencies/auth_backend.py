import typing as tp

import os
from fastapi.requests import Request
from jose import jwt
from jose.exceptions import JWTError

from utils.exceptions.api_error import ApiError
from logic.auth_logic import AuthService


class AuthBackend:
    _auth_service: AuthService

    def __init__(
        self,
        auth_service: AuthService
    ) -> None:
        self._auth_service = auth_service

    async def __call__(self, request: Request) -> Request:
        """
            Проверяет авторизован ли пользователь.
            Вернет параметр request обратно в контроллер,
            Если пользователь авторизован, иначе вызавет исключение.
        """
        access_token = request.headers.get('authorization', None)
        if access_token is None:
            raise ApiError.unauthorized(message='Токен не был получен!')

        access_tokenis_valid = await self._check_access_token(
            request, 
            token=access_token
        )
        if not access_tokenis_valid:
            raise ApiError.unauthorized('Токен невалиден!')

        return request

    async def _check_access_token(self, request: Request, token: str) -> bool:
        """Проверяет валидность access токена"""
        try:
            payload = jwt.decode(token, os.getenv(
                'TOKEN_SECRET_KEY'), 
                algorithms=[os.getenv('TOKEN_ALGORITHM')]
            )
        except JWTError:
            return False

        user_id = payload.get('user_id', None)
        if user_id is None:
            return False

        user = await self._auth_service.get_current_user(user_id)
        if user is None:
            return False

        request.state.token_data = {
            'token': token, 
            'payload': payload.copy()
        }

        return True
