import { Injectable, Logger } from '@nestjs/common';

const logger = new Logger('Token Service');

@Injectable()
export class TokenService {
  async handleToken(token: any) {
    logger.log(token);
  }

  async getToken(realmId: string) {}

  private decipher() {}

  private cipher() {}
}
