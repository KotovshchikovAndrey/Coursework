import typing as tp

import email_validate
from pydantic import BaseModel, EmailStr, root_validator
from tortoise.contrib.pydantic.creator import pydantic_model_creator
from utils.exceptions.api_error import ApiError
from db.models import *

UserSchema = pydantic_model_creator(User, name='UserSchema')
TokenSchema = pydantic_model_creator(JwtToken, name='TokenSchema')


class UserCreateSchema(BaseModel):
    name: str
    surname: str
    patronymic: tp.Optional[str]
    email: EmailStr
    password: str
    confirm_password: str

    @root_validator
    def check_data(cls, values: dict):
        errors_list = []
        for field in cls.__fields__:
            try:
                field_errors = getattr(cls, f'check_{field}')(
                    values.get(field, None))
            except AttributeError:
                continue
            else:
                errors_list += field_errors

        if not cls.is_password_equal_confirm_password(
            password=values.get('password', ''),
            confirm_password=values.get('confirm_password', '')
        ):
            errors_list.append('Пароли не совпадают')

        if errors_list:
            raise ApiError.bad_request(
                message='Введены невалидные данные!', errors_list=errors_list)

        return values

    @classmethod
    def check_name(cls, name: tp.Optional[str]) -> tp.List[str]:
        errors_list = []
        if not name:
            errors_list.append('Поле имя - обязательно для заполнения!')
        elif len(name) > 30:
            errors_list.append('Превышена максимальная длина имени!')

        return errors_list

    @classmethod
    def check_surname(cls, surname: tp.Optional[str]):
        errors_list = []
        if not surname:
            errors_list.append('Поле фамилия - обязательно для заполнения!')
        elif len(surname) > 50:
            errors_list.append('Превышена максимальная длина фамилии!')

        return errors_list

    @classmethod
    def check_email(cls, email: tp.Optional[str]) -> tp.List[str]:
        errors_list = []
        if not email:
            errors_list.append('Поле email - обязательно для заполнения')
            return errors_list

        email_is_valid = email_validate.validate(
            email_address=email,
            check_format=False,
            check_blacklist=False,
            check_dns=False,
            check_smtp=False,
            smtp_debug=False
        )

        if not email_is_valid:
            errors_list.append('Невалидный email адресс')
        elif len(email) > 255:
            errors_list.append('Превышена максимальная длина email!')

        return errors_list

    @classmethod
    def check_patronymic(cls, patronymic: tp.Optional[str]) -> tp.List[str]:
        errors_list = []
        if patronymic is None:
            return errors_list

        if not patronymic:
            errors_list.append('Введите валидное отчество')
        elif len(patronymic) > 50:
            errors_list.append('Превышена максимальная длина отчества!')

        return errors_list

    @classmethod
    def check_password(cls, password: tp.Optional[str]):
        errors_list = []
        if not password:
            errors_list.append('Поле пароль обязательно для заполнения!')

        return errors_list

    @classmethod
    def is_password_equal_confirm_password(cls, password: str, confirm_password: str) -> bool:
        return password == confirm_password


class UserResponseSchema(BaseModel):
    name: str
    surname: str
    patronymic: tp.Optional[str]
    email: EmailStr

    class Config:
        orm_mode = True


class UserСredentialsSchema(BaseModel):
    email: EmailStr
    password: str

    @root_validator
    def check_data(cls, values: dict):
        email, password = (
            values.get('email', None),
            values.get('password', None)
        )

        if any((not email, not password)):
            raise ApiError.bad_request(
                message='Заполните все поля для входа в систему!', errors_list=[])

        return values
