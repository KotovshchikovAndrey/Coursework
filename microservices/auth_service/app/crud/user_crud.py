import typing as tp

from db.models import User as UserSqlModel
from interfaces import crud_interfaces
from crud.base_crud import BaseSqlRepository


class UserSqlRepository(crud_interfaces.UserRepository, BaseSqlRepository[UserSqlModel]):
    def __init__(self) -> None:
        super().__init__(UserSqlModel)

    async def get_all(self) -> tp.Iterable[UserSqlModel]:
        return await self.model.all()

    async def create(self, **kwargs) -> UserSqlModel:
        return await self.model.create(**kwargs)

    async def is_exists(self, **kwargs) -> bool:
        return await self.model.filter(**kwargs).exists()
