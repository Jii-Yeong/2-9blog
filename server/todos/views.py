from rest_framework import generics, status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_jwt.serializers import VerifyJSONWebTokenSerializer
from django.views import generic

from .serializers import BoardCreateSerializer
from .models import Todos


# //웹 클라이언트로부터 
# HTTP 요청을 수신하고 HTTP 응답을 돌려주는 웹어플리케이션
# 데이터베이스에 접근하고 템플릿을 렌더링하기 위해 프레임워크의 다른 자원 정리 

#todos /createBoard /updateBoard / deleteBoard

# 해당 함수 view에서 처리할 http 메소드
@api_view(['POST'])
@permission_classes([AllowAny])
def createBoard(request):
    if request.method == 'POST':
        serializers = BoardCreateSerializer(data=request.data)
        # serializers == 클라이언트에서 보내온 데이터
        print(serializers)
        if not serializers.is_valid(raise_exception=True):
            print(serializers.errors)
            return Response({"message": "Request Body Error."}, status=status.HTTP_400_BAD_REQUEST)
        
        print(serializers)
        print(serializers.validated_data["boardTitle"])
          
        if Todos.objects.filter(boardTitle=serializers.validated_data["boardTitle"]).first() is None :
            serializers.save()
            return Response({"message": "ok"}, status=status.HTTP_201_CREATED)
        
        return Response({"message": "duplicate boardTitle"}, status=status.HTTP_409_CONFLICT)


def updateBoard(request) :
     if request.method == 'POST':
         boardId = Todos.objects.filter() # is it unique?