import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { TokenService } from './token.service';

const logger = new Logger('Token Controller');

@Controller()
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @MessagePattern('process-token')
  async processToken(token: any): Promise<{ status: boolean; err?: any }> {
    logger.log('process token');
    try {
      await this.tokenService.handleToken(token);
      return { status: true };
    } catch (err) {
      return { status: false, err };
    }
  }

  @MessagePattern('get-token')
  async getToken(): Promise<{ status: boolean; token?: any; err?: any }> {
    try {
      return { status: true, token: await await this.getToken() };
    } catch (err) {
      return { status: false, err };
    }
  }
}
