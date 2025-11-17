# 🧪 Guia de Testes - Backend Django API

## 📋 Checklist de Implementação

### ✅ O que foi implementado:

#### **Energy API** (`/api/energia/`)
- ✅ `analise_energia.py` - 3 funções de análise
- ✅ `views.py` - 3 endpoints REST
- ✅ `urls.py` - Rotas configuradas

#### **Heart API** (`/api/saude/`)
- ✅ `analise_saude.py` - 3 funções de análise
- ✅ `views.py` - 3 endpoints REST
- ✅ `urls.py` - Rotas configuradas

#### **Configurações**
- ✅ CORS configurado corretamente
- ✅ Django REST Framework configurado
- ✅ URLs principais conectadas

---

## 🚀 Como Testar

### 1️⃣ **Iniciar o Servidor Django**

```bash
# No terminal, na pasta backend/
cd backend
python manage.py runserver
```

Você deve ver:
```
Django version 5.2.8, using settings 'backend.settings'
Starting development server at http://127.0.0.1:8000/
```

---

## 🔗 Endpoints Disponíveis

### **API de Energia Solar**

#### 1. Análise de Rendimento
```
GET http://localhost:8000/api/energia/rendimento/
```

**Retorna:**
```json
{
  "dados_brutos": [
    {
      "hora": 8,
      "temperatura_c": 24,
      "radiacao_wm2": 680,
      "potencia_kw": 3.2,
      "potencia_incidente_kw": 6.8,
      "percentual_rendimento": 47.06
    },
    ...
  ],
  "rendimento_por_hora": {
    "8": 47.06,
    "10": 45.88,
    ...
  },
  "estatisticas": {
    "rendimento_medio": 44.29,
    "rendimento_maximo": 47.06,
    "hora_pico": 8,
    "potencia_max": 4.1
  },
  "dados_grafico_dispersao": {
    "temperatura": [24, 28, 32, 34, 31],
    "potencia": [3.2, 3.9, 4.1, 4.0, 3.6]
  }
}
```

#### 2. Correlação de Variáveis
```
GET http://localhost:8000/api/energia/correlacao/
```

**Retorna:**
```json
{
  "matriz_correlacao": {
    "temperatura_c": {"temperatura_c": 1.0, "radiacao_wm2": 0.95, ...},
    ...
  },
  "insights": {
    "correlacao_temp_potencia": 0.762,
    "correlacao_radiacao_potencia": 0.945,
    "correlacao_temp_radiacao": 0.923
  }
}
```

#### 3. Dados Completos
```
GET http://localhost:8000/api/energia/dados/
```

---

### **API de Saúde Cardíaca**

#### 1. Correlação de Variáveis de Saúde
```
GET http://localhost:8000/api/saude/correlacao/
```

**Retorna:**
```json
{
  "matriz_correlacao": {
    "idade": {"idade": 1.0, "colesterol": 0.8, ...},
    ...
  },
  "insights": {
    "correlacao_idade_risco": 0.85,
    "correlacao_colesterol_risco": 0.92,
    "correlacao_pressao_risco": 0.88
  }
}
```

#### 2. Análise por Risco
```
GET http://localhost:8000/api/saude/analise-risco/
```

**Retorna:**
```json
{
  "risco_baixo": {
    "quantidade": 2,
    "idade_media": 33.5,
    "colesterol_medio": 175.0,
    "pressao_media": 117.5
  },
  "risco_alto": {
    "quantidade": 2,
    "idade_media": 47.5,
    "colesterol_medio": 240.0,
    "pressao_media": 147.5
  },
  "diferencas": {
    "idade": 14.0,
    "colesterol": 65.0,
    "pressao": 30.0
  }
}
```

#### 3. Dados Completos
```
GET http://localhost:8000/api/saude/dados/
```

---

## 🌐 Testando no Navegador

### Método 1: **Navegador (mais fácil)**

1. Abra o navegador
2. Digite na barra de endereço:
   ```
   http://localhost:8000/api/energia/rendimento/
   ```
3. Você verá o JSON formatado!

### Método 2: **Interface do Django REST Framework**

O Django REST Framework fornece uma interface web linda para testar APIs:

1. Acesse qualquer endpoint no navegador
2. Você verá uma página estilizada com:
   - JSON formatado
   - Formulário para fazer requisições
   - Status code da resposta

### Método 3: **PowerShell/CMD**

```powershell
# Testar endpoint de energia
Invoke-WebRequest -Uri "http://localhost:8000/api/energia/rendimento/" | Select-Object -Expand Content

# Testar endpoint de saúde
Invoke-WebRequest -Uri "http://localhost:8000/api/saude/correlacao/" | Select-Object -Expand Content
```

### Método 4: **Postman / Insomnia / Thunder Client (VS Code)**

1. Instale a extensão **Thunder Client** no VS Code
2. Crie nova requisição GET
3. URL: `http://localhost:8000/api/energia/rendimento/`
4. Clique em "Send"

---

## 🧪 Testes Sistemáticos

### Teste cada endpoint nesta ordem:

```bash
# 1. Energia - Rendimento
curl http://localhost:8000/api/energia/rendimento/

# 2. Energia - Correlação
curl http://localhost:8000/api/energia/correlacao/

# 3. Energia - Dados Completos
curl http://localhost:8000/api/energia/dados/

# 4. Saúde - Correlação
curl http://localhost:8000/api/saude/correlacao/

# 5. Saúde - Análise de Risco
curl http://localhost:8000/api/saude/analise-risco/

# 6. Saúde - Dados Completos
curl http://localhost:8000/api/saude/dados/
```

---

## ⚠️ Possíveis Erros e Soluções

### **Erro: "No module named 'rest_framework'"**

**Solução:**
```bash
pip install djangorestframework django-cors-headers
```

### **Erro: "Table doesn't exist"**

**Solução:**
```bash
python manage.py migrate
```

### **Erro: "File not found" ao acessar endpoints**

**Solução:**
- Verifique se os arquivos CSV estão em `backend/../dados/`
- Estrutura correta:
  ```
  UBD/
  ├── backend/
  │   └── manage.py
  └── dados/
      ├── painel_solar.csv
      └── risco_cardiaco.csv
  ```

### **Erro: CORS block no frontend**

**Solução:**
- Verifique se o middleware do CORS está **antes** do CommonMiddleware
- Confirme que `http://localhost:5173` está em `CORS_ALLOWED_ORIGINS`

---

## 🎨 Próximo Passo: Conectar ao Frontend

### No componente React `Energia.jsx`:

```jsx
import React, { useEffect, useState } from "react";

export default function Energia() {
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/energia/rendimento/')
      .then(response => {
        if (!response.ok) throw new Error('Erro na requisição');
        return response.json();
      })
      .then(data => {
        setDados(data);
        setLoading(false);
      })
      .catch(error => {
        setErro(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8 text-white">Carregando...</div>;
  if (erro) return <div className="p-8 text-red-500">Erro: {erro}</div>;

  return (
    <div className="p-8 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-6">
        Análise de Energia Solar
      </h1>
      
      {/* Estatísticas */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-400 text-sm">Rendimento Médio</p>
          <p className="text-2xl font-bold text-white">
            {dados.estatisticas.rendimento_medio}%
          </p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-400 text-sm">Rendimento Máximo</p>
          <p className="text-2xl font-bold text-green-500">
            {dados.estatisticas.rendimento_maximo}%
          </p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-400 text-sm">Hora Pico</p>
          <p className="text-2xl font-bold text-yellow-500">
            {dados.estatisticas.hora_pico}h
          </p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-400 text-sm">Potência Máxima</p>
          <p className="text-2xl font-bold text-blue-500">
            {dados.estatisticas.potencia_max} kW
          </p>
        </div>
      </div>

      {/* Tabela de Dados */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          Dados por Hora
        </h2>
        <table className="w-full text-white">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left p-2">Hora</th>
              <th className="text-left p-2">Temperatura (°C)</th>
              <th className="text-left p-2">Radiação (W/m²)</th>
              <th className="text-left p-2">Potência (kW)</th>
              <th className="text-left p-2">Rendimento (%)</th>
            </tr>
          </thead>
          <tbody>
            {dados.dados_brutos.map((item, index) => (
              <tr key={index} className="border-b border-gray-700">
                <td className="p-2">{item.hora}h</td>
                <td className="p-2">{item.temperatura_c}</td>
                <td className="p-2">{item.radiacao_wm2}</td>
                <td className="p-2">{item.potencia_kw}</td>
                <td className="p-2">{item.percentual_rendimento.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

---

## ✅ Checklist Final

Antes de considerar completo, teste:

- [ ] Servidor Django iniciando sem erros
- [ ] Endpoint `/api/energia/rendimento/` retorna JSON válido
- [ ] Endpoint `/api/energia/correlacao/` retorna JSON válido
- [ ] Endpoint `/api/energia/dados/` retorna JSON válido
- [ ] Endpoint `/api/saude/correlacao/` retorna JSON válido
- [ ] Endpoint `/api/saude/analise-risco/` retorna JSON válido
- [ ] Endpoint `/api/saude/dados/` retorna JSON válido
- [ ] Frontend consegue fazer requisições sem erro CORS
- [ ] Dados são exibidos corretamente no frontend

---

## 📚 Próximas Melhorias (Opcionais)

1. **Cache**: Cachear resultados para não processar CSV toda vez
2. **Paginação**: Se tiver muitos dados no futuro
3. **Filtros**: Permitir filtrar por hora, data, etc
4. **WebSockets**: Para atualizações em tempo real
5. **Testes Automatizados**: Criar testes unitários
6. **Documentação**: Gerar documentação automática da API (Swagger/OpenAPI)

---

## 🎉 Parabéns!

Você agora tem um backend Django completo e funcional com:
- ✅ 2 APIs REST funcionais
- ✅ 6 endpoints documentados
- ✅ Análise de dados com Pandas
- ✅ CORS configurado
- ✅ Pronto para conectar ao React

**Me chame quando precisar de ajuda com erros ou melhorias!** 🚀
