import { Controller, Post, Body } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CriarProdutoDto } from "./dto/criar-produto.dto.js";

@ApiTags('produtos')
@Controller('produtos')
export class ProdutosController {
    @Post()
    @ApiOperation({
        summary:'Cadastra um novo produto no catálogo'
    })
    @ApiResponse({
        status:201, description:'Produto Cadastrado com sucesso'
    })
    @ApiResponse({
        status:400, description:'Playload enviado com dados inválidos'
    })
    async criar(@Body() criarProdutoDto: CriarProdutoDto){
        return {
            id: 150,
            ...criarProdutoDto,
            criadoEm: new Date().toLocaleDateString(),
        };

    }
}