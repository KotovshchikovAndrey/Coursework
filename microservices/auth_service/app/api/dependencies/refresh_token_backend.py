import typing as tp

import os
from fastapi.requests import Request
from jose import jwt
from jose.exceptions import JWTError

from utils.exceptions.api_error import ApiError
from logic.auth_logic import AuthService


class RefreshTokenBackend:
    _auth_service: AuthService

    def __init__(
        self,
        auth_service: AuthService
    ) -> None:
        self._auth_service = auth_service

    async def __call__(self, request: Request) -> Request:
        """
            Проверяет валидность токенов.
            Вернет параметр request обратно в контроллер,
            Если токены валидны, иначе вызавет исключение.
        """
        refresh_token = request.cookies.get('refresh_token', None)
        if refresh_token is None:
            raise ApiError.forbidden('Токен не был получен!')

        access_token = request.headers.get('authorization', None)
        if access_token is None:
            raise ApiError.unauthorized(message='Токен не найден!')

        refresh_token_is_valid = await self._check_refresh_token(
            request=request,
            access_token=access_token,
            refresh_token=refresh_token
        )

        if not refresh_token_is_valid:
            raise ApiError.forbidden('Токен невалиден!')

        return request

    async def _check_refresh_token(
        self,
        request: Request,
        refresh_token: str,
        access_token: str
    ) -> bool:
        """
            Проверяет валидность refresh токена. 
            Если токен валидный, установит в параметр request словарь
            С id пользвателя, и значением токена и вернет True.
        """
        access_token_slice_start, access_token_slice_end = map(int, os.getenv(
            'ACCESS_TOKEN_SLICE_FOR_REFRESH_TOKEN').split())
        access_token_part = access_token[access_token_slice_start:access_token_slice_end]
        try:
            payload = jwt.decode(
                refresh_token,
                os.getenv('TOKEN_SECRET_KEY') + access_token_part,
                algorithms=[os.getenv('TOKEN_ALGORITHM')])
        except JWTError:

            return False

        user_id = payload.get('user_id', None)
        if user_id is None:
            return False

        token_in_db = await self._auth_service.check_token_in_db(
            user_id=user_id, token=refresh_token)

        if not token_in_db:
            return False

        request.state.token_data = {
            'token': refresh_token, 'payload': payload.copy()}

        return True
