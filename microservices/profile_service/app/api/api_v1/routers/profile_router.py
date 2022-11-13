import typing as tp

from fastapi import APIRouter, Request, Depends
from api.dependencies.adapters import AuthAdapter

router = APIRouter(prefix='/profile')


@router.get('/user/{user_slug}')
async def get_user_profile(user_slug: str, request: Request = Depends(AuthAdapter('test'))):
    return
