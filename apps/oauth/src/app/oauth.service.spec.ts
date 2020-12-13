import { OAuthToken } from '@composer/types';
import { Test } from '@nestjs/testing';
import { OauthService } from './oauth.service';
import {
  FAKE_OAUTH_TOKEN,
  FAKE_REFRESHED_OAUTH_TOKEN,
  SAMPLE_AUTH_RESPONSE,
} from '@composer/testing-utilities';

describe('OauthService', () => {
  let service: OauthService;
  let fakeIntuitOAuth = {
    setToken: (token: OAuthToken) => null,
    refreshUsingToken: (token: OAuthToken) =>
      new Promise((resolve, reject) => {
        resolve(SAMPLE_AUTH_RESPONSE);
      }),
    revoke: () =>
      new Promise((resolve, reject) => {
        resolve();
      }),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        OauthService,
        { provide: 'IntuitOAuth', useValue: fakeIntuitOAuth },
      ],
    }).compile();

    service = module.get(OauthService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  describe('buildToken', () => {
    it('should return a properly formatted oauth token from an auth response', () => {
      const token = service.buildToken(SAMPLE_AUTH_RESPONSE);
      expect(token).toHaveProperty('token_type');
      expect(token).toHaveProperty('access_token');
      expect(token).toHaveProperty('expires_in');
      expect(token).toHaveProperty('refresh_token');
      expect(token).toHaveProperty('x_refresh_token_expires_in');
      expect(token).toHaveProperty('id_token');
      expect(token).toHaveProperty('createdAt');
      expect(token).toHaveProperty('realmId');
    });
  });

  describe('refreshToken', () => {
    it('should throw an error when there is no refersh token', async () => {
      const token = FAKE_OAUTH_TOKEN;
      delete token.refresh_token;
      try {
        await service.refreshToken(token);
      } catch (err) {
        expect(err).toBeDefined();
      }
    });
    // it('should return an OAuthToken when functioning properly', async () => {
    //   jest.spyOn(service.buildToken, })
    //   const token = await service.refreshToken(FAKE_OAUTH_TOKEN);
    //   expect(token).toMatchObject(FAKE_REFRESHED_OAUTH_TOKEN);
    // });
  });
});
