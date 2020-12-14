import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ClientsModule, ClientProxy, Transport } from '@nestjs/microservices';

import { OAuthController } from './oauth.controller';
import { OauthService } from './oauth.service';
import { IntuitOAuthFactory } from './oauth.factory';

export interface OAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  environment: 'sandbox' | 'production';
}

const OAuthProvider: Provider<any> = {
  provide: 'IntuitOAuth',
  useFactory: IntuitOAuthFactory(),
  inject: ['IntuitConfig'],
};

@Module({
  controllers: [OAuthController],
  providers: [OauthService, OAuthProvider],
})
export class OAuthModule {
  static register(config: OAuthConfig): DynamicModule {
    return {
      module: OAuthModule,
      imports: [
        ClientsModule.register([
          {
            name: 'TokenService',
            transport: Transport.REDIS,
            options: { host: 'redis://localhost:6379' },
          },
        ]),
      ],
      providers: [
        {
          provide: 'IntuitOAuth',
          useValue: IntuitOAuthFactory()(config),
        },
      ],
    };
  }
}
