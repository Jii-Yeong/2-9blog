from django.contrib.auth.base_user import BaseUserManager
from django.db import models
# Aim을 생성하는 클래스
# manager는 데이터베이스와 상호작용하는 인터페이스
# 보통 manager는 Model.objects 속성을 통해 사용 가능

class AimManager(models.Manager):
    use_in_migrations = True

    def create(self, boardId, boardTitle):
        if not boardTitle:    
            raise ValueError('title must be set')
        
        board = self.model(boardId=boardId, boardTitle=boardTitle)
        # python is callable, Todos instance is created    
        
        # default로 정의된 db를 사용
        board.save(using=self._db)

        return board

    def update_board(self, boardId, boardTitle):
           if not boardTitle:    
            raise ValueError('title must be set')