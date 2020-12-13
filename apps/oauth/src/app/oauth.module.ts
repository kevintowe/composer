import { DynamicModule, Module, Provider } from '@nestjs/common';

import { OAuthController } from './oauth.controller';
import { OauthService } from './oauth.service';
import { IntuitOAuthFactory } from './oauth.factory';
import { OAuthFacade } from './oauth.facade';
import { IntuitConfig } from '@composer/types';

const OAuthProvider: Provider<any> = {
  provide: 'IntuitOAuth',
  useFactory: IntuitOAuthFactory(),
  inject: ['IntuitConfig'],
};

@Module({
  controllers: [OAuthController],
  providers: [OauthService, OAuthProvider, OAuthFacade],
  exports: [OAuthFacade],
})
export class OAuthModule {
  static register(config: IntuitConfig): DynamicModule {
    return {
      module: OAuthModule,
      providers: [
        {
          provide: 'IntuitOAuth',
          useValue: IntuitOAuthFactory()(config),
        },
      ],
    };
  }
}
