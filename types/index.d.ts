import { FastifyPluginCallback, FastifyRequest } from 'fastify';

interface FastifyOauth2 extends FastifyPluginCallback<fastifyOauth2.FastifyOAuth2Options> {
  APPLE_CONFIGURATION: fastifyOauth2.ProviderConfiguration;
  DISCORD_CONFIGURATION: fastifyOauth2.ProviderConfiguration;
  FACEBOOK_CONFIGURATION: fastifyOauth2.ProviderConfiguration;
  GITHUB_CONFIGURATION: fastifyOauth2.ProviderConfiguration;
  LINKEDIN_CONFIGURATION: fastifyOauth2.ProviderConfiguration;
  GOOGLE_CONFIGURATION: fastifyOauth2.ProviderConfiguration;
  MICROSOFT_CONFIGURATION: fastifyOauth2.ProviderConfiguration;
  SPOTIFY_CONFIGURATION: fastifyOauth2.ProviderConfiguration;
  VKONTAKTE_CONFIGURATION: fastifyOauth2.ProviderConfiguration;
  TWITCH_CONFIGURATION: fastifyOauth2.ProviderConfiguration;
  VATSIM_CONFIGURATION: fastifyOauth2.ProviderConfiguration;
  VATSIM_DEV_CONFIGURATION: fastifyOauth2.ProviderConfiguration;
  EPIC_GAMES_CONFIGURATION: fastifyOauth2.ProviderConfiguration;
}

declare namespace fastifyOauth2 {
  export interface FastifyOAuth2Options {
    name: string;
    scope?: string[];
    credentials: Credentials;
    callbackUri: string;
    callbackUriParams?: Object;
    tokenRequestParams?: Object;
    generateStateFunction?: Function;
    checkStateFunction?: Function;
    startRedirectPath?: string;
    tags?: string[];
    schema?: object;
  }

  export interface Token {
    token_type: 'bearer';
    access_token: string;
    refresh_token?: string;
    expires_in: number;
    expires_at: Date;
  }

  export interface OAuth2Token {
    /**
     * Immutable object containing the token object provided while constructing a new access token instance.
     * This property will usually have the schema as specified by RFC6750,
     * but the exact properties may vary between authorization servers.
     */
    token: Token;

    /**
     * Determines if the current access token is definitely expired or not
     * @param expirationWindowSeconds Window of time before the actual expiration to refresh the token. Defaults to 0.
     */
    expired(expirationWindowSeconds?: number): boolean;

    /** Refresh the access token */
    refresh(params?: {}): Promise<OAuth2Token>;

    /** Revoke access or refresh token */
    revoke(tokenType: 'access_token' | 'refresh_token'): Promise<void>;

    /** Revoke both the existing access and refresh tokens */
    revokeAll(): Promise<void>;
  }

  export interface ProviderConfiguration {
    /** String used to set the host to request the tokens to. Required. */
    tokenHost: string;
    /** String path to request an access token. Default to /oauth/token. */
    tokenPath?: string | undefined;
    /** String path to revoke an access token. Default to /oauth/revoke. */
    revokePath?: string | undefined;
    /** String used to set the host to request an "authorization code". Default to the value set on auth.tokenHost. */
    authorizeHost?: string | undefined;
    /** String path to request an authorization code. Default to /oauth/authorize. */
    authorizePath?: string | undefined;
  }

  export interface Credentials {
    client: {
      /** Service registered client id. Required. */
      id: string;
      /** Service registered client secret. Required. */
      secret: string;
      /** Parameter name used to send the client secret. Default to client_secret. */
      secretParamName?: string | undefined;
      /** Parameter name used to send the client id. Default to client_id. */
      idParamName?: string | undefined;
    };
    auth: ProviderConfiguration;
    /**
     * Used to set global options to the internal http library (wreck).
     * All options except baseUrl are allowed
     * Defaults to header.Accept = "application/json"
     */
    http?: {} | undefined;
    options?: {
      /** Format of data sent in the request body. Defaults to form. */
      bodyFormat?: "json" | "form" | undefined;
      /**
       * Indicates the method used to send the client.id/client.secret authorization params at the token request.
       * If set to body, the bodyFormat option will be used to format the credentials.
       * Defaults to header
       */
      authorizationMethod?: "header" | "body" | undefined;
    } | undefined;
  }

  export interface OAuth2Namespace {
    getAccessTokenFromAuthorizationCodeFlow(
      request: FastifyRequest,
    ): Promise<OAuth2Token>;

    getAccessTokenFromAuthorizationCodeFlow(
      request: FastifyRequest,
      callback: (err: any, token: OAuth2Token) => void,
    ): void;

    getNewAccessTokenUsingRefreshToken(
      refreshToken: Token,
      params: Object,
      callback: (err: any, token: OAuth2Token) => void,
    ): void;

    getNewAccessTokenUsingRefreshToken(refreshToken: Token, params: Object): Promise<OAuth2Token>;

    generateAuthorizationUri(
      request: FastifyRequest,
    ): string;
  }

  export const fastifyOauth2: FastifyOauth2
  export { fastifyOauth2 as default }
}

declare function fastifyOauth2(...params: Parameters<FastifyOauth2>): ReturnType<FastifyOauth2>
export = fastifyOauth2
