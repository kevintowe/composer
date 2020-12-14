import { Controller, Inject, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { error } from 'console';
import { resolve } from 'dns';
const _IntuitOAuth = require('intuit-oauth');
import { OauthService } from './oauth.service';

const logger = new Logger('OAuth Controller');

@Controller()
export class OAuthController {
  constructor() {} // private oauthService: OauthService // @Inject('IntuitOAuth') private intuitOAuth: any,

  @MessagePattern('authorize')
  async authorize(): Promise<{ status: boolean; uri?: string }> {
    logger.log('authorize message received');
    return new Promise<{ status: boolean; uri: string }>((resolve, reject) => {
      // const authUri = this.intuitOAuth.authorizeUri({
      //   scope: [_IntuitOAuth.scopes.Accounting],
      //   state: null,
      // });
      const authUri = 'https://yahoo.com';
      resolve({ status: true, uri: authUri });
    });
  }

  @MessagePattern('oauthRedirect')
  async handleRedirect(url: string): Promise<{ status: boolean }> {
    logger.log('authorize redirect message received');
    try {
      // this.intuitOAuth.createToken(url).then((response) => {
      //   this.oauthService.emitToken(this.oauthService.buildToken(response));
      //   return;
      // });
      return { status: true };
    } catch (err) {
      return { status: false };
    }
  }
}
