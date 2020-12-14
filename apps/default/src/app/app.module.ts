import { Module } from '@nestjs/common';
import { ClientsModule, ClientProxy, Transport } from '@nestjs/microservices';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'OAuthService',
        transport: Transport.REDIS,
        options: { host: 'redis://localhost:6379' },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
