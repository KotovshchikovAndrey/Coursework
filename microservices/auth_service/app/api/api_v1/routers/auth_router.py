from fastapi import (
    APIRouter,
    Depends,
    status
)
from fastapi.requests import Request
from fastapi.responses import JSONResponse, Response

from db.schemas import (
    UserCreateSchema,
    UserСredentialsSchema
)

from logic.auth_logic import AuthService
from logic.user_logic import UserService
from logic.token_logic import TokenService

from crud.user_crud import UserSqlRepository
from crud.token_crud import TokenSqlRepository

from api.dependencies.auth_backend import AuthBackend
from api.dependencies.refresh_token_backend import RefreshTokenBackend

from apache_kafka import producer

router = APIRouter(prefix='/auth')

# Сервис для работы с аутентификацией refresh токенов
refresh_token_backend = RefreshTokenBackend(
    auth_service=AuthService(
        user_service=UserService(repository=UserSqlRepository()),
        token_service=TokenService(repository=TokenSqlRepository())
    )
)

# Сервис для работы с аутентификацией пользователя
auth_backend = AuthBackend(
    auth_service=AuthService(
        user_service=UserService(repository=UserSqlRepository()),
        token_service=TokenService(repository=TokenSqlRepository())
    )
)


@router.post('/registration')
async def registration(user: UserCreateSchema):
    auth_service = AuthService(
        user_service=UserService(repository=UserSqlRepository()),
        token_service=TokenService(repository=TokenSqlRepository())
    )

    created_user, access_token, refresh_token = await auth_service.registration(user_data=user.dict())

    # # Отправляем данные созданного пользователя в profile микросервис через kafka producer
    # await producer.send_created_user_data_in_profile_service(
    #     user_data=created_user.dict())

    response = JSONResponse(status_code=status.HTTP_201_CREATED, content={
        'access_token': access_token,
        'refresh_token': refresh_token,
        'user': created_user.dict()
    })

    response.set_cookie(
        key='refresh_token', value=refresh_token, httponly=True, max_age=60*60*24*30)
    return response


@router.post('/login')
async def login(user: UserСredentialsSchema):
    auth_service = AuthService(
        user_service=UserService(repository=UserSqlRepository()),
        token_service=TokenService(repository=TokenSqlRepository())
    )

    access_token, refresh_token = await auth_service.login(user_data=user.dict())
    response = JSONResponse(status_code=status.HTTP_201_CREATED, content={
        'access_token': access_token,
        'refresh_token': refresh_token
    })

    response.set_cookie(
        key='refresh_token', value=refresh_token, httponly=True, max_age=60*60*24*30)
    return response


@router.get('/refresh')
async def refresh_token(request: Request = Depends(refresh_token_backend)):
    auth_service = AuthService(
        user_service=UserService(repository=UserSqlRepository()),
        token_service=TokenService(repository=TokenSqlRepository())
    )

    data_for_refresh = request.state.token_data
    new_access_token, new_refresh_token = await auth_service.refresh_token(**data_for_refresh)

    response = JSONResponse(status_code=status.HTTP_200_OK, content={
        'access_token': new_access_token,
        'refresh_token': new_refresh_token
    })

    response.set_cookie(
        key='refresh_token', value=new_refresh_token, httponly=True, max_age=60*60*24*30)
    return response


@router.delete('/logout', status_code=status.HTTP_204_NO_CONTENT)
async def logout(request: Request = Depends(refresh_token_backend)):
    auth_service = AuthService(
        user_service=UserService(repository=UserSqlRepository()),
        token_service=TokenService(repository=TokenSqlRepository())
    )

    await auth_service.logout(request)
    responce = Response(status_code=204)
    responce.delete_cookie('refresh_token')
    return responce


@router.get('/current_user', status_code=status.HTTP_200_OK)
async def get_current_user_data(request: Request = Depends(auth_backend)):
    return request.state.token_data['payload']
