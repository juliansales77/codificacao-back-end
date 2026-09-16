import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Servidor Nest.js - Aula 07 Ativo!';
  }
}
