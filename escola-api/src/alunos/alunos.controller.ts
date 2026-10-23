import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { AlunosService } from "../alunos.service.js";
import { CreateAlunoDto } from "./dto/create-alunos.dto.js";
import { UpdateAlunoDto } from "./dto/update-alunos.dto.js";

@Controller()
export class  AlunosController{
    constructor(private readonly alunoService: AlunosService){}
    @Post()
    create(@Body() createAlunoDta:CreateAlunoDto){
        return this.alunoService.create(createAlunoDta);
    }
    @Get()
    finAll(){
        return this.alunoService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id: string){
        return this.alunoService.findOne(id);
    }
    @Patch('id')
    update(@Param('id') id: string, @Body() updateAlunoDto: UpdateAlunoDto){
        return this.alunoService.updete(id, updateAlunoDto);
    }
    @Delete(':id')
    remove(@Param('id') id: string){
        return this.alunoService.remove(id);
    }



}