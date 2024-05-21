import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';


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

  const microserviceOptions: MicroserviceOptions = {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],  // Change to the RabbitMQ server URL
      queue: 'main_queue',
      queueOptions: {
        durable: false,
      },
    },
  };

  app.connectMicroservice(microserviceOptions);

  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
