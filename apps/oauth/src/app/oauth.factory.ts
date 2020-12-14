const OAuthClient = require('intuit-oauth');
import { OAuthConfig } from './oauth.module';

/**
 * Intuit OAuth Factory + Provider
 */
export function IntuitOAuthFactory() {
  return (config: OAuthConfig) => {
    const client = new OAuthClient({
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      environment: config.environment,
      redirectUri: config.redirectUri,
    });
    if (
      (client.environment ||
        client.clientId ||
        client.clientSecret ||
        client.redirectUri) === undefined
    ) {
      throw Error(
        'The Intuit OAuth client failed to instantiate. Verify you are passing in a proper config.'
      );
    } else {
      return client;
    }
  };
}
