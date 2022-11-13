import typing as tp
from crud.profile_crud import UserSqlRepository


class ProfileService:
    _user_repository: UserSqlRepository

    def __init__(self, user_repoisitory: UserSqlRepository) -> None:
        self._user_repository = user_repoisitory

    async def create_new_user_profiles(self, profile_create_data: tp.Iterable[dict]):
        await self._user_repository.create(**profile_create_data)
