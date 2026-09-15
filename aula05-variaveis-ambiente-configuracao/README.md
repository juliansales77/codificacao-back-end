# Aula 05 - Variáveis de Ambiente e Configuração

Este projeto foi desenvolvido como parte do módulo de **Codificação Back-End**, abordando o uso da biblioteca `dotenv` para gerenciar variáveis de ambiente de forma segura, evitando a exposição de credenciais sensíveis no repositório.

---

## 📁 Estrutura do Projeto (`aula05-variaveis-ambiente-configuracao`)

```text
aula05-variaveis-ambiente-configuracao/
├── .env                # Arquivo local com valores reais (ignorado pelo Git)
├── .env.example        # Modelo público com a estrutura das variáveis esperadas
├── index.js            # Script principal com leitura e validação de variáveis
├── package.json        # Configuração do projeto e dependência do dotenv
└── README.md           # Documentação do projeto
```

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** (v18+)
- **ES Modules (`import/export`)**
- **dotenv** (v17.4+)

---

## ⚙️ Configuração do Ambiente

1. **Copie o arquivo de exemplo para criar o seu `.env` local:**
   ```bash
   cp .env.example .env
   ```

2. **Edite o arquivo `.env` com os valores desejados:**
   ```env
   PORT=3000
   API_KEY_PAGAMENTO=sk_live_998877766554433221100
   DATABASE_URL=mongodb://localhost:27017/meu_banco
   ```

---

## 🚀 Scripts e Códigos

### 1. `package.json`

```json
{
  "name": "aula05-variaveis-ambiente-configuracao",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo "Error: no test specified" && exit 1",
    "start": "node index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module",
  "dependencies": {
    "dotenv": "^17.4.2"
  }
}
```

---

### 2. `index.js`

```javascript
import dotenv from 'dotenv';

dotenv.config();

function iniciarAplicacao() {
  const porta = process.env.PORT || 8080;
  const apiKey = process.env.API_KEY_PAGAMENTO;
  const dbUrl = process.env.DATABASE_URL;

  if (!apiKey) {
    console.error('ERRO CRÍTICO: a chave API_KEY_PAGAMENTO não está definida nas variáveis de ambiente');
    process.exit(1);
  }

  console.log('=== SERVIÇO DE CONFIGURAÇÃO CARREGADO ===');
  console.log(`Servidor Rodando na porta: ${porta}`);
  console.log(`Conexão Banco de dados: ${dbUrl}`);
  console.log(`Status da API de Pagamento: chave de tamanho ${apiKey.length} autenticada.`);
}

iniciarAplicacao();
```

---

## 🔒 Segurança (`.gitignore`)

Para garantir que informações confidenciais não sejam enviadas ao repositório remoto, adicione as seguintes regras ao arquivo `.gitignore` na raiz do projeto:

```text
.env
node_modules/
*.log
```

---

## 💡 Conceitos Chave Aprendidos

1. **Segurança de Credenciais:** Chaves de API, segredos de autenticação e strings de conexão de banco de dados devem ser carregados via `process.env` e nunca escritos diretamente no código (*hardcoded*).
2. **Validação Early-Exit:** O encerramento imediato do processo com `process.exit(1)` impede a aplicação de subir em estado inconsistente caso uma variável obrigatória (`API_KEY_PAGAMENTO`) não esteja definida.
3. **Valores Padrão (Fallback):** Uso de valores alternativos (`process.env.PORT || 8080`) para garantir o funcionamento do ambiente caso uma variável opcional não seja declarada.