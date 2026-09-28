# 🛡️ Aula 12 — Request & Response Avançado (Segurança com API Key)

Esta aplicação desenvolvida em **NestJS** exemplifica a manipulação avançada de requisições e respostas HTTP, focando-se no controlo de acesso a rotas através de validação do cabeçalho (*Header*) `x-api-key`.

---

## 🚀 Funcionalidades

- **Endpoint Público:** Consulta rápida do estado do servidor via `GET /status`.
- **Controlo de Acesso:** Proteção da rota `GET /secreto` através de verificação de cabeçalho.
- **Validação de API Key:** Acesso permitido apenas mediante envio do valor correto para a chave `x-api-key`.
- **Tratamento de Exceções:** Retorno condicional de erro HTTP `403 Forbidden` em caso de ausência ou invalidade da chave.

---

## 🛠️ Tecnologias Utilizadas

- **Framework:** [NestJS](https://nestjs.com/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Plataforma:** [Node.js](https://nodejs.org/)
- **Testes de API:** [Insomnia](https://insomnia.rest/)

---

## 🔑 Parâmetros de Autenticação

Para aceder ao conteúdo restrito, adicione o seguinte elemento aos **Headers** do seu pedido:

| Cabeçalho (*Header*) | Valor Obrigatório |
| :--- | :--- |
| `x-api-key` | `SENAI-2026` |

---

## 📬 Endpoints da API

### 1. Verificar Estado do Servidor
- **Rota:** `GET /status`
- **Autenticação:** Nenhuma (Acesso público)
- **Resposta (`200 OK`):**
  ```text
  Status: Servidor Ativo!!!
2. Aceder a Conteúdo Secreto
Rota: GET /secreto

Autenticação: Requer x-api-key: SENAI-2026 nos Headers.

🟢 Resposta de Sucesso (200 OK):
JSON


{
  "mensagem": "Acesso concedido ao conteudo secreto!",
  "timestamp": "2026-09-28T18:03:47.588Z"
}
🔴 Resposta de Erro (403 Forbidden):
JSON


{
  "erro": "Forbidden",
  "mensagem": "Chave de api invalida ou ausente"
}