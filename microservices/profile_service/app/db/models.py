from tortoise import models, fields


class User(models.Model):
    id = fields.IntField(index=True, pk=True)
    name = fields.CharField(index=True, max_length=30, null=False)
    photo_name = fields.CharField(max_length=255, null=True)
    surname = fields.CharField(max_length=50, null=False)
    patronymic = fields.CharField(max_length=50, null=True)
    email = fields.CharField(
        index=True, max_length=255, null=False, unique=True)
    balans = fields.DecimalField(
        max_digits=10, decimal_places=3, null=False, default=0)

    class Meta:
        table = 'user'

    def __str__(self) -> str:
        return f'{self.name} {self.surname}'
