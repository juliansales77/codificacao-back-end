import { Controller, Get, Headers, Res } from "@nestjs/common";
import type { Response } from "express";

@Controller('secreto')
export class SegurancaController {
  @Get()
  acessarAreaSecreta(
    @Headers('x-api-key') apikey: string,
    @Res() res: Response,
  ) {
    if (apikey === 'SENAI-2026') {
      res.setHeader('x-auth-status', 'verificado');
      return res.status(200).json({
        mensagem: 'Acesso concedido ao conteudo secreto!',
        timeStamp: new Date(),
      });
    }

    return res.status(403).json({
      erro: 'Forbidden',
      mensagem: 'Chave de api invalida ou ausente',
    });
  }
}