import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  @Get()
  getPublic(){
    return {
      massage:'Rota Publica acessada com sucesso',
      data: new Date(),
    }
  }
  @Get('admin')
  getAdmin(){
    return {
      massage:'Bem-vindo ao Painel administrativo',
      data: new Date(),
    }
  }

}
