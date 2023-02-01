import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { Client } from '@nestjs/microservices';
import { ClientKafka } from '@nestjs/microservices/client';
import { Transport } from '@nestjs/microservices/enums';
import { Observable } from 'rxjs';

@Controller()
export class AppController implements OnModuleInit {
  @Client({
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
  })
  private client: ClientKafka;

  async onModuleInit() {
    const messages = ['hello'];
    messages.forEach(async (pattern) => {
      this.client.subscribeToResponseOf(pattern);
      await this.client.connect();
    });
  }
  @Get()
  getHello(): Observable<string> {
    return this.client.send('hello', {});
  }
}
