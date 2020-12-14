import {
  DynamicModule,
  Module,
  Provider,
  Controller,
  Get,
} from '@nestjs/common';

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

@Controller()
export class TestController {
  @Get('')
  test() {
    return 'hello world!!! water bottle';
  }
}

@Module({
  // controllers: [OAuthController],
  // providers: [OauthService, OAuthProvider, OAuthFacade],
  // exports: [OAuthFacade],
  controllers: [],
})
export class OAuthModule {
  //   static register(config: IntuitConfig): DynamicModule {
  //     return {
  //       module: OAuthModule,
  //       providers: [
  //         {
  //           provide: 'IntuitOAuth',
  //           useValue: IntuitOAuthFactory()(config),
  //         },
  //       ],
  //     };
  //   }
}
