import typing as tp

from tortoise.models import Model
from interfaces import crud_interfaces

T = tp.TypeVar('T', bound=Model)


class BaseSqlRepository(crud_interfaces.BaseRepository[T], tp.Generic[T]):
    model: tp.Type[T]

    def __init__(self, model: tp.Type[T]) -> None:
        self.model = model

    async def get_by_params(self, **kwargs) -> tp.Optional[T]:
        return await self.model.filter(**kwargs).first()
