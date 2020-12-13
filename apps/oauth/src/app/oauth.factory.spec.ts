import { IntuitOAuthFactory } from './oauth.factory';
import {
  INVALID_INTUIT_CONFIG,
  VALID_INTUIT_CONFIG,
} from '@composer/testing-utilities';

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
