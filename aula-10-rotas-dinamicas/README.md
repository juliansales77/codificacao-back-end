# 🚀 Aula 10: Rotas Dinâmicas e Tratamento de Exceções (NestJS)

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Node.JS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

Este módulo aborda o uso de **Rotas Dinâmicas** no framework **NestJS**, utilizando parâmetros de rota (`@Param`), validação de tipos com `ParseIntPipe`, e tratamento de exceções HTTP com a classe `NotFoundException`.

---

## 📋 Endpoints da API

| Método | Endpoint | Descrição | Status HTTP |
| :--- | :--- | :--- | :--- |
| `GET` | `/status` | Retorna o status de execução do servidor | `200 OK` |
| `GET` | `/livros/:id` | Busca um livro específico pelo seu ID | `200 OK` / `400 Bad Request` / `404 Not Found` |

---

## 📸 Testes e Respostas no Insomnia

### 1. Consulta de Livro por ID Existente (`GET /livros/1`)
- **Descrição:** Requisição enviando um ID numérico válido registrado no acervo (`id: 1`).
- **Resposta HTTP:** `200 OK`

```json
{
  "id": 1,
  "titulo": "O Senhor dos Anéis",
  "autor": "J.R.R Tolkien"
}
```

---

### 2. Consulta de Livro por ID Inexistente (`GET /livros/99`)
- **Descrição:** Requisição com ID numérico válido, porém inexistente na base de dados. Lança uma exceção do tipo `NotFoundException`.
- **Resposta HTTP:** `404 Not Found`

```json
{
  "message": "Livro com ID 99 não localizado em nosso acervo",
  "error": "Not Found",
  "statusCode": 404
}
```

---

### 3. Validação de Parâmetro Inválido (`GET /livros/abc`)
- **Descrição:** Requisição enviando uma string não numérica (`abc`). O pipe de validação `ParseIntPipe` intercepta e bloqueia a requisição antes do controller.
- **Resposta HTTP:** `400 Bad Request`

```json
{
  "message": "Validation failed (numeric string is expected)",
  "error": "Bad Request",
  "statusCode": 400
}
```

---

## 📂 Estrutura do Código-Fonte

### `src/livros.service.ts`
Gerencia a regra de negócio do acervo e lança a exceção `NotFoundException` quando o ID não é localizado:

```typescript
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class LivrosService {
  private livros = [
    { id: 1, titulo: 'O Senhor dos Anéis', autor: 'J.R.R Tolkien' },
    { id: 2, titulo: '1984', autor: 'George Orwell' },
    { id: 3, titulo: 'Dom Casmurro', autor: 'Machado de Assis' },
    { id: 4, titulo: 'O Príncipe', autor: 'Nicolau Machiavelli' },
  ];

  encontrarPorId(id: number) {
    const livro = this.livros.find((livro) => livro.id === id);
    if (!livro) {
      throw new NotFoundException(`Livro com ID ${id} não localizado em nosso acervo`);
    }
    return livro;
  }
}
```

---

### `src/app.controller.ts` & `src/app.service.ts`
Endpoint base da aplicação responsável pela rota `/status`:

```typescript
// app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller('status')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```

```typescript
// app.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Status: Servidor Ativo!';
  }
}
```

---

### `src/app.module.ts`
Módulo principal declarando os controllers e providers do sistema:

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { LivrosController } from './livros.controller.js';
import { LivrosService } from './livros.service.js';

@Module({
  imports: [],
  controllers: [AppController, LivrosController],
  providers: [AppService, LivrosService],
})
export class AppModule {}
```

---

## 📂 Estrutura de Diretórios

```text
aula-10-rotas-dinamicas/
├── src/
│   ├── app.controller.ts     # Controller do status da aplicação
│   ├── app.module.ts         # Módulo raiz do NestJS
│   ├── app.service.ts        # Serviço de status
│   ├── livros.controller.ts  # Route Handlers (@Param, ParseIntPipe)
│   ├── livros.service.ts     # Lógica de acervo e exceções HTTP
│   └── main.ts               # Ponto de entrada da aplicação
├── nest-cli.json
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚡ Como Executar Localmente

1. **Acesse o diretório da aula:**
   ```bash
   cd aula-10-rotas-dinamicas
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run start:dev
   ```

4. **Executar testes via Insomnia/Postman:**
   - Status: `GET http://localhost:3000/status`
   - Buscar Livro (200 OK): `GET http://localhost:3000/livros/1`
   - Buscar Livro (404 Not Found): `GET http://localhost:3000/livros/99`
   - Validação de ID (400 Bad Request): `GET http://localhost:3000/livros/abc`