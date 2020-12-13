import { OAuthToken } from '@composer/types';
import { Injectable } from '@nestjs/common';
import { OauthService } from './oauth.service';

@Injectable()
export class OAuthFacade {
  tokenStream$ = this.oauthService.tokenStream$;

  constructor(private oauthService: OauthService) {}

  async rereshToken(token: OAuthToken) {
    return this.oauthService.refreshToken(token);
  }

  async revokeToken(token: OAuthToken) {
    console.log('ddd');
    return this.oauthService.revokeToken(token);
  }

  async isTokenValid(token: OAuthToken) {
    return this.oauthService.isTokenValid(token);
  }
}
