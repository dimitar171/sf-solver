import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { QuestionsModule } from './questions.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    QuestionsModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://user1:password123@solver-app-rabbitmq:5672'],
        // urls: ['amqp://rabbitmq:5672'],
        // urls: ['amqp://localhost:5672'],
        queue: 'questions_queue',
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
