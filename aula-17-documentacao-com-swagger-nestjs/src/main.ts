import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('API de Catálogo e Estoque')
  .setDescription('Documentação Técnica interativae viva para integrção')
  .setVersion('1.0')
  .addTag('Produtos')
  .addBasicAuth()
  .build();
  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
