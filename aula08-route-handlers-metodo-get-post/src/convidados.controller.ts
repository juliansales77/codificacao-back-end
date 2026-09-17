import { Controller, Get, Post, Body } from "@nestjs/common";
import { CriarConvidadoDto } from "./dto/criar-convidado.dto.js";

@Controller('convidados')
export class ConvidadosController{

    @Get()
    listarConvidados(){
        return['Amanda', 'Davi', 'Gabrielly', 'Yuri'];
    }
    @Post()
    criar(@Body() CriarConvidadoDto: CriarConvidadoDto){
        console.log(`[PORTEIRO DIGITAL] Novo convidado recebido:  ${CriarConvidadoDto.nome}`);

        return {
            mendagem: `Convidado ${CriarConvidadoDto.nome} adicionado com sucesso`,
            dados: CriarConvidadoDto,
        };
    }
}