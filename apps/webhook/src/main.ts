const instantiationTime = Date.now();
// THIS LINE MUST RUN FIRST!!!
if (process.env.NODE_ENV !== 'production')
  require('dotenv').config({ path: 'apps/webhook/.env' });

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

const logger = new Logger('Webhook Main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3040;
  await app.listen(port, () => {
    logger.log(
      `Webhook Microservice is listening +${Date.now() - instantiationTime}ms`
    );
  });
}

bootstrap();
