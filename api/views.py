from django.shortcuts import render
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser
import json
from json import JSONDecodeError
from .models import Data
from rest_framework.viewsets import ModelViewSet
from .serializers import DataModelSerializer
import pdb

# Create your views here.



class CustomAuthToken(ObtainAuthToken):
    
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        print("printing",token.__dict__)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'username':user.username
            
        })



@api_view(['Get'])
#this below function is already protect globally with RestFramework authentications
def logout(request):

    

    Token.objects.get(user=request.user).delete()
    print('print came in ')
    return Response('Successfully logged out',status=200)
            
@api_view(['post'])
     
def sample(request):
    # pdb.set_trace()
    print("printing request files",request.data)
    return Response('sample is working')



class UploadJson(APIView):
   
    def post(self, request,*args,**kwargs):
        # pdb.set_trace()
        
        if request.FILES.get('file',False):
            l=str(request.FILES['file']).split('.')
            if l[1].lower()!='json':
                return Response("Need Json file to be uploaded",status=400)
            else:
                try:
                    data=json.load(request.FILES['file'])
                    print("printing data",data)
                    li=[]
                    for i in data:
                        li.append(Data(userId=i['userId'],title=i['title'],body=i['body']))
                    Data.objects.bulk_create(li)
                    print("printing count ---->",Data.objects.all().count())
                    return Response('Created the records ')
                except JSONDecodeError:
                    return Response("Check the file content, is it in Jsonformat",status=400)
        else:
            return Response({'required':[
                {'file':'Jsonfile as formdata'}
            ]},status=400)
        
       
class DataModelViewSet(ModelViewSet):
    serializer_class=DataModelSerializer
    queryset=Data.objects.all()


