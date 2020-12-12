import { IntuitConfig, OAuthToken } from '@composer/types';

export const VALID_INTUIT_CONFIG: IntuitConfig = {
  clientId: 'asdf87as6df567ad8f7s65df67',
  clientSecret: '3jehrgvhj3244hgvbh3jnh',
  verifierToken: 'j3nhbvg4hjn2km3nbh5432n',
  redirectUri: 'http://hello.com',
  environment: 'sandbox',
};
export const VALID_INTUIT_CONFIG_PROD: IntuitConfig = {
  ...VALID_INTUIT_CONFIG,
  environment: 'production',
};

export const INVALID_INTUIT_CONFIG = {} as IntuitConfig;

// this oauth token is valid for testing purposes only
export const FAKE_REFRESHED_OAUTH_TOKEN: OAuthToken = {
  token_type: 'bearer',
  access_token:
    'eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn09BCwa7VAWCclvZEjPJSbgKWrdws1tEsuYn3FbdK4LZS6hX4HKupXRa6lEnvqgthcs8Vh3bnMsrDf1aHITdfuZzaXN1TMAz4TNiur7MRC1uY1fZFKh55UuwdI0ULMAgc7Q0zLB7jUmJmpj7WTO1BuHMAt5ZaPYi8n',
  expires_in: 3600,
  refresh_token: 'AB11616259192JwtVWjqyLW92JwtVWjqyLWHaserWWhPWhPB4r5VFz',
  x_refresh_token_expires_in: 8726400,
  id_token: '',
  createdAt: 1607532792116,
  realmId: '123155917998999',
};
export const FAKE_OAUTH_TOKEN: OAuthToken = {
  token_type: 'bearer',
  access_token:
    'eyJlbmMiasdfMTI4Q0JDLUheawroiZGlyIn09BCwa7VAWCclvZEjPJSbgKWrd_ws1tEsuYn3FbdK4LZS6hX4HKupXRa6lEnvqgthcs8Vh3bnMsrDf1aHITdfuZzaXN1_TMAz4TNiur7MRC1uY1fZFKh55Uu_wdI0ULMAgc7Q0zLB7jUmJmpj7WTO1BuHMAt5ZaPYawer8n-pIOrvgepnNu1LE_iY7Wi3y406LqqPn2VSF8Fz94ZAS55qmT_RgX7CUhBVv7Z7rmYqmlvvtev890gZ6bckm3YKnZ7VAPbm_1SwDaeI4bsKYHkasdfbsCjBm5BYc65aR9v2n-n61ovX-txn47PkAkpB0KwOilVXJe_30uJQD__q7HvkFVCoyQuG9c0fU7_93eKpSQVY9vJB0NH-OfjDVFpbCD-0HGDy6vD7-E3bbiYzfbgVAZ1XJFHrzyWjzRZbhRsITfoj5BNR-SKYsadfg7FEWJ63dtu5_TlLDV9cjxh4llbhRyefE186hUAjlCmBeh1T_h2To4renYv0_2rXTaZBzY-zBDDlLdAGdWow88CaXZ57uA32zy1i2Cx8JcVed-QWcjd6PrPZcQeVtvkkLrxLqxPPZmNC_uYzeiY-t_YfFm1QeSKrJ9_vT_K_cgsqvmAKls6kGqgoBcVwBPw5yDYzMTU5HiwRsnasdfn2mPOP8gGP-oNUez7rzo4OW-6SBvn8ZPCkwjzF-asdfjb3nrldvh4fnl3dvggbvy37367cbgdfgfgdhd',
  expires_in: 3600,
  refresh_token: 'AB1161asertVWjqyLW92JwtVWjqsaerB4r5VFz',
  x_refresh_token_expires_in: 8726400,
  id_token: '',
  createdAt: 1607532892116,
  realmId: '123155917998999',
};

export const SAMPLE_AUTH_RESPONSE = {
  token: {
    realmId: '123155917998999',
    token_type: 'bearer',
    access_token:
      'eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn09BCwa7VAWCclvZEjPJSbgKWrdws1tEsuYn3FbdK4LZS6hX4HKupXRa6lEnvqgthcs8Vh3bnMsrDf1aHITdfuZzaXN1TMAz4TNiur7MRC1uY1fZFKh55UuwdI0ULMAgc7Q0zLB7jUmJmpj7WTO1BuHMAt5ZaPYi8n',
    refresh_token: 'AB11616259192JwtVWjqyLW92JwtVWjqyLWHaserWWhPWhPB4r5VFz',
    expires_in: 3600,
    x_refresh_token_expires_in: 8726400,
    id_token: '<id_token>',
    latency: 60000,
  },
  response: {
    url: 'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
      'content-length': '61',
      connection: 'close',
      server: 'nginx',
      'strict-transport-security': 'max-age=15552000',
      intuit_tid: '1234-1234-1234-123',
      'cache-control': 'no-cache, no-store',
      pragma: 'no-cache',
    },
    body:
      '{"id_token":"<id_token>","expires_in":3600,"token_type":"bearer","x_refresh_token_expires_in":8726400,"refresh_token":"<refresh_token>","access_token":"<access_token>"}',
    status: 200,
    statusText: 'OK',
  },
  body:
    '{"id_token":"<id_token>","expires_in":3600,"token_type":"bearer","x_refresh_token_expires_in":8726400,"refresh_token":"<refresh_token>","access_token":"<access_token>"}',
  json: {
    access_token: '<access_token>',
    refresh_token: '<refresh_token>',
    token_type: 'bearer',
    expires_in: '3600',
    x_refresh_token_expires_in: '8726400',
    id_token: '<id_token>',
  },
  intuit_tid: '4245c696-3710-1548-d1e0-d85918e22ebe',
};
