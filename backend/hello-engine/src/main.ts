/* eslint-disable prettier/prettier */
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices/enums';
import { AppModule } from './app.module';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['kafka:9091'],
          clientId: 'hello'
        },
        consumer: {
          groupId: 'helloGroup',
          allowAutoTopicCreation: true
        }
      }
    }
  );
  await app.listen();
  logger.log('hello-engine on air');
}
bootstrap();
