import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { AlunosModule } from './alunos/alunos.module.js';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import Joi from 'joi';


@Module({
  imports: [
    AlunosModule,
    ConfigModule.forRoot({
      isGlobal:true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
        .valid('desenvolvimento', 'producao', 'teste')
        .default('desenvolvimento'),
        PORT: Joi.number().default(3000),
        MONGO_URI: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
      }),
    }),
    MongooseModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(configService: ConfigService)=>({
        uri:configService.getOrThrow<string>('MONGO_URI'),
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
