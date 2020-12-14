// THIS LINE MUST RUN FIRST!!!
if (process.env.NODE_ENV !== 'production')
  require('dotenv').config({ path: 'apps/oauth/.env' });

import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

import { TokenModule, TokenConfig } from './app/app.module';

const logger = new Logger('Token Main');

async function bootstrap() {
  const redisUrl = `${process.env.REDIS_URL}:6379`;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TokenModule.register(buildTokenConfig()),
    {
      transport: Transport.REDIS,
      options: {
        url: process.env.TOKEN_CONNECTION_URL || '//localhost:6379',
      },
    }
  );

  app.listen(() => {
    logger.log(`Token Microservice is listening`);
  });
}

bootstrap();

function buildTokenConfig(): TokenConfig {
  return {};
}
