import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1'
  });

  app.enableCors({
    origin: 'http://localhost:3000', // Change this to your actual frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  

  app.use(cookieParser());
  await app.listen(3001);
}
bootstrap();
