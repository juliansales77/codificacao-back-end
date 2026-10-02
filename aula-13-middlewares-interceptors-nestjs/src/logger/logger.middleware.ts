import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request,  Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const Rota = req.originalUrl || req.url;
    console.log(`[LOG] Método: ${req.method} | Rota: ${Rota}  `);

    if(Rota.startsWith('admin')){

      const role = req.headers['/api-key-admin'];

      if(role !== 'administrador'){
        return res.status(403).json({
          statusCode: 403,
          massage: 'Acesso Negado: Privilégipo Supervisor Necessario',
          
        });
      }
    }
    if(Rota.startsWith('secret')){

      const role = req.headers['/api-key-secret'];

      if(role !== 'operador'){
        return res.status(403).json({
          statusCode: 403,
          massage: 'Acesso Negado: Privilégipo Usuario Autenticado Necessario',
          
        });
      }
    }
    next();
  }
}
