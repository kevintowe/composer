import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { VALID_INTUIT_CONFIG } from '@composer/testing-utilities';
import { OAuthModule } from './oauth.module';
import { OauthService } from './oauth.service';

describe('OAuth', () => {
  let app: INestApplication;
  let intuitOAuth = {
    authorizeUri: ({}) => 'https://google.com',
    createToken: (parseRedirect: any) =>
      new Promise((resolve, reject) => {
        resolve({});
      }),
  };
  let oauthService = { emitToken: (): void => null, buildToken: () => {} };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [OAuthModule],
      providers: [OauthService],
    })
      .overrideProvider('IntuitOAuth')
      .useValue(intuitOAuth)
      .overrideProvider('IntuitConfig')
      .useValue(VALID_INTUIT_CONFIG)
      .overrideProvider(OauthService)
      .useValue(oauthService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('/intuit/oauth/authorize', () => {
    it('should redirect the request with status 302', () => {
      return request(app.getHttpServer())
        .get('/intuit/oauth/authorize')
        .expect(302);
    });
  });

  describe('/intuit/oauth/redirect', () => {
    it('should redirect the request to the front end redirect uri if authorization was granted', () => {
      return request(app.getHttpServer())
        .get('/intuit/oauth/redirect')
        .expect(302);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});

import { IntuitOAuthFactory } from './oauth.factory';
import { INVALID_INTUIT_CONFIG } from '@composer/testing-utilities';

describe('IntuitOAuthFactory', () => {
  beforeEach(() => {});

  describe('Proper Instantiation', () => {
    it('Should return an object', () => {
      const client = IntuitOAuthFactory()(VALID_INTUIT_CONFIG);
      expect(client).toBeDefined();
      expect(
        client.environment !== null &&
          client.clientId !== null &&
          client.clientSecret !== null &&
          client.redirectUri !== null
      );
    });
  });
  describe('Improper Instantiation', () => {
    it('should throw an error', () => {
      expect(() => {
        IntuitOAuthFactory()(INVALID_INTUIT_CONFIG);
      }).toThrow(Error);
    });
  });
});
