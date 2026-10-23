import {Injectable} from '@nestjs/common';
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
        return this.alunoModel.find().exec();
    }//!GET

    async findOne(id:string):Promise <Aluno | null>{
    return this.alunoModel.findById(id).exec();
    }//!GET

    async updete(id: string, updateAlunoDto: UpdateAlunoDto): Promise<Aluno | null>{
        return this.alunoModel.findByIdAndUpdate(id,UpdateAlunoDto,{
            new : true
        }).exec();
    }//!GET

    async remove(id: string): Promise<Aluno | null>{
        return this.alunoModel.findByIdAndDelete(id).exec();
    }//!GET
}