import {Injectable, NotFoundException, ConflictException, InternalServerErrorException, BadRequestException} from '@nestjs/common';
import {InjectModel, } from '@nestjs/mongoose';
import {Model, QueryFilter} from 'mongoose';
import { CreateAlunoDto } from './alunos/dto/create-alunos.dto.js';
import { UpdateAlunoDto } from './alunos/dto/update-alunos.dto.js';
import { Aluno, AlunoDocument } from './alunos/schemas/aluno.schemas.js';
import {MongoServerError} from "mongodb"

@Injectable()
export class AlunosService{
    constructor(@InjectModel(Aluno.name) private alunoModel: Model<AlunoDocument>){}

    async create (createAlunoDto: CreateAlunoDto):Promise<Aluno>{
        
        try{
        const createdAluno = new this.alunoModel(createAlunoDto);
        return  await createdAluno.save();
        } catch(error:unknown){
            if(
                error instanceof MongoServerError
                &&
                error.code === 11000
            ){
                throw new ConflictException ('matricula duplicada. A mareícula deve ser única.')
            }
            throw new InternalServerErrorException('Erro ao processar a cadrasto do aluno . por favor, novamente mais tarde')
        }
    }
    async findAllPageFilter(
        page: number,
         limit: number,
          nome?:string,
           curso?:string,
           orderBy?: string,
           orderDirection?: 'asc' | 'desc'

        
        ){

        const skip = (page - 1) * limit;
        const filtro: any = {ativo: true};
        if(nome){
            filtro.nome = {
                $regex: new RegExp(nome, 'i'),
            };
        }
        if(curso){
            filtro.cursos = curso;
        }

        const sort: any = {};

        if(orderBy){
            sort[orderBy] = orderDirection === 'desc' ? -1 : 1;
        }

        const [data, total] = await Promise.all([
            this.alunoModel.find(filtro).sort(sort).skip(skip).limit(limit).exec(),
            this.alunoModel.countDocuments(filtro).exec()
        ]);
       

        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };

       
    }//!GET
    //async findAll(): Promise<Aluno[]>{
      //  return this.alunoModel.find().exec();
    //}
    async findOne(id:string):Promise <Aluno>{
   // const aluno = await this.alunoModel.findById(id).exec();
   const aluno = await this.alunoModel.findOne({_id: id, ativo: true})

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
        const alunoRemovido = await this.alunoModel.findByIdAndUpdate(
            id, {ativo: false}, {new: true}).exec();

        if(!alunoRemovido){
            throw new NotFoundException(`Aluno com ID ${id} não encontrado `);
        }
        return alunoRemovido;
    }//!delete

    async restore(id: string): Promise <Aluno>{
        const alunoRestaurado = await this.alunoModel.findByIdAndUpdate(
            id, {ativo: true}, {new: true}
        ).exec();
        if(!alunoRestaurado){
            throw new NotFoundException(`Aluno com ID ${id} não encontrado`)
        }
        return alunoRestaurado;
    }

}