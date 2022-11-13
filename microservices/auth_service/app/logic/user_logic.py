import typing as tp

from passlib.context import CryptContext
from utils.exceptions.api_error import ApiError
from db.schemas import UserSchema
from interfaces.crud_interfaces import UserRepository


class UserService:
    _repository: UserRepository

    def __init__(self, repository: UserRepository) -> None:
        self._repository = repository

    async def check_user_create_data(self, user_data: dict) -> None:
        """Проверяет введенные данные и вызывает exception, если данные невалидны"""
        errors_list = []
        if await self._repository.is_exists(email=user_data['email']):
            errors_list.append('Данный email уже занят кем то другим')

        if errors_list:
            raise ApiError.bad_request(
                message='Введены невалидные данный!', errors_list=errors_list)

    async def create_user(self, user_data: dict) -> UserSchema:
        """Создает пользователя"""
        password = user_data['password']
        hashed_password = self._get_password_hash(password)

        created_user = await self._repository.create(
            name=user_data['name'],
            surname=user_data['surname'],
            email=user_data['email'],
            password_hash=hashed_password
        )

        return UserSchema.from_orm(created_user)

    async def authenticate_user(self, user_data: dict) -> tp.Optional[UserSchema]:
        """Аутентификация пользователя в системе"""
        user = await self._repository.get_by_params(email=user_data['email'])
        if user is not None:
            is_correct_password = self._check_password_hash(
                password=user_data['password'],
                password_hash=user.password_hash
            )

            if is_correct_password:
                return UserSchema.from_orm(user)

        return None

    async def get_user_by_params(self, **kwargs) -> tp.Optional[UserSchema]:
        """Ищет пользователе в системе по переданым параметрам"""
        user = await self._repository.get_by_params(**kwargs)
        return UserSchema.from_orm(user) if user is not None else None

    def _get_password_hash(self, password: str) -> str:
        """Хеширует пароль"""
        pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
        return pwd_context.hash(password)

    def _check_password_hash(self, password: str, password_hash: str) -> bool:
        """Сравнивает переданный пароль с хэшем в базе данных"""
        pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
        return pwd_context.verify(password, password_hash)
