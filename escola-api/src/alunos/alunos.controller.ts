
import {Controller, Get, Post,Body,Patch, Param, Delete,} from '@nestjs/common';
import { AlunosService } from '../alunos.service.js';
import { CreateAlunoDto } from './dto/create-alunos.dto.js';
import { UpdateAlunoDto } from './dto/update-alunos.dto.js';
import {ApiTags, ApiOperation,ApiResponse,} from '@nestjs/swagger';

@ApiTags('alunos')
@Controller('alunos')
export class AlunosController {
  constructor( private readonly alunoService: AlunosService,) {}

  
  @Post()
  @ApiOperation({
    summary: 'Cria a matrícula do aluno',
  })
  @ApiResponse({
    status: 201,
    description: 'A matrícula do aluno foi criada com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos fornecidos para criar a matrícula.',
  })
  @ApiResponse({
    status: 409,
    description: 'Matrícula duplicada ou serviço indisponível.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor.',
  })
  @Post()
  create(@Body() createAlunoDto: CreateAlunoDto) {
    return this.alunoService.create(createAlunoDto);
  }

 
  @Get()
  @ApiOperation({
    summary: 'Retorna todos os alunos cadastrados',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de alunos retornada com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Nenhum aluno encontrado.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor.',
  })
  @Get()
  findAll() {
    return this.alunoService.findAll();
  }

  
  @Get(':id')
  @ApiOperation({
    summary: 'Retorna um aluno específico',
  })
  @ApiResponse({
    status: 200,
    description: 'Aluno encontrado com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Aluno não encontrado.',
  })
  findOne(@Param('id') id: string) {
    return this.alunoService.findOne(id);
  }

  
  @Patch(':id')
  @ApiOperation({
    summary: 'Atualiza os dados de um aluno',
  })
  @ApiResponse({
    status: 200,
    description: 'Aluno atualizado com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Aluno não encontrado.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor.',
  })
  update(
    @Param('id') id: string,
    @Body() updateAlunoDto: UpdateAlunoDto,
  ) {
    return this.alunoService.updete(id, updateAlunoDto);
  }

  
  @Delete(':id')
  @ApiOperation({
    summary: 'Remove um aluno',
  })
  @ApiResponse({
    status: 200,
    description: 'Aluno removido com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Aluno não encontrado.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor.',
  })
  remove(@Param('id') id: string) {
    return this.alunoService.remove(id);
  }
}

