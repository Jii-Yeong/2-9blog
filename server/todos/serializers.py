from django.contrib.auth.models import update_last_login
from rest_framework import serializers
from django.contrib.auth  import get_user_model, authenticate
from rest_framework_jwt.settings import api_settings
from .models import Todos


# 모델 인스턴스같은 복잡한 데이터를 렌더링 가능한 
# 파이썬 데이터 유형(예컨데 json)으로 변환할 수 있도록 함

# serializer = 응답으로 보내는 데이터 형태를 정의

# board 제작
class BoardCreateSerializer(serializers.Serializer):
    class Meta : 
        model = Todos
        fields = ("boardId", "boardTitle")

    boardId = serializers.CharField(required=True)
    boardTitle = serializers.CharField(required=True)

    def create(self, validated_data):
        board = Todos.objects.create(
            boardId = validated_data['boardId'],
            boardTitle = validated_data['boardTitle']
        )
        board.save()

        return board

    # def update(self,instance,validate_data):

class BoardUpdateSerializer(serializers.ModelSerializer):
    class Meta : 
        model = Todos
        fields = ("boardId", "boardTitle")
       
        


class ListsCreateSerializer(serializers.ModelSerializer):
    class Meta : 
        model = Todos
        fields=("listId", "listTitle")

    # def create(self,validate_data)
    #     lists = Todos.objects.create_lists(
    #         validate_data["listId"], validate_data["listTitle"]
    #     )
    #     return lists

 # serializes.Serializer로 상속받으면 
 # 데이터 처리 메소드(create)가 필요하지만 ModelSerializer는 그런 건 알아서 해줌
