# Aula 06 - Servidor Web com Módulo HTTP Nativo

Este projeto foi desenvolvido como parte do módulo de **Codificação Back-End**, focando na criação de um servidor web utilizando o módulo nativo `http` do Node.js, sem a necessidade de frameworks externos como o Express.

---

## 📁 Estrutura do Projeto (`aula06-servidor-web-http`)

```text
aula06-servidor-web-http/
├── index.js            # Servidor HTTP nativo com gerenciamento de rotas e headers
├── package.json        # Configurações do projeto Node.js (ES Modules)
└── README.md           # Documentação do projeto
```

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** (v18+)
- **Módulo Nativo `http`** (sem dependências externas)
- **ES Modules (`import/export`)**

---

## 🚀 Como Executar o Projeto

1. **Navegue até a pasta do projeto:**
   ```bash
   cd aula06-servidor-web-http
   ```

2. **Execute o servidor:**
   ```bash
   node index.js
   ```

3. O terminal exibirá a mensagem:
   > `Sentinela ativo na porta 3000`

---

## 📡 Endpoints Disponíveis

| Método | Rota | Descrição | Resposta (JSON) | Status |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/status` | Retorna o estado operacional do servidor | `{"servidor": "Online"}` | `200 OK` |
| **GET** | `/*` | Rota padrão para recursos não encontrados | `{"servidor": "Pagina não encontrada"}` | `404 Not Found` |

---

## 🔒 Headers de Segurança Aplicados

O servidor injeta cabeçalhos de resposta padrão (*Security Headers*) em todas as requisições:

- **`X-Content-Type-Options: nosniff`**: Impede que o navegador adivinhe (*MIME-sniffing*) o tipo de conteúdo emitido.
- **`X-Frame-Options: DENY`**: Protege a aplicação contra ataques de *Clickjacking*, proibindo a renderização dentro de `<frame>`, `<iframe>` ou `<object>`.

---

## 💡 Conceitos Aprendidos

1. **Criação de Servidores Nativo (`http.createServer`):** Manipulação direta de requisições HTTP (`http.IncomingMessage`) e respostas (`http.ServerResponse`).
2. **Inspeção de Logs:** Monitoramento em tempo real do método e da URL requisitada (`req.method` e `req.url`).
3. **Gerenciamento de Headers e Status HTTP:** Definição manual de códigos de status (`200`, `404`) e cabeçalhos com `res.writeHead()`.