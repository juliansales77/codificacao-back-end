import { Injectable } from "@nestjs/common";

@Injectable()
export class ProdutosService {
    produtos =[
        {id: 1, nome: 'Teclado Mecanico', preco: 199.99},
        {id: 2,  nome: 'Mouse Gamer', preco: 99.99},
        {id: 3,  nome: 'Monitor 144Hz', preco: 899.99},
        {id: 4, nome: 'Headset RGB', preco: 149.99},
        {id: 5, nome: 'Cadeira Gamer', preco: 499.99},
    ];
    listarProdutos(){
        return this.produtos;
    }
}