import { Inject, Injectable } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';
import { OAuthToken } from '@composer/types';
import { resolve } from 'url';

@Injectable()
export class OauthService {
  private _tokenStream = new BehaviorSubject<OAuthToken>(null);
  tokenStream$ = this._tokenStream.asObservable();

  constructor(@Inject('IntuitOAuth') private intuitOAuth: any) {}

  emitToken(token: OAuthToken) {
    this._tokenStream.next(token);
  }

  buildToken(authResponse: any) {
    const token: OAuthToken = {
      token_type: authResponse.token.token_type,
      access_token: authResponse.token.access_token,
      expires_in: authResponse.token.expires_in,
      refresh_token: authResponse.token.refresh_token,
      x_refresh_token_expires_in: authResponse.token.x_refresh_token_expires_in,
      id_token: authResponse.token.id_token,
      createdAt: Date.now(),
      realmId: authResponse.token.realmId,
    };
    return token;
  }

  async refreshToken(token: OAuthToken) {
    const client = this.intuitOAuth;

    return new Promise<OAuthToken>((resolve, reject) => {
      try {
        client.setToken(token);
        client.refreshUsingToken(token.refresh_token).then((authResponse) => {
          const token = this.buildToken(authResponse);
          this.emitToken(token);
          resolve(token);
        });
      } catch (err) {
        console.log(err);
      }
    });
  }

  async revokeToken(token: OAuthToken) {
    return new Promise<void>((resolve, reject) => {
      try {
        const client = this.intuitOAuth;
        client.setToken(token);
        client.revoke().then((authResponse) => {
          resolve();
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  async isTokenValid(token: OAuthToken) {
    let client = this.intuitOAuth.setToken(token);
    if (client.isAccessTokenValid) return token;
    else return this.refreshToken(token);
  }
}
