/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

// THIS LINE MUST RUN FIRST!!!
if (process.env.NODE_ENV !== 'production')
  require('dotenv').config({ path: 'apps/oauth/src/.env' });

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { OAuthModule } from './app/oauth.module';

console.log(`Testing value is: ${process.env.TEST}`);

async function bootstrap() {
  const app = await NestFactory.create(OAuthModule);

  const port = process.env.PORT || 3010;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/');
  });
}

bootstrap();
