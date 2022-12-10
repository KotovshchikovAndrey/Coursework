import typing as tp

import os
from fastapi.requests import Request
from logic.user_logic import UserService
from logic.token_logic import TokenService
from utils.exceptions.api_error import ApiError
from db.schemas import (
    UserSchema,
    UserResponseSchema
)


class AuthService:
    _user_service: UserService
    _token_service: TokenService

    def __init__(
        self,
        user_service: UserService,
        token_service: TokenService
    ) -> None:
        self._user_service = user_service
        self._token_service = token_service

    async def registration(self, user_data: dict) -> tp.Tuple[UserResponseSchema, str, str]:
        """Метод, инкапсулирующий логику регистрации пользователя"""
        await self._user_service.check_user_create_data(user_data)

        created_user = await self._user_service.create_user(user_data)
        access_token, refresh_token = await self._create_tokens_for_user(
            payload={
                'user_id': created_user.id,
                'name': created_user.name
            }
        )

        return UserResponseSchema(**created_user.dict()), access_token, refresh_token

    async def login(self, user_data: dict):
        """Метод, инкапсулирующий логику авторизации и аутентификации пользователя"""
        user = await self._user_service.authenticate_user(user_data)
        if user is None:
            raise ApiError.unauthorized(message='Неверный логин или пароль!')

        access_token, refresh_token = await self._create_tokens_for_user(
            payload={
                'user_id': user.id,
                'name': user.name
            }
        )

        return access_token, refresh_token

    async def logout(self, request: Request):
        """Метод, инкапсулирующий логику выхода из системы пользователя"""
        refresh_token = request.cookies.get('refresh_token', None)
        if refresh_token is not None:
            user_id = request.state.token_data['payload']['user_id']
            await self._token_service.remove_user_token(
                user_id=user_id,
                token=refresh_token
            )

    async def refresh_token(self, token: str, payload: dict = {}):
        """Метод, инкапсулирующий логику обновления refresh jwt токена пользователя"""
        new_access_token, new_refresh_token = await self._update_tokens_for_user(
            token=token,
            payload=payload
        )

        return new_access_token, new_refresh_token

    async def check_token_in_db(self, user_id: int, token: str) -> bool:
        """Проверяет сущетвование refresh twt токена у пользователя в базе данных"""
        token_in_db = await self._token_service.find_token_in_db(user_id, token)
        if token_in_db is not None:
            return True

        return False

    async def get_current_user(self, user_id: int) -> tp.Optional[UserSchema]:
        """
            Ищет конкретного пользователя по id. 
            Если найдет, вернет данные о пользователе,
            Иначе вернет None
        """
        user = await self._user_service.get_user_by_params(id=user_id)
        if user is not None:
            return user

        return None

    async def _update_tokens_for_user(self, token: str, payload: dict = {}) -> tp.Tuple[str, str]:
        """Создает новую пару access refresh токенов и обновляет refresh токен в базе данных"""
        access_token, refresh_token = self._generate_tokens_for_user(payload=payload)
        await self._token_service.update_token_for_user(
            user_id=payload['user_id'], 
            old_token_value=token, 
            new_token_value=refresh_token
        )

        return access_token, refresh_token

    async def _create_tokens_for_user(self, payload: dict = {}) -> tp.Tuple[str, str]:
        """Создает пару access refresh токенов и привязывает их к пользователю"""
        access_token, refresh_token = self._generate_tokens_for_user(payload=payload)
        await self._token_service.set_token_for_user(
            token=refresh_token, 
            user_id=payload['user_id']
        )

        return access_token, refresh_token

    def _generate_tokens_for_user(self, payload: dict = {}) -> tp.Tuple[str, str]:
        """Генерирует пару access и refresh токенов"""
        access_token = self._token_service.generate_access_token(payload=payload)
        access_token_slice_start, access_token_slice_end = map(
            int, 
            os.getenv('ACCESS_TOKEN_SLICE_FOR_REFRESH_TOKEN').split()
        )
        refresh_token = self._token_service.generate_refresh_token(
            payload=payload,
            access_token_part=access_token[access_token_slice_start:access_token_slice_end]
        )

        return access_token, refresh_token
