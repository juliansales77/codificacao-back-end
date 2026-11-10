# 🚀 API Escola (`escola-api`)

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%2347A248.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

Aplicação RESTful para **Gerenciamento de Alunos** desenvolvida com **NestJS**, conectada ao banco de dados **MongoDB** via **Mongoose**. O projeto inclui validações com `class-validator`, pipe global de validações (`ValidationPipe`), documentação técnica interativa com **Swagger/OpenAPI** e operações completas de CRUD.

---

## 📋 Endpoints da API

| Método | Endpoint | Descrição | Status HTTP |
| :--- | :--- | :--- | :--- |
| `POST` | `/alunos` | Cadastra a matrícula de um novo aluno | `201 Created` / `400` / `409` / `500` |
| `GET` | `/alunos` | Retorna a lista de todos os alunos cadastrados | `200 OK` / `404` / `500` |
| `GET` | `/alunos/:id` | Busca um aluno específico pelo seu ID do MongoDB | `200 OK` / `404` |
| `PATCH` | `/alunos/:id` | Atualiza dados cadastrais de um aluno | `200 OK` / `404` / `500` |
| `DELETE` | `/alunos/:id` | Remove um aluno cadastrado | `200 OK` / `404` / `500` |
| `GET` | `/api` | Interface interativa do Swagger UI | `200 OK` |

---

## 🛠️ Tecnologias e Recursos Utilizados

- **NestJS Framework**: Estrutura modular, controllers, services e pipes.
- **MongoDB & Mongoose**: Mapeamento de esquemas NoSQL e persistência de dados.
- **Swagger / OpenAPI**: Documentação interativa exposta em `/api`.
- **Class-Validator & Class-Transformer**: Validação e sanitização de dados no DTO.

---

## 📂 Estrutura do Código-Fonte

### 1. Ponto de Entrada (`src/main.ts`)
Configura a validação global (`ValidationPipe`) com sanitização de propriedades (`whitelist` e `forbidNonWhitelisted`) e a documentação do Swagger:

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  //! Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API Escola')
    .setDescription('API para gerenciamento de alunos')
    .setVersion('1.0.0')
    .addTag('alunos')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

---

### 2. Schema Mongoose (`src/alunos/schemas/aluno.schemas.ts`)
Define a entidade `Aluno` e suas regras de persistência no MongoDB:

```typescript
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AlunoDocument = HydratedDocument<Aluno>;

@Schema()
export class Aluno {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  idade: number;

  @Prop({ required: true, unique: true })
  matricula: string;

  @Prop([String])
  cursos: string[];
}

export const AlunoSchema = SchemaFactory.createForClass(Aluno);
```

---

### 3. DTOs de Transferência de Dados

#### `src/alunos/dto/create-alunos.dto.ts`
Valida as propriedades do corpo da requisição e adiciona anotações para o Swagger:

```typescript
import { IsString, IsInt, IsNotEmpty, IsArray, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlunoDto {
  @ApiProperty({
    example: 'João da Silva',
    description: 'Nome completo do aluno',
  })
  @IsString()
  @IsNotEmpty({
    message: 'O nome é obrigatório e não pode ser vazio',
  })
  nome: string;

  @ApiProperty({
    description: 'Idade do aluno',
    example: 25,
  })
  @IsInt({
    message: 'A idade deve ser um número inteiro',
  })
  @Min(0, {
    message: 'A idade não pode ser negativa',
  })
  idade: number;

  @ApiProperty({
    example: '1234',
    description: 'Matrícula do aluno',
  })
  @IsString()
  @IsNotEmpty({
    message: 'A matrícula é obrigatória e não pode ser vazia',
  })
  matricula: string;

  @ApiProperty({
    example: ['Ciências da Computação', 'Recursos Humanos'],
    description: 'Cursos em que o aluno está matriculado',
  })
  @IsArray()
  @IsString({
    each: true,
    message: 'Cada curso deve ser uma string válida',
  })
  cursos: string[];
}
```

#### `src/alunos/dto/update-alunos.dto.ts`
Estende o `CreateAlunoDto` usando `PartialType` do Swagger para permitir atualização parcial:

```typescript
import { PartialType } from '@nestjs/swagger';
import { CreateAlunoDto } from './create-alunos.dto.js';

export class UpdateAlunoDto extends PartialType(CreateAlunoDto) {
  nome?: string;
  idade?: number;
  matricula?: string;
  cursos?: string[];
}
```

---

### 4. Controller (`src/alunos/alunos.controller.ts`)
Manipula as rotas do endpoint `/alunos` com decorações do Swagger:

```typescript
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlunosService } from '../alunos.service.js';
import { CreateAlunoDto } from './dto/create-alunos.dto.js';
import { UpdateAlunoDto } from './dto/update-alunos.dto.js';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('alunos')
@Controller('alunos')
export class AlunosController {
  constructor(private readonly alunoService: AlunosService) {}

  @Post()
  @ApiOperation({ summary: 'Cria a matrícula do aluno' })
  @ApiResponse({ status: 201, description: 'A matrícula do aluno foi criada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos fornecidos para criar a matrícula.' })
  @ApiResponse({ status: 409, description: 'Matrícula duplicada ou serviço indisponível.' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  create(@Body() createAlunoDto: CreateAlunoDto) {
    return this.alunoService.create(createAlunoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retorna todos os alunos cadastrados' })
  @ApiResponse({ status: 200, description: 'Lista de alunos retornada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Nenhum aluno encontrado.' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  findAll() {
    return this.alunoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna um aluno específico' })
  @ApiResponse({ status: 200, description: 'Aluno encontrado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Aluno não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.alunoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza os dados de um aluno' })
  @ApiResponse({ status: 200, description: 'Aluno atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Aluno não encontrado.' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  update(@Param('id') id: string, @Body() updateAlunoDto: UpdateAlunoDto) {
    return this.alunoService.updete(id, updateAlunoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um aluno' })
  @ApiResponse({ status: 200, description: 'Aluno removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Aluno não encontrado.' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  remove(@Param('id') id: string) {
    return this.alunoService.remove(id);
  }
}
```

---

### 5. Service (`src/alunos.service.ts`)
Contém a lógica de persistência e tratamento de exceções HTTP (`NotFoundException`):

```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAlunoDto } from './alunos/dto/create-alunos.dto.js';
import { UpdateAlunoDto } from './alunos/dto/update-alunos.dto.js';
import { Aluno, AlunoDocument } from './alunos/schemas/aluno.schemas.js';

@Injectable()
export class AlunosService {
  constructor(@InjectModel(Aluno.name) private alunoModel: Model<AlunoDocument>) {}

  async create(createAlunoDto: CreateAlunoDto): Promise<Aluno> {
    const createdAluno = new this.alunoModel(createAlunoDto);
    return createdAluno.save();
  }

  async findAll(): Promise<Aluno[]> {
    return this.alunoService ? this.alunoModel.find().exec() : this.alunoModel.find().exec();
  }

  async findOne(id: string): Promise<Aluno> {
    const aluno = await this.alunoModel.findById(id).exec();
    if (!aluno) {
      throw new NotFoundException(`Aluno com ID ${id} não encontrado.`);
    }
    return aluno;
  }

  async updete(id: string, updateAlunoDto: UpdateAlunoDto): Promise<Aluno> {
    const alunoAtualizado = await this.alunoModel
      .findByIdAndUpdate(id, updateAlunoDto, { new: true })
      .exec();
    if (!alunoAtualizado) {
      throw new NotFoundException(`Aluno com ID ${id} não encontrado`);
    }
    return alunoAtualizado;
  }

  async remove(id: string): Promise<Aluno> {
    const alunoRemovido = await this.alunoModel.findByIdAndDelete(id).exec();
    if (!alunoRemovido) {
      throw new NotFoundException(`Aluno com ID ${id} não encontrado`);
    }
    return alunoRemovido;
  }
}
```

---

### 6. Módulos da Aplicação

#### `src/alunos/alunos.module.ts`
```typescript
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AlunosService } from '../alunos.service.js';
import { AlunosController } from './alunos.controller.js';
import { Aluno, AlunoSchema } from './schemas/aluno.schemas.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Aluno.name, schema: AlunoSchema },
    ]),
  ],
  controllers: [AlunosController],
  providers: [AlunosService],
})
export class AlunosModule {}
```

#### `src/app.module.ts`
```typescript
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AlunosModule } from './alunos/alunos.module.js';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/escola_db'),
    AlunosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

---

## 📂 Estrutura de Diretórios

```text
escola-api/
├── src/
│   ├── alunos/
│   │   ├── dto/
│   │   │   ├── create-alunos.dto.ts
│   │   │   └── update-alunos.dto.ts
│   │   ├── schemas/
│   │   │   └── aluno.schemas.ts
│   │   ├── alunos.controller.ts
│   │   └── alunos.module.ts
│   ├── alunos.service.ts
│   ├── app.module.ts
│   └── main.ts
├── test/
├── nest-cli.json
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚡ Como Executar o Projeto

1. **Certifique-se de que o MongoDB esteja em execução localmente:**
   ```bash
   mongod
   ```

2. **Acesse a pasta do projeto e instale as dependências:**
   ```bash
   cd escola-api
   npm install
   ```

3. **Inicie a aplicação em modo de desenvolvimento:**
   ```bash
   npm run start:dev
   ```

4. **Acesse a documentação interativa no navegador:**
   - **Swagger UI:** `http://localhost:3000/api`