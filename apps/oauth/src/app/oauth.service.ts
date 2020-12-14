import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BehaviorSubject } from 'rxjs';
import { OAuthToken } from '@composer/types';
const IntuitOAuth = require('intuit-oauth');

@Injectable()
export class OauthService {
  private _tokenStream = new BehaviorSubject<OAuthToken>(null);
  tokenStream$ = this._tokenStream.asObservable();

  constructor(
    @Inject('IntuitOAuth') private intuitOAuth: any,
    @Inject('TokenService') private tokenService: ClientProxy
  ) {}

  buildAuthorizeUri(): string {
    return this.intuitOAuth.authorizeUri({
      scope: [IntuitOAuth.scopes.Accounting],
      state: null,
    });
  }

  async handleRedirect(url: string) {
    this.intuitOAuth.createToken(url).then(async (response) => {
      await this.saveToken(this.buildToken(response));
    });
  }

  async saveToken(token: OAuthToken) {
    return new Promise<void>((resolve, reject) => {
      this.tokenService
        .send<{ status: boolean; err?: any }>('process-token', token)
        .subscribe((response) => {
          if (response.status) {
            resolve();
          } else {
            reject(response.err);
          }
        });
    });
  }

  private buildToken(authResponse: any) {
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
          this.saveToken(token);
          resolve(token);
        });
      } catch (err) {
        console.log(err);
      }
    });
  }

  async disconnectApp() {
    this.intuitOAuth.revoke().then((authResponse) => {
      return;
    });
  }

  async isTokenValid(token: OAuthToken) {
    let client = this.intuitOAuth.setToken(token);
    if (client.isAccessTokenValid) return token;
    else return this.refreshToken(token);
  }
}
