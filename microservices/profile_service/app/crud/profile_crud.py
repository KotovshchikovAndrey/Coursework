import typing as tp
from db.models import User


class UserSqlRepository:
    _model: tp.Type[User]

    def __init__(self) -> None:
        self._model = User

    async def create(self, **kwargs) -> None:
        await self._model.create(**kwargs)
