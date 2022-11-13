from tortoise import models, fields


class User(models.Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=30, null=False)
    surname = fields.CharField(max_length=50, null=False)
    patronymic = fields.CharField(max_length=50, null=True)
    email = fields.CharField(max_length=255, null=False, unique=True)
    password_hash = fields.CharField(max_length=255, null=False, unique=True)

    class Meta:
        table = 'user'

    def __str__(self) -> str:
        return f'{self.name} {self.surname}'


class JwtToken(models.Model):
    id = fields.IntField(pk=True)
    token = fields.CharField(max_length=255, null=False)
    user = fields.ForeignKeyField(
        'models.User', related_name='tokens', on_delete=fields.CASCADE)

    class Meta:
        table = 'token'

    def __str__(self) -> str:
        return self.token
