const instantiationTime = Date.now();

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

const logger = new Logger('Token Main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 3020;
  await app.listen(port, () => {
    logger.log(
      `Token Microservice is listening +${Date.now() - instantiationTime}ms`
    );
  });
}

bootstrap();
