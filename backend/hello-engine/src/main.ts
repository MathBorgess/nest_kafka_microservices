// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

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
          brokers: ['localhost:9092'],
          clientId: 'helloID'
        },
        consumer: {
          groupId: 'helloGroup',
          allowAutoTopicCreation: true,
          maxWaitTimeInMs: 100000
        }
      }
    }
  );
  await app.listen();
  logger.log('hello-engine on air');
}
bootstrap();
