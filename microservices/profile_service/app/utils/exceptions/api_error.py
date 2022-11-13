from __future__ import annotations
import typing as tp


class ApiError(Exception):
    status_code: int
    message: str
    errors_list: tp.List[str]

    def __init__(
        self,
        status_code: int,
        message: str,
        errors_list: tp.List[str] = []
    ) -> None:
        self.status_code = status_code
        self.message = message
        self.errors_list = errors_list

    @classmethod
    def bad_request(cls, message: str, errors_list: tp.List[str] = []) -> ApiError:
        return cls(400, message, errors_list)

    @classmethod
    def unauthorized(cls, message: str, errors_list: tp.List[str] = []) -> ApiError:
        return cls(401, message, errors_list)

    @classmethod
    def forbidden(cls, message: str, errors_list: tp.List[str] = []) -> ApiError:
        return cls(403, message, errors_list)

    @classmethod
    def internal(cls, message: str, errors_list: tp.List[str] = []) -> ApiError:
        return cls(500, message, errors_list)
