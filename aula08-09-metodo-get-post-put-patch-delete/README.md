# 🚀 Aula 08-09: Route Handlers (Métodos GET, POST, PATCH e DELETE)

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Node.JS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

Este módulo aborda o aprofundamento prático na construção de **Route Handlers** no framework **NestJS**, integrando operações CRUD completas com o **`ConvidadosService`**, envio de payloads estruturados e tratamento de respostas HTTP utilizando **GET**, **POST**, **PATCH** e **DELETE**.

---

## 📋 Endpoints da API

| Método | Endpoint | Descrição | Status HTTP |
| :--- | :--- | :--- | :--- |
| `GET` | `/status` | Retorna o status de execução da API | `200 OK` |
| `GET` | `/convidados` | Lista todos os convidados cadastrados | `200 OK` |
| `POST` | `/convidados` | Cadastra um novo convidado | `201 Created` |
| `PATCH` | `/convidados/:id` | Atualiza a idade de um convidado pelo ID | `200 OK` |
| `DELETE` | `/convidados/:id` | Remove o convidado especificado pelo ID | `204 No Content` |

---

## 🛠️ Detalhamento das Rotas e Respostas Reais (Insomnia)

### 🔹 1. Rota de Status (`GET /status`)
- **Descrição:** Endpoint de diagnóstico para validar se a aplicação está ativa.
- **Resposta:**
  ```text
  Status: Ativo!
  ```

---

### 🔹 2. Listar Convidados (`GET /convidados`)
- **Descrição:** Retorna a lista completa de convidados registados em memória.
- **Resposta HTTP 200 OK:**
  ```json
  [
    {
      "id": 1,
      "nome": "Alice",
      "idade": 23
    },
    {
      "id": 2,
      "nome": "Enzo",
      "idade": 30
    },
    {
      "id": 3,
      "nome": "Jamily",
      "idade": 20
    },
    {
      "id": 4,
      "nome": "Alessandra",
      "idade": 18
    }
  ]
  ```

---

### 🔹 3. Adicionar Convidado (`POST /convidados`)
- **Descrição:** Processa o registo de um novo convidado recebido via body.
- **Corpo da Requisição (Payload):**
  ```json
  {
    "nome": "Julian",
    "idade": 23
  }
  ```
- **Resposta HTTP 201 Created:**
  ```json
  {
    "mansagen": "Convidado Julian adicionado com sucesso",
    "dados": {
      "nome": "Julian",
      "idade": 23
    }
  }
  ```

---

### 🔹 4. Atualizar Idade (`PATCH /convidados/:id`)
- **Descrição:** Atualiza a idade do convidado especificado no parâmetro de rota.
- **Exemplo de Rota:** `PATCH http://localhost:3000/convidados/2`
- **Corpo da Requisição (Payload):**
  ```json
  {
    "idade": 30
  }
  ```
- **Resposta HTTP 200 OK:**
  ```json
  {
    "id": 2,
    "nome": "Enzo",
    "idade": 30
  }
  ```

---

### 🔹 5. Remover Convidado (`DELETE /convidados/:id`)
- **Descrição:** Remove o convidado associado ao ID indicado na URL.
- **Exemplo de Rota:** `DELETE http://localhost:3000/convidados/5`
- **Resposta HTTP 204 No Content:** *(Sem corpo de resposta)*

---

## 🖥️ Logs de Execução do Servidor (Terminal)

```text
[Nest] 9760 - LOG [NestFactory] Starting Nest application...
[Nest] 9760 - LOG [InstanceLoader] AppModule dependencies initialized +4ms
[Nest] 9760 - LOG [RoutesResolver] AppController {/status}: +4ms
[Nest] 9760 - LOG [RouterExplorer] Mapped {/status, GET} route +2ms
[Nest] 9760 - LOG [RoutesResolver] ConvidadosController {/convidados}: +0ms
[Nest] 9760 - LOG [RouterExplorer] Mapped {/convidados, GET} route +0ms
[Nest] 9760 - LOG [RouterExplorer] Mapped {/convidados, POST} route +1ms
[Nest] 9760 - LOG [RouterExplorer] Mapped {/convidados/:id, PATCH} route +0ms
[Nest] 9760 - LOG [RouterExplorer] Mapped {/convidados/:id, DELETE} route +0ms
[Nest] 9760 - LOG [NestApplication] Nest application successfully started +1ms
[OPERADOR]: Novo convidado recebido: [object Object]
[ADMINISTRADOR]: Atualizando a idade do ID 2
[ADMINISTRADOR]: Removendo Convidado ID: 5
```

---

## 📂 Estrutura do Módulo

```text
aula08-09-metodo-get-post-put-patch-delete/
├── src/
│   ├── dto/
│   │   └── criar-convidado.dto.ts   # Data Transfer Object (validação)
│   ├── app.controller.ts            # Controller da rota de status
│   ├── app.module.ts                # Módulo principal da aplicação
│   ├── app.service.ts               # Serviço de status
│   ├── convidados.controller.ts     # Handlers de rotas HTTP (GET, POST, PATCH, DELETE)
│   ├── convidados.service.ts        # Armazenamento e regras de negócio
│   └── main.ts                      # Ficheiro de inicialização (bootstrap)
├── nest-cli.json
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚡ Como Executar Localmente

1. **Aceda à pasta do módulo:**
   ```bash
   cd aula08-09-metodo-get-post-put-patch-delete
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor em modo de desenvolvimento:**
   ```bash
   npm run start:dev
   ```

4. **Testar endpoints no Insomnia:** `http://localhost:3000/convidados`




















# 🚀 Aula 08-09: Route Handlers (Métodos GET, POST, PATCH e DELETE)

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Node.JS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

Este módulo aborda o aprofundamento prático na construção e manipulação de **Route Handlers** no framework **NestJS**, integrando operações de CRUD completas com **`ConvidadosService`**, tratamento de exceções com `NotFoundException` e mapeamento dos verbos HTTP **GET**, **POST**, **PATCH** e **DELETE**.

---

## 📋 Endpoints da API

| Método | Endpoint | Descrição | Status HTTP |
| :--- | :--- | :--- | :--- |
| `GET` | `/status` | Retorna o status de execução da API | `200 OK` |
| `GET` | `/convidados` | Lista todos os convidados cadastrados em memória | `200 OK` |
| `POST` | `/convidados` | Processa e cadastra um novo convidado | `201 Created` |
| `PATCH` | `/convidados` | Atualiza a idade do convidado informado por ID | `200 OK` |
| `DELETE` | `/convidados/:id` | Remove o convidado especificado pelo ID | `204 No Content` |

---

## 🛠️ Detalhamento das Rotas e Exemplos com Dados

### 🔹 1. Rota de Status (`GET /status`)
- **Descrição:** Endpoint de verificação e diagnóstico de saúde do servidor.
- **Resposta:**
  ```text
  Status: Ativo!
  ```

---

### 🔹 2. Listar Convidados (`GET /convidados`)
- **Descrição:** Obtém a relação completa de convidados através do `ConvidadosService`.
- **Resposta:**
  ```json
  [
    { "id": 1, "nome": "Alice", "idade": 23 },
    { "id": 2, "nome": "Enzo", "idade": 19 },
    { "id": 3, "nome": "Jamily", "idade": 20 },
    { "id": 4, "nome": "Alessandra", "idade": 18 },
    { "id": 5, "nome": "Hudson", "idade": 21 }
  ]
  ```

---

### 🔹 3. Adicionar Convidado (`POST /convidados`)
- **Descrição:** Recebe os dados do novo convidado no corpo da requisição e retorna o comprovante de cadastro.
- **Corpo da Requisição (Payload):**
  ```json
  {
    "nome": "Amanda",
    "idade": 25
  }
  ```
- **Resposta Esperada:**
  ```json
  {
    "mansagen": "Convidado Amanda adicionado com sucesso",
    "dados": {
      "nome": "Amanda",
      "idade": 25
    }
  }
  ```

---

### 🔹 4. Atualizar Idade (`PATCH /convidados`)
- **Descrição:** Atualiza parcialmente a idade do convidado identificado pelo ID passado no parâmetro do método.
- **Corpo da Requisição (Payload):**
  ```json
  {
    "idade": 24
  }
  ```
- **Resposta de Sucesso:**
  ```json
  {
    "id": 1,
    "nome": "Alice",
    "idade": 24
  }
  ```

---

### 🔹 5. Remover Convidado (`DELETE /convidados/:id`)
- **Descrição:** Exclui o convidado associado ao ID repassado na URL. Lança `NotFoundException` caso o ID não seja encontrado.
- **Exemplo de URL:** `DELETE /convidados/2`
- **Status de Resposta:** `204 No Content`

---

## 📂 Estrutura do Módulo

```text
aula08-09-metodo-get-post-put-patch-delete/
├── src/
│   ├── dto/
│   │   └── criar-convidado.dto.ts   # DTO para validação de payload
│   ├── app.controller.ts            # Controller da rota de status
│   ├── app.module.ts                # Módulo principal da aplicação
│   ├── app.service.ts               # Serviço de status
│   ├── convidados.controller.ts     # Handlers de rotas HTTP (GET, POST, PATCH, DELETE)
│   ├── convidados.service.ts        # Armazenamento em memória e lógica de negócio
│   └── main.ts                      # Bootstrap e inicialização do NestJS
├── nest-cli.json
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🧬 Decorators e Exceções Utilizados

* **`@Injectable()`**: Marca o serviço para injeção de dependência no NestJS.
* **`NotFoundException`**: Exceção nativa do NestJS que lança erro HTTP `404` se o ID não for localizado.
* **`@Controller()`**, **`@Get()`**, **`@Post()`**, **`@Patch()`**, **`@Delete()`**: Mapeadores das rotas e verbos HTTP.
* **`@Param()`** e **`@Body()`**: Decorators para extrair parâmetros de rota e corpo da requisição.
* **`@HttpCode()`**: Define o código de status HTTP retornado na resposta (ex: `204`).

---

## ⚡ Como Executar Localmente

1. **Navegue até a pasta do módulo:**
   ```bash
   cd aula08-09-metodo-get-post-put-patch-delete
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run start:dev
   ```

4. **Acesse a API em:** `http://localhost:3000/convidados`


