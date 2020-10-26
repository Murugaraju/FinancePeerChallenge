"""financepeerchallenge URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from api.views import CustomAuthToken,logout,sample,UploadJson,DataModelViewSet
from rest_framework.routers import DefaultRouter
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.conf import settings

router=DefaultRouter()
router.register(r'data',DataModelViewSet)

urlpatterns = [
    path('',TemplateView.as_view(template_name='index.html')),
    path('admin/', admin.site.urls),
    path('authenticate/',CustomAuthToken.as_view()),
    path('logout/',logout),
    path('sample/',sample),
    path('api/jsonupload',UploadJson.as_view()),
    path('api/',include(router.urls))
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)






