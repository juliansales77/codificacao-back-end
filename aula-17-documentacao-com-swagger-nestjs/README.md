# 🚀 Aula 17: Documentação de APIs com Swagger (NestJS)

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)

Este módulo aborda a integração do **Swagger (OpenAPI)** no **NestJS** (`@nestjs/swagger`) para geração automática e interativa de documentação técnica para APIs RESTful, com inclusão de esquemas de DTO (`@ApiProperty`), especificações de autenticação básica (`addBasicAuth`) e categorização por tags (`addTag`).

---

## 📋 Endpoints da API

| Método | Endpoint | Descrição | Status HTTP |
| :--- | :--- | :--- | :--- |
| `GET` | `/status` | Retorna o status de funcionamento do servidor | `200 OK` |
| `GET` | `/docs` | Interface gráfica interativa do Swagger UI | `200 OK` |

---

## 🛠️ Configuração do Swagger (`src/main.ts`)

A configuração do Swagger é realizada no arquivo `main.ts` utilizando a classe `DocumentBuilder` e disponibilizada no endpoint `/docs`:

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
    .setTitle('API de Catálogo e Estoque')
    .setDescription('Documentação Técnica interativa viva para integração')
    .setVersion('1.0')
    .addTag('Produtos')
    .addBasicAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
```

---

## 📂 Estrutura dos DTOs (`src/produtos/dto/criar-produto.dto.ts`)

Os Data Transfer Objects (DTOs) são decorados com `@ApiProperty` para instruir o Swagger sobre o formato dos campos, descrições e exemplos interativos:

```typescript
import { ApiProperty } from '@nestjs/swagger';

export class CriarProdutoDto {
  @ApiProperty({
    example: 'Pasta dente sorriso',
    description: 'Nome comercial do produto cadastrado',
  })
  nome: string;

  @ApiProperty({
    example: 5.99,
    description: 'Preço unitario de venda',
  })
  preco: number;

  @ApiProperty({
    example: 'higenico',
    description: 'Categoria a qual o produto pertence',
  })
  categoria: string;
}
```

---

## 📂 Outros Arquivos do Módulo

### `src/app.controller.ts` & `src/app.service.ts`
Endpoint para verificação de disponibilidade do servidor (`/status`):

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
    return 'Status: Servidor Ativo!!!!';
  }
}
```

---

### `src/app.module.ts`
Módulo raiz importando e registrando os controllers da aplicação:

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ProdutosController } from './produtos/produto.controller.js';

@Module({
  imports: [],
  controllers: [AppController, ProdutosController],
  providers: [AppService],
})
export class AppModule {}
```

---

## 📂 Estrutura de Diretórios

```text
aula-17-documentacao-com-swagger-nestjs/
├── src/
│   ├── produtos/
│   │   ├── dto/
│   │   │   └── criar-produto.dto.ts
│   │   └── produto.controller.ts
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
├── test/
├── nest-cli.json
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚡ Como Executar e Acessar a Documentação

1. **Acesse a pasta do projeto:**
   ```bash
   cd aula-17-documentacao-com-swagger-nestjs
   ```

2. **Instale as dependências do projeto e do Swagger:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run start:dev
   ```

4. **Acesse o Swagger UI no navegador:**
   - **URL:** `http://localhost:3000/docs`