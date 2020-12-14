import { Controller, Inject } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
const _IntuitOAuth = require('intuit-oauth');
import { OauthService } from './oauth.service';

@Controller()
export class OAuthController {
  constructor(
    @Inject('IntuitOAuth') private intuitOAuth: any,
    private oauthService: OauthService
  ) {}

  @MessagePattern({ cmd: 'authorize' })
  async authorize(): Promise<string> {
    const authUri = this.intuitOAuth.authorizeUri({
      scope: [_IntuitOAuth.scopes.Accounting],
      state: null,
    });
    return authUri;
  }

  @MessagePattern({ cmd: 'handleRedirect' })
  async handleRedirect(url: string): Promise<void> {
    try {
      this.intuitOAuth.createToken(url).then((response) => {
        this.oauthService.emitToken(this.oauthService.buildToken(response));
        return;
      });
    } catch (err) {
      return err;
    }
  }
}
