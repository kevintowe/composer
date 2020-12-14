// THIS LINE MUST RUN FIRST!!!
if (process.env.NODE_ENV !== 'production')
  require('dotenv').config({ path: 'apps/oauth/.env' });

import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

import { OAuthModule } from './app/oauth.module';

console.log(`Testing value is: ${process.env.TEST}`);

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OAuthModule,
    { transport: Transport.TCP }
  );

  const port = process.env.PORT || 3010;
  app.listen(() => {
    console.log('OAuth Microservice is listening');
  });
}

bootstrap();
