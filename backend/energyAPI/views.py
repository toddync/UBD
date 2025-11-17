from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .services.analise_energia import (
    calcular_rendimento, 
    calcular_correlacao, 
    obter_dados_completos
)


@api_view(['GET'])
def analise_rendimento(request):
    """
    Endpoint: GET /api/energia/rendimento/
    
    Retorna análise completa de rendimento dos painéis solares.
    Inclui dados brutos, rendimento por hora, estatísticas e dados para gráficos.
    """
    try:
        dados = calcular_rendimento()
        return Response(dados, status=status.HTTP_200_OK)
    except FileNotFoundError:
        return Response(
            {'erro': 'Arquivo de dados não encontrado. Verifique se painel_solar.csv existe na pasta dados/'},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response(
            {'erro': f'Erro ao processar dados: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
def correlacao_variaveis(request):
    """
    Endpoint: GET /api/energia/correlacao/
    
    Retorna análise de correlação entre temperatura, radiação e potência.
    Útil para entender as relações entre as variáveis.
    """
    try:
        dados = calcular_correlacao()
        return Response(dados, status=status.HTTP_200_OK)
    except FileNotFoundError:
        return Response(
            {'erro': 'Arquivo de dados não encontrado'},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response(
            {'erro': f'Erro ao processar correlação: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
def dados_completos(request):
    """
    Endpoint: GET /api/energia/dados/
    
    Retorna todos os dados do CSV com cálculos de rendimento incluídos.
    Ideal para visualizações customizadas no frontend.
    """
    try:
        dados = obter_dados_completos()
        return Response(dados, status=status.HTTP_200_OK)
    except FileNotFoundError:
        return Response(
            {'erro': 'Arquivo de dados não encontrado'},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response(
            {'erro': f'Erro ao obter dados: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
