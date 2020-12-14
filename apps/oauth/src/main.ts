// THIS LINE MUST RUN FIRST!!!
if (process.env.NODE_ENV !== 'production')
  require('dotenv').config({ path: 'apps/oauth/.env' });

import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
const logger = new Logger('OAuth Main');

import { OAuthModule, OAuthConfig } from './app/oauth.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OAuthModule.register(buildConfig()),
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

function buildConfig(): OAuthConfig {
  return {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
    environment: process.env.INTUIT_ENVIRONMENT as 'sandbox' | 'production',
  };
}
