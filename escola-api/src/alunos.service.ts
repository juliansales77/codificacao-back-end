import {Injectable, NotFoundException, ConflictException, InternalServerErrorException, BadRequestException, Inject} from '@nestjs/common';
import {InjectModel, } from '@nestjs/mongoose';
import {Model, QueryFilter} from 'mongoose';
import { CreateAlunoDto } from './alunos/dto/create-alunos.dto.js';
import { UpdateAlunoDto } from './alunos/dto/update-alunos.dto.js';
import { Aluno, AlunoDocument } from './alunos/schemas/aluno.schemas.js';
import {MongoServerError} from "mongodb"
import { ConfigService } from '@nestjs/config';
import { variaveisAmbiente } from './config/env.config.js';
import type { ConfigType } from '@nestjs/config';
import databaseConfig from './config/database.config.js';
import {inject} from "vitest"

@Injectable()
export class AlunoService{
    constructor(@InjectModel(Aluno.name) private alunoModel: Model<AlunoDocument>,
   private readonly configService: ConfigService<variaveisAmbiente, true>,
   @Inject (databaseConfig.KEY) private dbconfig: ConfigType<typeof databaseConfig>){}
   configVariaveis(){
    const nodeEnv = this.configService.get('NODE_ENV', {infer: true});
    const port = this.configService.get('PORT', {infer: true});
    const mongoUri = this.configService.get('MONGO_URI', {infer: true});
    const jwtSecret = this.configService.get('JWT_SECRET', {infer: true});
   }
    
    async create (createAlunoDto: CreateAlunoDto):Promise<Aluno>{

        try{
            const createAluno = new this.alunoModel(createAlunoDto);
            return await createAluno.save(); //!postg
        }catch(error: unknown){
            if(
               error instanceof MongoServerError && error.code === 11000
            ){
                throw new ConflictException('Matricula duplicada. a matricula deve ser unica')
            }
            throw new InternalServerErrorException('erro ao processar a matricula do aluno, por favor tente novamente mais tarde');
        }

        // const createdAluno = new this.alunoModel(createAlunoDto);
        // return createdAluno.save();
    }
    async findAllPageFilter(
        page: number, 
        limit: number, 
        nome?: string, 
        curso?:string,
        orderBy?: string,
        orderDirection?: 'asc' | 'desc',
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


        return{
            data,
            meta: {
                total,
                page,
                limit,
                totalpages: Math.ceil(total / limit),
            },
        };

    }//!GET

    // async findAll(): Promise<Aluno[]>{
    //     return this.alunoModel.find().exec();
    // }//!GET

    async findOne(id:string):Promise <Aluno>{
        // const aluno = await this.alunoModel.findById(id).exec();
        const aluno = await this.alunoModel.findOne({
            _id: id, ativo: true
        })
        if(!aluno){
            throw new NotFoundException(`Aluno com id ${id} não encontrado.`)
        }
        return aluno;
    }//!GET

    async update(id: string, UpdateAlunoDto: UpdateAlunoDto): Promise<Aluno>{
        const alunoAtualizado = await this.alunoModel.findByIdAndUpdate(id,UpdateAlunoDto,{
            new: true
        }).exec();
        if(!alunoAtualizado){
            throw new NotFoundException(`Aluno com id ${id} não encontrado`)
        }
        return alunoAtualizado
        
    }//!PATCH

    async remove(id: string): Promise<Aluno>{
        const alunoRemovido = await this.alunoModel.findByIdAndUpdate(
            id, {ativo: false }, {new: true} ).exec();
        if(!alunoRemovido){
            throw new NotFoundException(`Aluno com o id ${id} não encontrado`)
        }
        return alunoRemovido
    }//!DELETE

    async restore(id: string): Promise <Aluno>{
        const alunoRestaurado = await this.alunoModel.findByIdAndUpdate(
            id, {ativo: true}, {new: true}
        ).exec();

        if (!alunoRestaurado){
            throw new NotFoundException(`Aluno com ID ${id} não encontrado`)
        }
        return alunoRestaurado

    }
}