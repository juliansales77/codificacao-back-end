# 🚀 Aula 15: Tratamento de Erros e Status Codes (NestJS)

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Node.JS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

Este módulo aborda o **tratamento de exceções HTTP** e registro de logs no **NestJS**, utilizando as classes `BadRequestException`, `NotFoundException` e o `Logger` nativo da aplicação.

---

## 📋 Endpoints da API

| Método | Endpoint | Descrição | Status HTTP |
| :--- | :--- | :--- | :--- |
| `GET` | `/status` | Retorna o status de execução da aplicação | `200 OK` |
| `GET` | `/produtos` | Retorna a lista completa de produtos | `200 OK` |
| `GET` | `/produtos/:id` | Busca um produto específico por ID | `200 OK` / `400 Bad Request` / `404 Not Found` |

---

## 📸 Testes e Respostas no Thunder Client

### 1. Consulta por ID Válido (`GET /produtos/2`)
- **Descrição:** Requisição enviando um ID numérico válido registrado na lista (`id: 2`).
- **Resposta HTTP:** `200 OK`

```json
{
  "id": 2,
  "nome": "Mouse Gamer",
  "preco": 99.99
}
```

---

### 2. Consulta por ID Inexistente (`GET /produtos/99`)
- **Descrição:** ID numérico válido, porém não encontrado no acervo. Lança `NotFoundException` e gera um log de aviso (`WARN`).
- **Resposta HTTP:** `404 Not Found`

```json
{
  "message": "Produto com ID 99 não encontrdo. ",
  "error": "Not Found",
  "statusCode": 404
}
```

---

### 3. Validação de Parâmetro Inválido (`GET /produtos/abc`)
- **Descrição:** Requisição enviando uma string não numérica (`abc`). Lança `BadRequestException` e gera log de aviso (`WARN`).
- **Resposta HTTP:** `400 Bad Request`

```json
{
  "message": "Id inválido. Deve ser um número inteiro",
  "error": "Bad Request",
  "statusCode": 400
}
```

---

## 📂 Estrutura do Código-Fonte

### `src/produtos.controller.ts`
Realiza a validação do ID, o registro de logs com `Logger` e o lançamento das exceções HTTP:

```typescript
import { Controller, Get, Param, BadRequestException, NotFoundException, Logger } from '@nestjs/common';
import { ProdutosService } from './produtos.service';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Get()
  produtos() {
    return this.produtosService.listarProdutos();
  }

  private readonly logger = new Logger(ProdutosController.name);

  @Get(':id')
  idProduto(@Param('id') idProd: string) {
    const id = Number(idProd);

    if (isNaN(id)) {
      this.logger.warn(`Tentativa de buscar com ID não numérico: ${idProd}`);
      throw new BadRequestException('Id inválido. Deve ser um número inteiro');
    }

    const produto = this.produtosService.produtos().find((produto) => produto.id === id);
    if (!produto) {
      this.logger.warn(`Produto com ID ${id} não localizado.`);
      throw new NotFoundException(`Produto com ID ${id} não encontrdo. `);
    }

    return produto;
  }
}
```

---

### `src/produtos.service.ts`
Fornece os dados em memória e o método de listagem:

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProdutosService {
  produtos = [
    { id: 1, nome: 'Teclado Mecanico', preco: 199.99 },
    { id: 2, nome: 'Mouse Gamer', preco: 99.99 },
    { id: 3, nome: 'Monitor 144Hz', preco: 899.99 },
    { id: 4, nome: 'Headset RGB', preco: 149.99 },
    { id: 5, nome: 'Cadeira Gamer', preco: 499.99 },
  ];

  listarProdutos() {
    return this.produtos;
  }
}
```

---

### `src/app.module.ts`
Declaração dos módulos, controllers e serviços:

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ProdutosController } from './produtos.controller.js';
import { ProdutosService } from './produtos.service.js';

@Module({
  imports: [],
  controllers: [AppController, ProdutosController],
  providers: [AppService, ProdutosService],
})
export class AppModule {}
```

---

## 📂 Estrutura de Diretórios

```text
aula-15-tratamento-erros-status-codes/
├── src/
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── main.ts
│   ├── produtos.controller.ts
│   └── produtos.service.ts
├── test/
├── nest-cli.json
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚡ Como Executar Localmente

1. **Acesse a pasta do projeto:**
   ```bash
   cd aula-15-tratamento-erros-status-codes
   ```


2. **Inicie o servidor em modo de desenvolvimento:**
   ```bash
   npm run start:dev
   ```

3. **Testar as rotas no Thunder Client / Postman:**
   - Listar Produtos: `GET http://localhost:3000/produtos`
   - Buscar Produto Existente: `GET http://localhost:3000/produtos/2`
   - Produto Inexistente (404): `GET http://localhost:3000/produtos/99`
   - Parâmetro Inválido (400): `GET http://localhost:3000/produtos/abc`