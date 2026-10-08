# 🚀 Aula 16: Validação de Schemas com Zod (NestJS)

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Zod](https://img.shields.io/badge/zod-%233068B7.svg?style=for-the-badge&logo=zod&logoColor=white)

Este módulo aborda a integração do **Zod** com o **NestJS** para validação e sanitização do corpo das requisições (`body`), utilizando um **Custom Pipe** (`ZodValidationPipe`) para interceptar, validar e formatar os erros de validação antes que a requisição chegue ao controller.

---

## 📋 Endpoints da API

| Método | Endpoint | Descrição | Status HTTP |
| :--- | :--- | :--- | :--- |
| `POST` | `/colaboradores` | Cria um novo colaborador com validação via Zod | `201 Created` / `400 Bad Request` |

---

## 🛠️ Regras de Validação do Schema (`colaborador.schema.ts`)

O schema de validação foi estruturado da seguinte forma:

- **`nome`**: String com no mínimo 3 caracteres (*"O nome deve ter no mínimo 3 letras!"*).
- **`email`**: String em formato de e-mail válido (*"O email deve ser válido!"*).
- **`idade`**: Número com valor mínimo de 18 anos (*"A idade mínima é 18 anos!"*) e máximo de 65 anos (*"A idade máxima é 65 anos!"*).
- **`departamento`**: Enum restrito aos valores `'TI'`, `'RH'` ou `'Financeiro'` (*"O departamento deve ser obrigatoriamente TI, RH ou Financeiro!"*).

---

## 📂 Estrutura do Código-Fonte

### 1. `src/colaborador.schema.ts`
Define o schema de validação Zod e infere o tipo TypeScript correspondente:

```typescript
import { z } from 'zod';

export const colaboradorSchema = z.object({
  nome: z.string().min(3, { message: 'O nome deve ter no mínimo 3 letras!' }),
  email: z.email({ message: 'O email deve ser válido!' }),
  idade: z.number({ error: 'A idade deve ser um número!' })
    .min(18, { message: 'A idade mínima é 18 anos!' })
    .max(65, { message: 'A idade máxima é 65 anos!' }),
  departamento: z.enum(['TI', 'RH', 'Financeiro'], {
    error: () => ({ message: 'O departamento deve ser obrigatoriamente TI, RH ou Financeiro!' }),
  }),
});

export type Colaborador = z.infer<typeof colaboradorSchema>;
```

---

### 2. `src/zod-validation.pipe.ts`
Pipe customizado que implementa `PipeTransform` para validar dados enviados via `body` utilizando `.safeParse()`:

```typescript
import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') return value;

    const parseResult = this.schema.safeParse(value);

    if (!parseResult.success) {
      const formattedError = parseResult.error.issues.map((issue) => ({
        campo: issue.path.join('.'),
        mensagem: issue.message,
      }));

      throw new BadRequestException({
        statusCode: 400,
        erros: formattedError,
      });
    }

    return parseResult.data;
  }
}
```

---

### 3. `src/colaboradores.controller.ts`
Controller responsável pela rota `/colaboradores`, utilizando o decorator `@UsePipes` com o `ZodValidationPipe`:

```typescript
import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { colaboradorSchema } from './colaborador.schema.js';
import type { Colaborador } from './colaborador.schema.js';
import { ZodValidationPipe } from './zod-validation.pipe.js';

@Controller('colaboradores')
export class ColaboradoresController {
  @Post()
  @UsePipes(new ZodValidationPipe(colaboradorSchema))
  async create(@Body() body: Colaborador) {
    return {
      message: 'Colaborador criado com sucesso',
    };
  }
}
```

---

### 4. `src/app.module.ts`
Módulo principal configurando a aplicação e registrando controllers e provedores:

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ColaboradoresController } from './colaboradores.controller.js';
import { ZodValidationPipe } from './zod-validation.pipe.js';

@Module({
  imports: [ZodValidationPipe],
  controllers: [AppController, ColaboradoresController],
  providers: [AppService],
})
export class AppModule {}
```

---

## 📸 Testes e Respostas no Thunder Client / Postman

### 1. Requisição Com Sucesso (`POST /colaboradores`)
- **Body:**
```json
{
  "nome": "Julian Sales",
  "email": "julian.sales@aluno.senai.br",
  "idade": 30,
  "departamento": "TI"
}
```
- **Resposta HTTP:** `201 Created`
```json
{
  "message": "Colaborador criado com sucesso"
}
```

---

### 2. Requisição Com Erros de Validação (`POST /colaboradores`)
- **Body:**
```json
{
  "nome": "Jo",
  "email": "email-invalido",
  "idade": 17,
  "departamento": "Vendas"
}
```
- **Resposta HTTP:** `400 Bad Request`
```json
{
  "statusCode": 400,
  "erros": [
    {
      "campo": "nome",
      "mensagem": "O nome deve ter no mínimo 3 letras!"
    },
    {
      "campo": "email",
      "mensagem": "O email deve ser válido!"
    },
    {
      "campo": "idade",
      "mensagem": "A idade mínima é 18 anos!"
    },
    {
      "campo": "departamento",
      "mensagem": "O departamento deve ser obrigatoriamente TI, RH ou Financeiro!"
    }
  ]
}
```

---

## 📂 Estrutura de Diretórios

```text
aula-16-validacao-schemas-com-zod-nestjs/
├── src/
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── colaborador.schema.ts
│   ├── colaboradores.controller.ts
│   ├── main.ts
│   └── zod-validation.pipe.ts
├── test/
├── nest-cli.json
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚡ Como Executar Localmente

1. **Acesse a pasta da aula:**
   ```bash
   cd aula-16-validacao-schemas-com-zod-nestjs
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor em modo de desenvolvimento:**
   ```bash
   npm run start:dev
   ```

4. **Envie requisições para:** `POST http://localhost:3000/colaboradores`