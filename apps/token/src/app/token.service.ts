import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenService {
  async handleToken(token: any) {
    console.log(token);
  }

  async getToken(realmId: string) {}

  private decipher() {}

  private cipher() {}
}
