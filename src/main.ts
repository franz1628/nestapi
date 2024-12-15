import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(passport.initialize());

  // Habilitar CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Ajusta al origen de tu frontend
    methods: 'GET,POST,PUT,DELETE',
  });
  
  await app.listen(4000);
}
bootstrap();
