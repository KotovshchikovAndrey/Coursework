import typing as tp

from db.models import JwtToken as TokenSqlModel
from interfaces import crud_interfaces
from crud.base_crud import BaseSqlRepository


class TokenSqlRepository(crud_interfaces.TokenRepository, BaseSqlRepository[TokenSqlModel]):
    def __init__(self) -> None:
        super().__init__(TokenSqlModel)

    async def create(self, **kwargs) -> None:
        await self.model.create(**kwargs)

    async def update(self, instanсe: TokenSqlModel, new_value: str) -> None:
        instanсe.token = new_value  # type: ignore
        await instanсe.save()

    async def delete(self, instanсe: TokenSqlModel) -> None:
        await instanсe.delete()
