import pandas as pd
from pathlib import Path

# Obter caminho dos dados 
BASE_DIR = Path(__file__).resolve().parent.parent.parent
DATA_PATH = BASE_DIR / 'dados' / 'painel_solar.csv'

def calcular_rendimento():
    """Calcula o rendimento médio por hora dos paineis solares
        
       returns: 
        dict: Dados processados prontos para Json
    """
    
    # puxar os dados do arquivo csv
    df = pd.read_csv(DATA_PATH)
    
    # Calcula rendimento
    area_painel = 10 # m^2 
    df['potencia_incidente_kw'] = (df['radiacao_wm2'] * area_painel) / 1000
    df['percentual_rendimento'] = (df['potencia_kw'] / df['potencia_incidente_kw']) * 100
    
    # Preparar os dados
    resultado = {
        'dados_brutos': df.to_dict('records'),
        'rendimento_por_hora':df.groupby('hora')['percentual_rendimento'].mean().to_dict(),
        'estatisticas': {
            'rendimento_medio': round(df['percentual_rendimento'].mean(), 2),
            'rendimento_maximo': round(df['percentual_rendimento'].max(), 2),
            'hora_pico': int(df.loc[df['percentual_rendimento'].idxmax(), 'hora']),
            'potencia_max': round(df['potencia_kw'].max(), 1),
        },
        'dados_grafico_dispersao': {
            'temperatura': df['temperatura_c'].tolist(),
            'potencia': df['potencia_kw'].tolist(),
        }
    }    
    
    return resultado


def calcular_correlacao():
    """Calcula a correlação entre temperatura, radiação e potência
    
    Returns:
        dict: Matriz de correlação e insights principais
    """
    # Puxar os dados do arquivo csv
    df = pd.read_csv(DATA_PATH)
    
    # Calcular correlação entre as variáveis
    correlacao = df[['temperatura_c', 'radiacao_wm2', 'potencia_kw']].corr()
    
    resultado = {
        'matriz_correlacao': correlacao.to_dict(),
        'insights': {
            'correlacao_temp_potencia': round(correlacao.loc['temperatura_c', 'potencia_kw'], 3),
            'correlacao_radiacao_potencia': round(correlacao.loc['radiacao_wm2', 'potencia_kw'], 3),
            'correlacao_temp_radiacao': round(correlacao.loc['temperatura_c', 'radiacao_wm2'], 3),
        }
    }
    
    return resultado


def obter_dados_completos():
    """Retorna todos os dados do CSV processados para visualizações
    
    Returns:
        dict: Dados completos com todos os cálculos
    """
    # Puxar os dados do arquivo csv
    df = pd.read_csv(DATA_PATH)
    
    # Adicionar cálculos de rendimento
    area_painel = 10  # m^2
    df['potencia_incidente_kw'] = (df['radiacao_wm2'] * area_painel) / 1000
    df['percentual_rendimento'] = (df['potencia_kw'] / df['potencia_incidente_kw']) * 100
    
    resultado = {
        'dados_completos': df.to_dict('records'),
        'metadados': {
            'total_registros': len(df),
            'area_painel_m2': area_painel,
            'unidades': {
                'temperatura': '°C',
                'radiacao': 'W/m²',
                'potencia': 'kW',
                'rendimento': '%'
            }
        }
    }
    
    return resultado


