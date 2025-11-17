from django.urls import path
from . import views

# URLs da API de Energia Solar
# Prefixo: /api/energia/
urlpatterns = [
    path('rendimento/', views.analise_rendimento, name='energia_rendimento'),
    path('correlacao/', views.correlacao_variaveis, name='energia_correlacao'),
    path('dados/', views.dados_completos, name='energia_dados'),
]
