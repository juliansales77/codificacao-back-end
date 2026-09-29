# 🛠️ Aula 13 — Middlewares e Interceptors com NestJS

Projeto desenvolvido durante a aula sobre **Middlewares** e **Interceptors** no NestJS, demonstrando como interceptar requisições HTTP, registrar logs no console e aplicar regras de autorização em rotas administrativas.

---

## 📚 Conteúdo da Aula

Nesta aula foram trabalhados os seguintes conceitos:

- **Middleware no NestJS:** Implementação da interface `NestMiddleware`.
- **Injeção de Dependências:** Uso do decorador `@Injectable()`.
- **Express Objects:** Manipulação de `Request`, `Response` e `NextFunction`.
- **Inspeção de Requisições:** Leitura de métodos, rotas (`req.method`, `req.path`) e cabeçalhos HTTP (`req.headers`).
- **Controle de Acesso:** Validação de perfil de usuário e retorno de código `403 Forbidden`.
- **Configuração Global:** Registro de middlewares no `AppModule` utilizando `.forRoutes('*')`.

> ⚠️ **Observação:** Apesar do nome da aula mencionar *interceptors*, o foco prático principal deste projeto é a implementação de **Middlewares**.

---

## 🛠️ Tecnologias Utilizadas

- **Framework:** NestJS
- **Linguagem:** TypeScript
- **Engine HTTP:** Express
- **Gerenciador de Pacotes:** npm

---

## 📁 Estrutura do Projeto

```text
aula-13-middlewares-interceptors-nestjs/
├── src/
│   ├── logger/
│   │   ├── logger.middleware.spec.ts
│   │   └── logger.middleware.ts
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
├── package.json
└── README.md
🔐 Regras de Autorização e LogsLog de RequisiçõesTodas as requisições enviadas ao servidor geram um log automático no terminal:Plaintext[LOG] Método = GET | Rota = /
[LOG] Método = GET | Rota = /admin
Controle de Acesso AdministrativoAo acessar a rota /admin, o LoggerMiddleware valida o cabeçalho x-user-role:RotaCabeçalho x-user-roleResposta HTTPMensagem de RetornoGET /(Não exigido)200 OK"Rota Publica acessada com sucesso"GET /admin(Ausente ou incorreto)403 Forbidden"Acesso Negado: Privilégio Supervisor Necessário"GET /adminsupervisor200 OK"Bem-vindo ao Painel administrativo"🔄 Fluxo da RequisiçãoPlaintextCliente ──► Requisição HTTP ──► LoggerMiddleware ──► [Log de Método e Rota]
                                       │
                                Rota /admin?
                                 ┌─────┴─────┐
                                NÃO         SIM
                                 │           │
                                 │     Valida x-user-role
                                 │     ┌─────┴─────┐
                                 │  supervisor   outro perfil
                                 │     │           │
                                 ▼     ▼           ▼
                               next() next()  403 Forbidden
                                 │     │
                                 ▼     ▼
                              Controller ──► Resposta HTTP
🧩 Middleware vs. InterceptorRecursoMomento de ExecuçãoCasos de Uso PrincipaisMiddlewareAntes do Controller / HandlersLogs globais, autenticação básica, manipulação direta de req/res.InterceptorAntes e Depois da execução do ControllerTransformação de respostas, medição de tempo de execução, caching.🚀 Como Executar e TestarInstalar as dependências:Bashnpm install
Executar em modo de desenvolvimento:Bashnpm run start:dev
Testar os Endpoints:Rota Pública: GET http://localhost:3000/Rota Protegida (Sem permissão): GET http://localhost:3000/adminRota Protegida (Com permissão): GET http://localhost:3000/admin com o Header x-user-role: supervisor