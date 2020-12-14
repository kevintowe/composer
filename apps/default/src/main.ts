// THIS LINE MUST RUN FIRST!!!
// if (process.env.NODE_ENV !== 'production')
//   require('dotenv').config({ path: 'apps/default/.env' });

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

const logger = new Logger('Default Main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'warn', 'log', 'verbose'],
  });

  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    logger.log('Listening at http://localhost:' + port);
  });
}

bootstrap();
