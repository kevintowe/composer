import { DynamicModule, Module } from '@nestjs/common';

import { TokenController } from './token.controller';
import { TokenService } from './token.service';

export interface TokenConfig {}

@Module({
  imports: [],
  controllers: [TokenController],
  providers: [TokenService],
})
export class TokenModule {
  static register(config: TokenConfig): DynamicModule {
    return {
      module: TokenModule,
    };
  }
}
