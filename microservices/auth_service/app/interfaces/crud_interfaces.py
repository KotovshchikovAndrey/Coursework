import typing as tp

from abc import ABC, abstractmethod


# Интерфейс для модели Пользователя
class User(ABC):
    id: int
    name: str
    surname: str
    patronymic: str
    email: str
    password_hash: str


# Интерфейс для модели Токена
class Token(ABC):
    id: int
    token: str
    user: User


T = tp.TypeVar('T')


class BaseRepository(ABC, tp.Generic[T]):
    @abstractmethod
    async def get_by_params(self, **kwargs) -> tp.Optional[T]:
        pass


class UserRepository(BaseRepository[User]):
    @abstractmethod
    async def get_all(self) -> tp.Iterable[User]:
        pass

    @abstractmethod
    async def create(self, **kwargs) -> User:
        pass

    @abstractmethod
    async def is_exists(self, **kwargs) -> bool:
        pass


class TokenRepository(BaseRepository[Token]):
    @abstractmethod
    async def create(self, **kwargs) -> None:
        pass

    @abstractmethod
    async def update(self, instanсe, new_value: str) -> None:
        pass

    @abstractmethod
    async def delete(self, instanсe) -> None:
        pass
