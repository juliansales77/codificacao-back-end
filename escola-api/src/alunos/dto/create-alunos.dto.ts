import { IsString, IsInt, IsNotEmpty, IsArray , Min, ArrayMinSize} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAlunoDto {
    @ApiProperty({
        example: 'João da Silva',
        description: 'Nome completo do aluno',
    })
    @IsString()
    @IsNotEmpty({
        message: 'O nome obrigatório e não pode ser vazio',
        
    })
    nome: string;
    @ApiProperty({
        description: 'Idade do aluno',
        example: '25',
    })
    @IsInt({
        message: 'A idade deve ser um número  inteiro'
    })
    @Min(0,{
        message: 'A idade não pode ser negativa'
    })
    idade: number;

    @ApiProperty({
        example: '1234',
        description: 'matricula do aluno'
    })
    @IsString()
    @IsNotEmpty({
        message: ' A matricula é obrigatória e não pode ser vazia'
    })
    matricula: string;

    @ApiProperty({
        example:['ciencias da cpmputação', 'recursos humanos'],
        description: 'cursos em que aluno esta matriculado',
    })
    @IsArray()
    @IsString({
        each: true,
        message: 'Cada curso deve  estar matriculado em pelo menos um curso.'
    })
    
    
    cursos: string[];
}