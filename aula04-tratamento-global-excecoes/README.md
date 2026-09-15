# Aula 04 - Middleware e Validações no Express

Este projeto foi desenvolvido como parte do módulo de **Codificação Back-End**, focando na implementação de **Middlewares**, sanitização/validação de dados de entrada e estrutura de rotas com **Express.js**.

---

## 📁 Estrutura do Projeto (`aula05-middlewares-validacoes`)

```text
aula05-middlewares-validacoes/
├── src/
│   ├── controllers/      # Lógica de controle das requisições
│   ├── middlewares/      # Middlewares de validação, autenticação e logs
│   ├── routes/           # Definição e organização das rotas da aplicação
│   └── app.js            # Configuração principal da aplicação Express
├── package.json          # Dependências do projeto (Express, Express-Validator, etc.)
└── README.md             # Documentação do projeto
```

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** (v18+)
- **Express.js** (v5.x / v4.x)
- **ES Modules (`import/export`)**
- **express-validator** (para validação e sanitização de dados)

---

## 🚀 Como Executar o Projeto

1. **Instalar as dependências:**
   ```bash
   npm install
   ```

2. **Iniciar o servidor de desenvolvimento:**
   ```bash
   npm start
   ```
   ou
   ```bash
   npm run dev
   ```

---

## 💡 Conceitos Abordados

1. **Conceito de Middleware**:
   - Funções que têm acesso ao objeto de requisição (`req`), objeto de resposta (`res`) e à próxima função middleware no ciclo de solicitação-resposta da aplicação (`next`).
   - Utilizados para validação de payload, verificação de autenticação, geração de logs de requisição, manipulação de headers e tratamento de erros.

2. **Validação de Entrada (`express-validator`)**:
   - Sanitização de dados recebidos via `req.body`, `req.params` e `req.query`.
   - Garantia de integridade dos dados antes que alcancem as camadas internas da aplicação (controllers/services).

3. **Arquitetura em Camadas**:
   - Divisão clara de responsabilidades entre Rotas, Middlewares e Controllers.