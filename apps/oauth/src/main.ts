// THIS LINE MUST RUN FIRST!!!
if (process.env.NODE_ENV !== 'production')
  require('dotenv').config({ path: 'apps/oauth/.env' });

import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
const logger = new Logger('OAuth Main');

import { OAuthModule } from './app/oauth.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OAuthModule,
    {
      transport: Transport.REDIS,
      options: { url: process.env.CONNECTION_URL || 'redis://localhost:6379' },
    }
  );

  app.listen(() => {
    logger.log('OAuth Microservice is listening');
  });
}

bootstrap();
