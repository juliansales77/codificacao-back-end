import {Controller, Get, Post,Body,Patch, Param, Delete, Query, DefaultValuePipe, ParseArrayPipe, ParseIntPipe} from '@nestjs/common';
import { AlunosService } from '../alunos.service.js';
import { CreateAlunoDto } from './dto/create-alunos.dto.js';
import { UpdateAlunoDto } from './dto/update-alunos.dto.js';
import {ApiTags, ApiOperation,ApiResponse, ApiQuery} from '@nestjs/swagger';

@ApiTags('alunos')
@Controller('alunos')
export class AlunosController {
  constructor( private readonly alunoService: AlunosService) {}

  //=====================================================
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
//====================================
 @Get()
@ApiOperation({
  summary: 'Retorna alunos com paginação, filtros opcionais e ordenação',
})
@ApiResponse({
  status: 200,
  description: 'Lista de alunos retornada com sucesso.',
})
@ApiResponse({
  status: 500,
  description: 'Erro interno do servidor.',
})
@ApiQuery({
  name: 'page',
  required: false,
  type: Number,
  description: 'Número da página (padrão: 1)',
})
@ApiQuery({
  name: 'limit',
  required: false,
  type: Number,
  description: 'Itens por página (padrão: 10)',
})
@ApiQuery({
  name: 'nome',
  required: false,
  type: String,
  description: 'Filtra alunos pelo nome',
})
@ApiQuery({
  name: 'curso',
  required: false,
  type: String,
  description: 'Filtra alunos pelo curso',
})
@ApiQuery({
  name: 'orderBy',
  required: false,
  type: String,
  description: 'Campo utilizado para ordenar os resultados',
})
@ApiQuery({
  name: 'orderDirection',
  required: false,
  enum: ['asc', 'desc'],
  description: 'Direção da ordenação',
})
findAllPageFilter(
  @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  @Query('nome') nome?: string,
  @Query('curso') curso?: string,
  @Query('orderBy') orderBy?: string,
  @Query('orderDirection') orderDirection?: 'asc' | 'desc',
) {
  return this.alunoService.findAllPageFilter(
    page,
    limit,
    nome,
    curso,
    orderBy,
    orderDirection,
  );
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

