import typing as tp

import os
from jose import jwt
from datetime import datetime, timedelta
from db.schemas import TokenSchema
from interfaces.crud_interfaces import TokenRepository


class TokenService:
    _repository: TokenRepository

    def __init__(self, repository: TokenRepository) -> None:
        self._repository = repository

    def generate_access_token(self, payload: dict) -> str:
        """Генерирует и возвращает access jwt токен"""
        payload_for_encode = payload.copy()
        expire = datetime.utcnow() + timedelta(minutes=int(os.getenv('TOKEN_EXPIRE')))
        payload_for_encode.update({"exp": expire})

        access_token = jwt.encode(
            payload_for_encode,
            os.getenv('TOKEN_SECRET_KEY'),
            algorithm=os.getenv('TOKEN_ALGORITHM')
        )

        return access_token

    def generate_refresh_token(self, payload: dict, access_token_part: str) -> str:
        """Генерирует и возвращает refresh jwt токен"""
        payload_for_encode = payload.copy()
        expire = datetime.utcnow() + timedelta(days=int(os.getenv('TOKEN_EXPIRE')))
        payload_for_encode.update({"exp": expire})

        refresh_token = jwt.encode(
            payload_for_encode,
            os.getenv('TOKEN_SECRET_KEY') + access_token_part,
            algorithm=os.getenv('TOKEN_ALGORITHM')
        )

        return refresh_token

    async def set_token_for_user(self, token: str, user_id: int) -> None:
        """Привязывает сгенерированный refresh токен к пользователю"""
        await self._repository.create(token=token, user_id=user_id)

    async def update_token_for_user(self, user_id: int, old_token_value: str, new_token_value: str) -> None:
        """Ищет токен пользователя и обновляет его значение"""
        token_instance = await self._repository.get_by_params(
            user_id=user_id, token=old_token_value)
        await self._repository.update(
            instanсe=token_instance, new_value=new_token_value)

    async def remove_user_token(self, user_id: int, token: str) -> None:
        """Ищет токен пользователя и удаляет его, если он есть"""
        token_instance = await self._repository.get_by_params(user_id=user_id, token=token)
        if token_instance is not None:
            await self._repository.delete(instanсe=token_instance)

    async def find_token_in_db(self, user_id: int, token: str) -> tp.Optional[TokenSchema]:
        """
            Ищет refresh токен пользователя по его значению. 
            Вернет данные о токене, если найдет, иначе вернет None.
        """
        token_in_db = await self._repository.get_by_params(user_id=user_id, token=token)
        return TokenSchema.from_orm(token_in_db) if token is not None else None
