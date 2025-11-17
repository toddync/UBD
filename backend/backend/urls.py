from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/energia/', include('energyAPI.urls')),
    path('api/saude/', include('heartAPI.urls')),
]
