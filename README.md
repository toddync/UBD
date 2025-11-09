# UBD - Projeto de Análise de Dados

Um projeto full-stack que combina análise de dados com Django (backend) e React (frontend), desenvolvido para estudos de ciência de dados e desenvolvimento web.

## 📋 Descrição

Este projeto contém duas análises principais de dados:

### 🌞 Minimundo 13 - Análise de Eficiência de Painéis Solares

Análise do desempenho de painéis solares com base na temperatura e radiação solar, incluindo:

- Cálculo de rendimento médio por hora
- Gráfico de dispersão (temperatura × potência)
- Mapa de calor (hora × eficiência)

### 🏥 Minimundo 15 - Análise de Risco Cardíaco

Predição de risco cardíaco em pacientes baseada em fatores como pressão arterial, colesterol e idade:

- Análise de correlação entre variáveis
- Visualizações de dispersão
- Mapas de calor de correlação

## 🏗️ Estrutura do Projeto

```
UBD/
├── backend/                    # API Django
│   ├── manage.py
│   ├── requirements.txt
│   └── backend/
│       ├── settings.py
│       ├── urls.py
│       └── ...
├── frontend/                   # Interface React + Vite
│   ├── src/
│   │   ├── App.jsx
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
├── dados/                      # Datasets
│   ├── painel_solar.csv       # Dados de eficiência solar
│   └── risco_cardiaco.csv     # Dados médicos
├── env/                        # Ambiente virtual Python
├── 13.ipynb                    # Notebook - Análise Solar
├── 15.ipynb                    # Notebook - Análise Cardíaca
└── README.md
```

## 🛠️ Tecnologias Utilizadas

### Backend

- **Python 3.x**
- **Django 5.2.8** - Framework web
- **Pandas** - Análise de dados
- **Matplotlib** - Visualizações
- **Seaborn** - Gráficos estatísticos
- **Scikit-learn** - Machine Learning

### Frontend

- **React 19.1.1** - Interface do usuário
- **Vite 7.1.7** - Build tool e desenvolvimento
- **ESLint** - Linting de código

### Dados

- **CSV** - Formato dos datasets
- **Jupyter Notebooks** - Análise exploratória

## 🚀 Como Executar

### Pré-requisitos

- Python 3.x
- Node.js
- npm ou yarn

### Backend (Django)

1. **Ativar o ambiente virtual:**

   ```bash
   # Windows
   env\Scripts\activate

   # Linux/Mac
   source env/bin/activate
   ```

2. **Instalar dependências:**

   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Executar o servidor Django:**

   ```bash
   python manage.py runserver
   ```

   O backend estará disponível em: `http://localhost:8000`

### Frontend (React + Vite)

1. **Instalar dependências:**

   ```bash
   cd frontend
   npm install
   ```

2. **Executar o servidor de desenvolvimento:**

   ```bash
   npm run dev
   ```

   O frontend estará disponível em: `http://localhost:5173`

### Notebooks de Análise

1. **Instalar Jupyter (se necessário):**

   ```bash
   pip install jupyter
   ```

2. **Executar Jupyter:**

   ```bash
   jupyter notebook
   ```

3. **Abrir os notebooks:**
   - `13.ipynb` - Análise de Painéis Solares
   - `15.ipynb` - Análise de Risco Cardíaco

## 📊 Datasets

### painel_solar.csv

Contém dados sobre eficiência de painéis solares:

- `hora` - Hora do dia
- `temperatura_c` - Temperatura em Celsius
- `radiacao_wm2` - Radiação solar (W/m²)
- `potencia_kw` - Potência gerada (kW)

### risco_cardiaco.csv

Contém dados médicos para análise de risco:

- `paciente` - ID do paciente
- `idade` - Idade do paciente
- `colesterol` - Nível de colesterol
- `pressao` - Pressão arterial
- `risco` - Indicador de risco (0/1)

## 🔧 Scripts Disponíveis

### Frontend

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run lint` - Verificação de código
- `npm run preview` - Preview do build

### Backend

- `python manage.py runserver` - Servidor de desenvolvimento
- `python manage.py migrate` - Aplicar migrações
- `python manage.py createsuperuser` - Criar superusuário

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto é destinado para fins educacionais e de estudo.

## 👥 Autores

- Desenvolvido para estudos de análise de dados e desenvolvimento web

---

**Nota:** Este é um projeto acadêmico focado em aprendizado de ciência de dados, desenvolvimento web full-stack e análise de dados em cenários reais.
