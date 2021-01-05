from django.db import models
from django.db.models.deletion import CASCADE

from .managers import AimManager

# meta class는 모델-레벨 메타 데이터 선언 가능 ex) 레코드 순서 제어 등

class Todos(models.Model):
    boardId = models.CharField(
        verbose_name='boardId', #필드 이름
        max_length=128,
        unique=True
    )

    boardTitle = models.CharField(
        verbose_name='boardTitle',
        max_length=64,
        unique=True
    )

    listId = models.CharField(
        verbose_name='listId',
        max_length=64,
        unique=True
    )

    listTitle = models.CharField(
        verbose_name='listTitle',
        max_length=64,
        unique=True
    )

    objects=AimManager()


    def __str__(self):
        return self.boardId
