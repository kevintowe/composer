import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { OauthService } from './oauth.service';
const logger = new Logger('OAuth Controller');

@Controller()
export class OAuthController {
  constructor(private oauthService: OauthService) {}

  @MessagePattern('authorize')
  async authorize(): Promise<{ status: boolean; uri?: string }> {
    logger.log('authorize message received');
    const authUri = this.oauthService.buildAuthorizeUri();
    return { status: true, uri: authUri };
  }

  @MessagePattern('oauthRedirect')
  async redirect(url: string): Promise<{ status: boolean; err?: any }> {
    logger.log('authorize redirect message received');
    try {
      await this.oauthService.handleRedirect(url);
      return { status: true };
    } catch (err) {
      return { status: false, err };
    }
  }

  @MessagePattern('disconnect')
  async disconnect() {
    try {
      await this.oauthService.disconnectApp();
    } catch (err) {}
  }
}
