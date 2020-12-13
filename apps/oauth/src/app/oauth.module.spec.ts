import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { VALID_INTUIT_CONFIG } from '@composer/testing-utilities';
import { OAuthModule } from './oauth.module';
import { OauthService } from './oauth.service';
import { OAuthFacade } from './oauth.facade';

describe('OAuth Module', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [OAuthModule.register(VALID_INTUIT_CONFIG)],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('Services should be instantiated', () => {
    expect(OauthService).toBeDefined();
    expect('IntuitOAuth').toBeDefined();
    expect(OAuthFacade).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
  });
});
