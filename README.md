# UBD - Data Visualization Dashboard

Este projeto é uma aplicação full-stack para visualização de dados, focada em análises de Energia Solar e Saúde Cardíaca. O sistema utiliza um backend em Django para processamento de dados e uma interface moderna em React com visualizações interativas em D3.js.

## 🚀 Tecnologias Utilizadas

### Backend

- **Python**
- **Django & Django REST Framework**: API RESTful.
- **Pandas & NumPy**: Manipulação e análise de dados.
- **Scikit-learn**: Processamento de dados e machine learning.
- **Matplotlib & Seaborn**: Geração de gráficos estáticos (usados em notebooks/análises).

### Frontend

- **React**: Biblioteca para construção de interfaces.
- **Vite**: Build tool rápida e leve.
- **TailwindCSS**: Framework CSS utilitário para estilização.
- **D3.js**: Biblioteca para visualizações de dados dinâmicas e interativas.
- **React Router DOM**: Gerenciamento de rotas.

## 📂 Estrutura do Projeto

A estrutura de diretórios do projeto está organizada da seguinte forma:

```
UBD/
├── backend/                 # Backend Django
│   ├── backend/             # Configurações principais do projeto Django
│   ├── energyAPI/           # App responsável pelos dados de Energia Solar
│   │   ├── views.py         # Lógica dos endpoints de energia
│   │   └── urls.py          # Rotas da API de energia
│   ├── heartAPI/            # App responsável pelos dados de Saúde Cardíaca
│   │   ├── views.py         # Lógica dos endpoints de saúde
│   │   └── urls.py          # Rotas da API de saúde
│   ├── manage.py            # Script de gerenciamento do Django
│   └── requirements.txt     # Lista de dependências Python
│
├── frontend/                # Frontend React + Vite
│   ├── src/
│   │   ├── components/      # Componentes da UI
│   │   │   ├── energypage/  # Componentes específicos da página de Energia
│   │   │   ├── healthpage/  # Componentes específicos da página de Saúde
│   │   │   └── layout/      # Componentes estruturais (Header, Sidebar, etc.)
│   │   ├── config/          # Configurações globais (ex: constantes)
│   │   ├── contexts/        # Contextos do React (ex: ThemeContext)
│   │   ├── hooks/           # Custom Hooks (ex: useApiData, useD3Chart)
│   │   ├── pages/           # Páginas principais (Home, Energia, Saude)
│   │   ├── utils/           # Funções utilitárias (ex: d3Utils)
│   │   ├── App.jsx          # Configuração de rotas e layout principal
│   │   └── main.jsx         # Ponto de entrada da aplicação React
│   ├── package.json         # Dependências e scripts do Node.js
│   └── vite.config.js       # Configuração do Vite
│
├── dados/                   # Diretório para armazenamento de datasets brutos
├── *.ipynb                  # Jupyter Notebooks para análise exploratória e prototipagem
└── run_project.bat          # Script para configuração e execução automática (Windows)
```

## 🛠️ Pré-requisitos

Certifique-se de ter instalado em sua máquina:

- **Python** (3.8 ou superior)
- **Node.js** (LTS recomendado) & **npm**

## ⚡ Como Executar o Projeto

### Método Automático (Windows)

O projeto inclui um script `run_project.bat` que automatiza todo o processo de configuração e execução.

1. Execute o arquivo `run_project.bat` na raiz do projeto.
2. O script irá:
   - Criar um ambiente virtual Python (`env`) se não existir.
   - Instalar as dependências do backend (`requirements.txt`).
   - Instalar as dependências do frontend (`package.json`).
   - Iniciar o servidor Django (Backend) e o servidor Vite (Frontend).

### Método Manual

#### 1. Backend (Django)

```bash
# Navegue até a pasta backend
cd backend

# Crie um ambiente virtual
python -m venv env

# Ative o ambiente virtual
# Windows:
env\Scripts\activate
# Linux/Mac:
source env/bin/activate

# Instale as dependências
pip install -r requirements.txt

# Execute as migrações (se necessário)
python manage.py migrate

# Inicie o servidor
python manage.py runserver
```

O backend estará rodando em `http://localhost:8000`.

#### 2. Frontend (React)

```bash
# Navegue até a pasta frontend
cd frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O frontend estará rodando em `http://localhost:5173`.

## 📡 Documentação da API

### Energia (`/api/energia/`)

- `GET /rendimento/`: Retorna dados de análise de rendimento.
- `GET /correlacao/`: Retorna correlação entre variáveis de energia.
- `GET /dados/`: Retorna o conjunto de dados completo processado.

### Saúde (`/api/saude/`)

- `GET /correlacao-variaveis/`: Retorna correlação entre variáveis de saúde.
- `GET /dispersao-colesterol-pressao/`: Dados para gráfico de dispersão (Colesterol vs Pressão).
- `GET /mapa-calor-correlacao/`: Dados para o mapa de calor de correlação.

## 🖥️ Funcionalidades do Frontend

- **Dashboard de Energia (`/energia`)**: Visualizações sobre eficiência de painéis solares, temperatura e potência.
- **Dashboard de Saúde (`/saude`)**: Análises de dados cardíacos, incluindo correlações e dispersão de métricas de saúde.
- **Responsividade**: Interface adaptável para diferentes tamanhos de tela, com suporte a tema claro/escuro.
