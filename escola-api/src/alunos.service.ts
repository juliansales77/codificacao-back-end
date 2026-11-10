import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import { CreateAlunoDto } from './alunos/dto/create-alunos.dto.js';
import { UpdateAlunoDto } from './alunos/dto/update-alunos.dto.js';
import { Aluno, AlunoDocument } from './alunos/schemas/aluno.schemas.js';

@Injectable()
export class AlunosService{
    constructor(@InjectModel(Aluno.name) private alunoModel: Model<AlunoDocument>){}
    async create (createAlunoDto: CreateAlunoDto):Promise<Aluno>{
        const createdAluno = new this.alunoModel(createAlunoDto);
        return createdAluno.save();
    }
    async findAll(): Promise<Aluno[]>{
        return this.alunoModel.find(). exec();
    }//!GET

    async findOne(id:string):Promise <Aluno>{
    const aluno = await this.alunoModel.findById(id).exec();
    if(!aluno){
        throw new NotFoundException(`Aluno com ID  ${id} não encontrado.`);
    }
    return aluno;
    }//!GET

    async updete(id: string, UpdateAlunoDto: UpdateAlunoDto): Promise<Aluno>{
        const alunoAtualizado = await this.alunoModel.findByIdAndUpdate(id, UpdateAlunoDto,{
            new : true
        }).exec();
        if(!alunoAtualizado){
            throw new NotFoundException(`Aluno com ID${id} não encontrado`);
        }
         return alunoAtualizado;
    }//!GET

    async remove(id: string): Promise<Aluno>{
        const alunoRemovido = await this.alunoModel.findByIdAndDelete(id).exec();

        if(!alunoRemovido){
            throw new NotFoundException(`Aluno com ID ${id} não encontrado `);
        }
        return alunoRemovido;
    }//!GET
}