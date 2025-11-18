# 📚 Documentação Detalhada - Energy API Django

## 🎯 Objetivo

Esta documentação explica **passo a passo** como a API de Energia Solar foi construída, desde a configuração do ambiente até cada linha de código. Ao final, você será capaz de replicar e criar suas próprias APIs Django.

---

## 📋 Índice

1. [Configuração do Ambiente](#1-configuração-do-ambiente)
2. [Estrutura de Pastas](#2-estrutura-de-pastas)
3. [Análise dos Dados (CSV)](#3-análise-dos-dados-csv)
4. [Lógica de Negócio (Services)](#4-lógica-de-negócio-services)
5. [Views (Endpoints da API)](#5-views-endpoints-da-api)
6. [URLs (Roteamento)](#6-urls-roteamento)
7. [Configurações Django](#7-configurações-django)
8. [Testando a API](#8-testando-a-api)
9. [Conceitos Importantes](#9-conceitos-importantes)

---

## 1. Configuração do Ambiente

### 1.1. Por que usar Ambiente Virtual?

**Problema**: Diferentes projetos podem precisar de versões diferentes de bibliotecas.

**Solução**: Ambiente virtual cria um "sandbox" isolado para cada projeto.

### 1.2. Criar e Ativar Ambiente Virtual

```bash
# Criar ambiente virtual
python -m venv env

# Ativar (Windows PowerShell)
.\env\Scripts\Activate.ps1

# Ativar (Windows CMD)
.\env\Scripts\activate.bat

# Ativar (Linux/Mac)
source env/bin/activate
```

**O que acontece?**
- Cria pasta `env/` com Python isolado
- Quando ativado, `pip install` instala apenas nesse ambiente
- Prompt muda para `(env)` indicando que está ativo

### 1.3. Instalar Dependências

```bash
pip install django djangorestframework django-cors-headers pandas
```

**Por que cada biblioteca?**
- `django`: Framework web principal
- `djangorestframework`: Facilita criação de APIs REST
- `django-cors-headers`: Permite frontend (React) acessar o backend
- `pandas`: Manipulação de dados CSV

### 1.4. Criar Projeto Django

```bash
django-admin startproject backend
cd backend
```

**O que foi criado?**
```
backend/
├── manage.py           # Script principal para comandos Django
└── backend/
    ├── __init__.py     # Marca como pacote Python
    ├── settings.py     # Configurações do projeto
    ├── urls.py         # Rotas principais
    └── wsgi.py         # Para deploy em produção
```

### 1.5. Criar App Django

```bash
python manage.py startapp energyAPI
```

**O que é um App?**
- Django divide funcionalidades em "apps"
- Cada app é um módulo independente
- Nosso app: `energyAPI` (análise de energia solar)

**Estrutura criada:**
```
energyAPI/
├── __init__.py
├── admin.py        # Registrar modelos no admin
├── apps.py         # Configuração do app
├── models.py       # Modelos de dados (DB)
├── tests.py        # Testes unitários
├── views.py        # Lógica dos endpoints
└── migrations/     # Controle de versão do DB
```

---

## 2. Estrutura de Pastas

### 2.1. Estrutura Recomendada

```
backend/
├── energyAPI/
│   ├── views.py              # Endpoints da API
│   ├── urls.py               # Rotas do app (CRIAR)
│   ├── serializers.py        # Formatação JSON (opcional)
│   ├── tests.py              # Testes
│   └── services/             # CRIAR ESTA PASTA
│       └── analise_energia.py  # Lógica de negócio
```

### 2.2. Por que separar em `services/`?

**Princípio de Responsabilidade Única:**

❌ **Ruim**: Colocar tudo em `views.py`
```python
# views.py (EVITAR)
def analise(request):
    # 200 linhas de cálculos aqui
    # Difícil de testar e reutilizar
```

✅ **Bom**: Separar lógica de negócio
```python
# services/analise_energia.py
def calcular_rendimento():
    # Lógica aqui
    return resultado

# views.py
def analise(request):
    dados = calcular_rendimento()  # Simples!
    return Response(dados)
```

**Vantagens:**
- Lógica pode ser testada independentemente
- Pode ser reutilizada em outros endpoints
- Código mais organizado e legível

---

## 3. Análise dos Dados (CSV)

### 3.1. Estrutura do CSV

**Arquivo**: `dados/painel_solar.csv`

```csv
hora,temperatura_c,radiacao_wm2,potencia_kw
8,24,680,3.2
10,28,850,3.9
12,32,920,4.1
14,34,940,4.0
16,31,870,3.6
```

**Colunas:**
- `hora`: Hora do dia (8h, 10h, ...)
- `temperatura_c`: Temperatura ambiente em °C
- `radiacao_wm2`: Radiação solar em W/m²
- `potencia_kw`: Potência gerada pelo painel em kW

### 3.2. O que Precisamos Calcular?

1. **Rendimento (Eficiência)**: Quanto da energia solar é convertida em eletricidade
2. **Correlação**: Relação entre temperatura e potência
3. **Estatísticas**: Máximo, médio, hora pico

---

## 4. Lógica de Negócio (Services)

### 4.1. Criar o Arquivo

**Caminho**: `backend/energyAPI/services/analise_energia.py`

### 4.2. Importações

```python
import pandas as pd
from pathlib import Path
```

**Por que essas bibliotecas?**

- `pandas`: Manipula dados tabulares (CSV, Excel) de forma eficiente
- `pathlib.Path`: Gerencia caminhos de arquivos de forma cross-platform (Windows/Linux)

### 4.3. Configurar Caminho do CSV

```python
# Obter caminho dos dados 
BASE_DIR = Path(__file__).resolve().parent.parent.parent.parent
DATA_PATH = BASE_DIR / 'dados' / 'painel_solar.csv'
```

**Explicação linha por linha:**

1. `Path(__file__)`: Caminho do arquivo atual
   - Resultado: `C:\...\UBD\backend\energyAPI\services\analise_energia.py`

2. `.resolve()`: Converte para caminho absoluto
   - Remove `.` e `..` do caminho

3. `.parent.parent.parent.parent`: Sobe 4 níveis de pasta
   - 1º `.parent` → `services/`
   - 2º `.parent` → `energyAPI/`
   - 3º `.parent` → `backend/`
   - 4º `.parent` → `UBD/` (raiz do projeto)

4. `/ 'dados' / 'painel_solar.csv'`: Adiciona caminho relativo
   - Resultado final: `C:\...\UBD\dados\painel_solar.csv`

**Por que não usar string direta?**

❌ Ruim:
```python
DATA_PATH = "C:\\Users\\gabriel\\dados\\painel_solar.csv"  # Quebra em outra máquina
```

✅ Bom:
```python
DATA_PATH = BASE_DIR / 'dados' / 'painel_solar.csv'  # Funciona em qualquer lugar
```

---

### 4.4. Função: `calcular_rendimento()`

#### 4.4.1. Código Completo

```python
def calcular_rendimento():
    """Calcula o rendimento médio por hora dos paineis solares
        
       returns: 
        dict: Dados processados prontos para Json
    """
    
    # 1. Puxar os dados do arquivo csv
    df = pd.read_csv(DATA_PATH)
    
    # 2. Calcular rendimento
    area_painel = 10  # m²
    df['potencia_incidente_kw'] = (df['radiacao_wm2'] * area_painel) / 1000
    df['percentual_rendimento'] = (df['potencia_kw'] / df['potencia_incidente_kw']) * 100
    
    # 3. Preparar os dados
    resultado = {
        'dados_brutos': df.to_dict('records'),
        'rendimento_por_hora': df.groupby('hora')['percentual_rendimento'].mean().to_dict(),
        'estatisticas': {
            'rendimento_medio': round(df['percentual_rendimento'].mean(), 2),
            'rendimento_maximo': round(df['percentual_rendimento'].max(), 2),
            'hora_pico': int(df.loc[df['percentual_rendimento'].idxmax(), 'hora']),
            'potencia_max': round(df['potencia_kw'].max(), 1),
        },
        'dados_grafico_dispersao': {
            'temperatura': df['temperatura_c'].tolist(),
            'potencia': df['potencia_kw'].tolist(),
        },
        'dados_mapa_calor': {
            'horas': df['hora'].tolist(),
            'eficiencia': df['percentual_rendimento'].round(2).tolist(),
        }
    }
    
    return resultado
```

#### 4.4.2. Explicação Detalhada

**Passo 1: Carregar CSV**

```python
df = pd.read_csv(DATA_PATH)
```

- `pd.read_csv()`: Lê arquivo CSV e cria DataFrame
- **DataFrame**: Estrutura de dados tabular (linhas e colunas)

**Antes (CSV):**
```
hora | temperatura_c | radiacao_wm2 | potencia_kw
8    | 24           | 680          | 3.2
```

**Depois (DataFrame `df`):**
```python
   hora  temperatura_c  radiacao_wm2  potencia_kw
0     8             24           680          3.2
1    10             28           850          3.9
```

---

**Passo 2: Calcular Potência Incidente**

```python
area_painel = 10  # m²
df['potencia_incidente_kw'] = (df['radiacao_wm2'] * area_painel) / 1000
```

**O que é Potência Incidente?**
- Quantidade de energia solar que CHEGA no painel
- Fórmula: `Radiação (W/m²) × Área (m²) = Potência (W)`
- Dividimos por 1000 para converter W → kW

**Exemplo de Cálculo:**
```
Radiação = 680 W/m²
Área = 10 m²
Potência Incidente = 680 × 10 = 6800 W = 6.8 kW
```

**DataFrame após o cálculo:**
```python
   hora  temperatura_c  radiacao_wm2  potencia_kw  potencia_incidente_kw
0     8             24           680          3.2                    6.8
```

---

**Passo 3: Calcular Rendimento (Eficiência)**

```python
df['percentual_rendimento'] = (df['potencia_kw'] / df['potencia_incidente_kw']) * 100
```

**O que é Rendimento?**
- Porcentagem da energia solar que vira eletricidade
- Fórmula: `(Potência Gerada / Potência Incidente) × 100`

**Exemplo:**
```
Potência Gerada = 3.2 kW
Potência Incidente = 6.8 kW
Rendimento = (3.2 / 6.8) × 100 = 47.06%
```

**Interpretação:**
- 47% de eficiência = bom painel solar
- 53% da energia é perdida (calor, reflexão)

---

**Passo 4: Preparar Dados para JSON**

```python
resultado = {
    'dados_brutos': df.to_dict('records'),
    ...
}
```

**4.1. Dados Brutos**

```python
'dados_brutos': df.to_dict('records')
```

- `to_dict('records')`: Converte DataFrame em lista de dicionários
- Cada linha vira um objeto JSON

**Resultado:**
```json
[
  {
    "hora": 8,
    "temperatura_c": 24,
    "radiacao_wm2": 680,
    "potencia_kw": 3.2,
    "potencia_incidente_kw": 6.8,
    "percentual_rendimento": 47.06
  },
  {...}
]
```

---

**4.2. Rendimento por Hora**

```python
'rendimento_por_hora': df.groupby('hora')['percentual_rendimento'].mean().to_dict()
```

- `groupby('hora')`: Agrupa linhas pela hora
- `['percentual_rendimento']`: Seleciona coluna
- `.mean()`: Calcula média de cada grupo
- `.to_dict()`: Converte para dicionário

**Resultado:**
```json
{
  "8": 47.06,
  "10": 45.88,
  "12": 44.57
}
```

**Por que isso é útil?**
- Frontend pode criar gráfico de barras direto
- Se houver múltiplas medições na mesma hora, calcula a média

---

**4.3. Estatísticas**

```python
'estatisticas': {
    'rendimento_medio': round(df['percentual_rendimento'].mean(), 2),
    'rendimento_maximo': round(df['percentual_rendimento'].max(), 2),
    'hora_pico': int(df.loc[df['percentual_rendimento'].idxmax(), 'hora']),
    'potencia_max': round(df['potencia_kw'].max(), 1),
}
```

**Explicação de cada linha:**

1. **Rendimento Médio**
```python
round(df['percentual_rendimento'].mean(), 2)
```
- `.mean()`: Calcula média de todos os valores
- `round(..., 2)`: Arredonda para 2 casas decimais
- Resultado: `44.29`

2. **Rendimento Máximo**
```python
round(df['percentual_rendimento'].max(), 2)
```
- `.max()`: Retorna valor máximo da coluna
- Resultado: `47.06`

3. **Hora Pico** (mais complexo)
```python
int(df.loc[df['percentual_rendimento'].idxmax(), 'hora'])
```

Vamos decompor:

```python
# Passo 1: Encontrar índice do valor máximo
indice = df['percentual_rendimento'].idxmax()  # Resultado: 0 (primeira linha)

# Passo 2: Pegar valor da coluna 'hora' nesse índice
hora = df.loc[indice, 'hora']  # Resultado: 8

# Passo 3: Converter para inteiro
hora_pico = int(hora)  # Resultado: 8
```

**Tradução**: "Qual hora teve o melhor rendimento?"

4. **Potência Máxima**
```python
round(df['potencia_kw'].max(), 1)
```
- Maior valor de potência gerada
- Arredonda para 1 casa decimal
- Resultado: `4.1`

---

**4.4. Dados para Gráfico de Dispersão**

```python
'dados_grafico_dispersao': {
    'temperatura': df['temperatura_c'].tolist(),
    'potencia': df['potencia_kw'].tolist(),
}
```

- `.tolist()`: Converte coluna Pandas para lista Python
- Frontend usa para plotar gráfico X-Y

**Resultado:**
```json
{
  "temperatura": [24, 28, 32, 34, 31],
  "potencia": [3.2, 3.9, 4.1, 4.0, 3.6]
}
```

**Por que dois arrays separados?**
- Algumas bibliotecas de gráficos (como Recharts) preferem assim
- Fácil de transformar em pares `[{x: 24, y: 3.2}, ...]` no frontend

---

**4.5. Dados para Mapa de Calor**

```python
'dados_mapa_calor': {
    'horas': df['hora'].tolist(),
    'eficiencia': df['percentual_rendimento'].round(2).tolist(),
}
```

- `.round(2)`: Arredonda valores antes de converter
- Útil para visualização temporal da eficiência

**Resultado:**
```json
{
  "horas": [8, 10, 12, 14, 16],
  "eficiencia": [47.06, 45.88, 44.57, 42.55, 41.38]
}
```

---

### 4.5. Função: `calcular_correlacao()`

```python
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
```

#### 4.5.1. O que é Correlação?

**Definição**: Mede o grau de relação entre duas variáveis.

**Valores:**
- `+1.0`: Correlação perfeita positiva (quando X sobe, Y sobe)
- `0.0`: Sem correlação (variáveis independentes)
- `-1.0`: Correlação perfeita negativa (quando X sobe, Y desce)

**Exemplo:**
- Correlação temperatura × potência = `0.802`
- Interpretação: "Quanto maior a temperatura, maior a potência (relação forte)"

#### 4.5.2. Calcular Matriz de Correlação

```python
correlacao = df[['temperatura_c', 'radiacao_wm2', 'potencia_kw']].corr()
```

1. `df[[...]]`: Seleciona apenas essas 3 colunas
2. `.corr()`: Calcula correlação entre TODAS as combinações

**Resultado:**
```
                   temperatura_c  radiacao_wm2  potencia_kw
temperatura_c           1.000000      0.962000     0.802000
radiacao_wm2            0.962000      1.000000     0.916000
potencia_kw             0.802000      0.916000     1.000000
```

**Como ler:**
- Diagonal = 1.0 (variável consigo mesma = correlação perfeita)
- `correlacao.loc['temperatura_c', 'potencia_kw']` = `0.802`

#### 4.5.3. Extrair Insights Específicos

```python
'insights': {
    'correlacao_temp_potencia': round(correlacao.loc['temperatura_c', 'potencia_kw'], 3),
    ...
}
```

- Extrai valores específicos da matriz
- Facilita frontend exibir as correlações mais importantes
- `round(..., 3)`: 3 casas decimais

---

### 4.6. Função: `obter_dados_completos()`

```python
def obter_dados_completos():
    """Retorna todos os dados do CSV processados para visualizações
    
    Returns:
        dict: Dados completos com todos os cálculos
    """
    df = pd.read_csv(DATA_PATH)
    
    # Adicionar cálculos de rendimento
    area_painel = 10  # m²
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
```

**Por que ter essa função?**
- Retorna TUDO em um único endpoint
- Frontend tem flexibilidade total para processar dados
- Inclui metadados úteis (unidades, totais)

---

## 5. Views (Endpoints da API)

### 5.1. O que é uma View?

**Definição**: Função que recebe uma requisição HTTP e retorna uma resposta.

**Fluxo:**
```
Frontend → GET /api/energia/rendimento/ → View → Processa → JSON Response → Frontend
```

### 5.2. Código Completo

**Arquivo**: `backend/energyAPI/views.py`

```python
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
```

### 5.3. Explicação Linha por Linha

#### 5.3.1. Importações

```python
from rest_framework.decorators import api_view
```

**O que faz?**
- Importa decorator `@api_view`
- Decorator = função que modifica outra função
- Transforma função Python normal em endpoint REST

**Sem decorator:**
```python
def analise_rendimento(request):  # Função Python simples
    return {"dados": [1, 2, 3]}   # Retorna dict Python
```

**Com decorator:**
```python
@api_view(['GET'])
def analise_rendimento(request):  # Agora é endpoint REST
    return Response({"dados": [1, 2, 3]})  # Retorna JSON automaticamente
```

---

```python
from rest_framework.response import Response
```

**O que é Response?**
- Classe que cria resposta HTTP
- Converte automaticamente Python dict → JSON
- Adiciona headers corretos (Content-Type: application/json)

---

```python
from rest_framework import status
```

**O que são status codes?**
- Números que indicam resultado da requisição
- `200 OK`: Sucesso
- `404 NOT FOUND`: Recurso não encontrado
- `500 INTERNAL SERVER ERROR`: Erro no servidor

**Por que usar `status.HTTP_200_OK` em vez de `200`?**
```python
# Menos legível
return Response(dados, status=200)

# Mais legível e semântico
return Response(dados, status=status.HTTP_200_OK)
```

---

```python
from .services.analise_energia import calcular_rendimento
```

- `.services`: Pasta services dentro do app atual
- `analise_energia`: Arquivo Python
- `calcular_rendimento`: Função a ser importada

**Equivalente em caminho:**
```
backend/energyAPI/services/analise_energia.py
          ↑ (estamos aqui)
```

---

#### 5.3.2. Decorator

```python
@api_view(['GET'])
```

**Parâmetros:**
- `['GET']`: Lista de métodos HTTP permitidos
- Opções: `'GET'`, `'POST'`, `'PUT'`, `'DELETE'`, `'PATCH'`

**Exemplos:**
```python
@api_view(['GET'])  # Apenas leitura
@api_view(['POST'])  # Apenas criação
@api_view(['GET', 'POST'])  # Leitura e criação
```

**O que ele faz automaticamente:**
1. Valida método HTTP (rejeita POST se não estiver na lista)
2. Parse da requisição (converte JSON → Python)
3. Adiciona headers CORS (se configurado)
4. Renderiza resposta como JSON

---

#### 5.3.3. Função View

```python
def analise_rendimento(request):
```

**Parâmetro `request`:**
- Objeto com informações da requisição HTTP
- Atributos úteis:
  - `request.method`: `'GET'`, `'POST'`, etc
  - `request.data`: Dados enviados no body (POST/PUT)
  - `request.query_params`: Parâmetros da URL (`?page=1`)
  - `request.user`: Usuário autenticado (se tiver auth)

---

#### 5.3.4. Try-Except (Tratamento de Erros)

```python
try:
    dados = calcular_rendimento()
    return Response(dados, status=status.HTTP_200_OK)
```

**Fluxo de sucesso:**
1. Chama função `calcular_rendimento()`
2. Recebe dicionário Python
3. `Response()` converte para JSON
4. Retorna com status 200

---

```python
except FileNotFoundError:
    return Response(
        {'erro': 'Arquivo de dados não encontrado...'},
        status=status.HTTP_404_NOT_FOUND
    )
```

**Quando acontece?**
- CSV não existe no caminho especificado
- Usuário vê erro amigável, não stack trace assustador

**Resposta JSON:**
```json
{
  "erro": "Arquivo de dados não encontrado. Verifique se painel_solar.csv existe na pasta dados/"
}
```

---

```python
except Exception as e:
    return Response(
        {'erro': f'Erro ao processar dados: {str(e)}'}, 
        status=status.HTTP_500_INTERNAL_SERVER_ERROR
    )
```

**Quando acontece?**
- Qualquer outro erro (CSV corrompido, erro no cálculo, etc)
- `str(e)`: Converte exceção em string para exibir mensagem

**Por que é importante?**
- Sem try-except: Django retorna HTML de erro (ruim para APIs)
- Com try-except: Retorna JSON estruturado (bom para frontends)

---

### 5.4. Outras Views

```python
@api_view(['GET'])
def correlacao_variaveis(request):
    try:
        dados = calcular_correlacao()
        return Response(dados, status=status.HTTP_200_OK)
    except FileNotFoundError:
        return Response({'erro': 'Arquivo de dados não encontrado'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'erro': f'Erro ao processar correlação: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def dados_completos(request):
    try:
        dados = obter_dados_completos()
        return Response(dados, status=status.HTTP_200_OK)
    except FileNotFoundError:
        return Response({'erro': 'Arquivo de dados não encontrado'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'erro': f'Erro ao obter dados: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
```

**Padrão:**
- Todas seguem mesma estrutura
- Chamam função do services
- Retornam Response com tratamento de erro

---

## 6. URLs (Roteamento)

### 6.1. O que é Roteamento?

**Definição**: Mapear URLs para funções (views).

**Exemplo:**
```
URL: http://localhost:8000/api/energia/rendimento/
     ↓
View: analise_rendimento()
     ↓
Response: JSON com dados
```

### 6.2. URLs do App

**Arquivo**: `backend/energyAPI/urls.py` (CRIAR)

```python
from django.urls import path
from . import views

# URLs da API de Energia Solar
# Prefixo: /api/energia/
urlpatterns = [
    path('rendimento/', views.analise_rendimento, name='energia_rendimento'),
    path('correlacao/', views.correlacao_variaveis, name='energia_correlacao'),
    path('dados/', views.dados_completos, name='energia_dados'),
]
```

#### 6.2.1. Explicação

```python
from django.urls import path
```

- Importa função `path()` para definir rotas

---

```python
from . import views
```

- `.` = diretório atual (`energyAPI/`)
- Importa módulo `views.py`

---

```python
urlpatterns = [...]
```

- Lista obrigatória que Django procura
- Cada item é uma rota

---

```python
path('rendimento/', views.analise_rendimento, name='energia_rendimento')
```

**Parâmetros:**

1. `'rendimento/'`: Padrão da URL
   - **Importante**: Termina com `/`
   - URL final: `/api/energia/rendimento/`

2. `views.analise_rendimento`: Função que será chamada
   - Não use parênteses! `views.analise_rendimento` ✓
   - Errado: `views.analise_rendimento()` ✗

3. `name='energia_rendimento'`: Nome interno da rota
   - Usado para gerar URLs dinamicamente
   - Útil em templates: `{% url 'energia_rendimento' %}`

---

### 6.3. URLs Principais

**Arquivo**: `backend/backend/urls.py` (MODIFICAR)

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/energia/', include('energyAPI.urls')),
    path('api/saude/', include('heartAPI.urls')),
]
```

#### 6.3.1. Explicação

```python
from django.urls import path, include
```

- `include()`: Importa rotas de outro arquivo

---

```python
path('api/energia/', include('energyAPI.urls'))
```

**O que acontece:**

1. Django vê requisição para `/api/energia/rendimento/`
2. Match com prefixo `api/energia/`
3. Inclui rotas de `energyAPI.urls`
4. Busca `rendimento/` nas rotas do app
5. Encontra e chama `views.analise_rendimento`

**Vantagem:**
- Cada app gerencia suas próprias rotas
- Projeto principal só define prefixos

---

## 7. Configurações Django

### 7.1. Arquivo `settings.py`

**Caminho**: `backend/backend/settings.py`

#### 7.1.1. INSTALLED_APPS

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Third party apps
    'rest_framework',        # Django REST Framework
    'corsheaders',           # CORS
    
    # Seus apps
    'energyAPI',
    'heartAPI',
]
```

**O que é INSTALLED_APPS?**
- Lista de apps que Django deve carregar
- Ordem importa em alguns casos (CORS deve vir antes)

**Apps de terceiros:**
- `rest_framework`: Habilita funcionalidades de API REST
- `corsheaders`: Permite requisições cross-origin (React → Django)

**Seus apps:**
- `energyAPI`: Nosso app de energia
- `heartAPI`: App de saúde (se existir)

---

#### 7.1.2. MIDDLEWARE

```python
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # ← ANTES do CommonMiddleware
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
```

**O que é Middleware?**
- Camadas que processam requisições/respostas
- Executam em ordem na entrada e ordem reversa na saída

**Fluxo:**
```
Request → Security → Sessions → CORS → Common → ... → View → ... → Response
```

**Importante:**
- `CorsMiddleware` DEVE vir ANTES de `CommonMiddleware`
- Ordem errada = CORS não funciona

---

#### 7.1.3. CORS Configuration

```python
# Configuração CORS - Permite requisições do frontend React
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Vite dev server (React)
    "http://127.0.0.1:5173",
]
```

**O que é CORS?**
- **Cross-Origin Resource Sharing**
- Segurança do navegador que bloqueia requisições entre domínios diferentes

**Problema sem CORS:**
```
Frontend: http://localhost:5173 (React)
Backend:  http://localhost:8000 (Django)
Navegador: ❌ "Blocked by CORS policy"
```

**Solução:**
- Adicionar frontend na lista de origens permitidas
- Django adiciona header: `Access-Control-Allow-Origin: http://localhost:5173`
- Navegador: ✅ "OK, pode acessar"

**Alternativa (desenvolvimento):**
```python
CORS_ALLOW_ALL_ORIGINS = True  # Permite qualquer origem (INSEGURO em produção)
```

---

#### 7.1.4. Django REST Framework

```python
REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ],
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.JSONParser',
    ],
}
```

**Renderer Classes:**
- `JSONRenderer`: Converte Python → JSON
- `BrowsableAPIRenderer`: Interface web bonita para testar API

**Parser Classes:**
- `JSONParser`: Converte JSON → Python (requisições POST/PUT)

---

## 8. Testando a API

### 8.1. Iniciar Servidor

```bash
cd backend
python manage.py runserver
```

**Saída esperada:**
```
Django version 5.2.8, using settings 'backend.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
```

### 8.2. Testar no Navegador

**URL**: `http://localhost:8000/api/energia/rendimento/`

**Você verá:**
1. Interface bonita do Django REST Framework
2. JSON formatado
3. Botão "OPTIONS" mostrando métodos permitidos

### 8.3. Testar com PowerShell

```powershell
# Método 1: Invoke-WebRequest
Invoke-WebRequest -Uri "http://localhost:8000/api/energia/rendimento/" | Select-Object -Expand Content

# Método 2: Invoke-RestMethod (mais limpo)
Invoke-RestMethod -Uri "http://localhost:8000/api/energia/rendimento/"
```

### 8.4. Testar com Thunder Client (VS Code)

1. Instalar extensão "Thunder Client"
2. New Request → GET
3. URL: `http://localhost:8000/api/energia/rendimento/`
4. Send
5. Ver JSON na aba "Response"

---

## 9. Conceitos Importantes

### 9.1. Separação de Responsabilidades

```
Services  → Lógica de negócio (cálculos, processamento)
Views     → Recebe requisição, chama services, retorna resposta
URLs      → Mapeia URLs para views
Settings  → Configurações globais
```

**Benefícios:**
- Código testável (testar services sem HTTP)
- Reutilizável (mesma lógica em múltiplas views)
- Manutenível (mudanças isoladas)

### 9.2. REST API Principles

**REST = Representational State Transfer**

**Princípios seguidos:**

1. **Stateless**: Cada requisição é independente
   ```python
   # Ruim: Guardar estado no servidor
   session['user_data'] = data
   
   # Bom: Enviar tudo necessário na requisição
   GET /api/energia/rendimento/  # Requisição completa
   ```

2. **Resource-based**: URLs representam recursos
   ```
   /api/energia/rendimento/  → Recurso: análise de rendimento
   /api/energia/correlacao/  → Recurso: análise de correlação
   ```

3. **HTTP Methods**: Usar métodos corretos
   ```
   GET    → Ler dados
   POST   → Criar
   PUT    → Atualizar completo
   PATCH  → Atualizar parcial
   DELETE → Remover
   ```

4. **JSON**: Formato padrão de dados
   ```python
   return Response({'dados': [1, 2, 3]})  # Converte para JSON
   ```

### 9.3. Error Handling Best Practices

**Sempre retornar:**

1. **Status code apropriado**
   ```python
   200 OK           → Sucesso
   201 Created      → Recurso criado
   400 Bad Request  → Dados inválidos
   404 Not Found    → Recurso não existe
   500 Server Error → Erro interno
   ```

2. **Mensagem estruturada**
   ```python
   {'erro': 'Descrição clara do problema'}
   # Não: "Error" (vago)
   # Sim: "Arquivo painel_solar.csv não encontrado na pasta dados/"
   ```

### 9.4. Path vs PathLib

**Antiga (string):**
```python
import os
DATA_PATH = os.path.join(os.path.dirname(__file__), '..', '..', 'dados', 'painel_solar.csv')
# Resultado: '..\\..\\dados\\painel_solar.csv' (confuso)
```

**Nova (pathlib):**
```python
from pathlib import Path
DATA_PATH = Path(__file__).parent.parent / 'dados' / 'painel_solar.csv'
# Resultado: PosixPath('/caminho/absoluto/dados/painel_solar.csv') (claro)
```

**Vantagens pathlib:**
- Cross-platform (funciona em Windows/Linux/Mac)
- Mais legível (`/` em vez de `os.path.join`)
- Métodos úteis (`.exists()`, `.read_text()`, `.is_file()`)

---

## 10. Checklist para Replicar

### ✅ Estrutura de Arquivos
- [ ] Criar ambiente virtual
- [ ] Instalar dependências
- [ ] Criar projeto Django
- [ ] Criar app Django
- [ ] Criar pasta `services/`

### ✅ Lógica de Negócio
- [ ] Criar arquivo `services/analise_energia.py`
- [ ] Importar pandas e Path
- [ ] Definir caminho do CSV
- [ ] Implementar função de cálculo
- [ ] Retornar dicionário Python

### ✅ Views
- [ ] Editar `views.py`
- [ ] Importar decorators do DRF
- [ ] Importar funções do services
- [ ] Criar view com `@api_view`
- [ ] Adicionar try-except

### ✅ URLs
- [ ] Criar `urls.py` no app
- [ ] Definir rotas com `path()`
- [ ] Incluir no `urls.py` principal

### ✅ Configurações
- [ ] Adicionar apps em `INSTALLED_APPS`
- [ ] Configurar middleware CORS
- [ ] Configurar `CORS_ALLOWED_ORIGINS`
- [ ] Configurar `REST_FRAMEWORK`

### ✅ Testes
- [ ] Rodar `python manage.py runserver`
- [ ] Testar no navegador
- [ ] Verificar JSON retornado

---

## 11. Próximos Passos

### 11.1. Melhorias Possíveis

1. **Cache**: Evitar recalcular sempre
```python
from django.core.cache import cache

def calcular_rendimento():
    cached = cache.get('rendimento_energia')
    if cached:
        return cached
    
    resultado = # ... cálculos ...
    cache.set('rendimento_energia', resultado, timeout=3600)  # 1 hora
    return resultado
```

2. **Paginação**: Para muitos dados
```python
from rest_framework.pagination import PageNumberPagination
```

3. **Filtros**: Permitir filtrar por hora
```python
@api_view(['GET'])
def analise_rendimento(request):
    hora = request.query_params.get('hora')  # /rendimento/?hora=8
    # Filtrar dados pela hora
```

4. **Testes Unitários**: Garantir qualidade
```python
# energyAPI/tests.py
from django.test import TestCase
from .services.analise_energia import calcular_rendimento

class EnergiaTestCase(TestCase):
    def test_calcular_rendimento(self):
        resultado = calcular_rendimento()
        self.assertIn('estatisticas', resultado)
        self.assertGreater(resultado['estatisticas']['rendimento_medio'], 0)
```

---

## 12. Recursos para Estudo

### Documentação Oficial
- [Django Docs](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Pandas Documentation](https://pandas.pydata.org/docs/)

### Tutoriais Recomendados
- Django Girls Tutorial
- DRF Quickstart
- Real Python (artigos sobre Django)

### Livros
- "Django for Beginners" - William Vincent
- "Two Scoops of Django" - Daniel Roy Greenfeld

---

## 🎉 Conclusão

Você agora entende:
- ✅ Como estruturar projeto Django
- ✅ Como separar lógica em camadas (services/views/urls)
- ✅ Como processar dados com Pandas
- ✅ Como criar APIs REST
- ✅ Como configurar CORS
- ✅ Como tratar erros adequadamente

**Próximo desafio:** Implemente a API de Saúde sozinho seguindo este mesmo padrão! 🚀

---

**Dúvidas?** Revise as seções específicas e pratique modificando o código!
