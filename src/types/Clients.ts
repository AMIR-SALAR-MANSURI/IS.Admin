export type TApiClientsGetAllList = {
  absoluteRefreshTokenLifetime: number;
  accessTokenLifetime: number;
  consentLifetime: number;
  accessTokenType: number;
  allowAccessTokensViaBrowser: boolean;
  allowOfflineAccess: boolean;
  allowPlainTextPkce: boolean;
  allowRememberConsent: boolean;
  alwaysIncludeUserClaimsInIdToken: boolean;
  alwaysSendClientClaims: boolean;
  authorizationCodeLifetime: boolean;
  frontChannelLogoutUri: string;
  frontChannelLogoutSessionRequired: boolean;
  backChannelLogoutUri: string;
  backChannelLogoutSessionRequired: boolean;
  clientId: string;
  clientName: string;
  clientUri: string;
  description: string;
  enabled: boolean;
  enableLocalLogin: boolean;
  id: number;
  identityTokenLifetime: number;
  includeJwtId: number;
  logoUri: string;
  clientClaimsPrefix: string;
  pairWiseSubjectSalt: string;
  protocolType: string;
  refreshTokenExpiration: number;
  refreshTokenUsage: number;
  slidingRefreshTokenLifetime: number;
  requireClientSecret: boolean;
  requireConsent: boolean;
  requirePkce: boolean;
  updateAccessTokenClaimsOnRefresh: boolean;
  postLogoutRedirectUris: [];
  identityProviderRestrictions: [];
  redirectUris: [];
  allowedCorsOrigins: [];
  allowedGrantTypes: [];
  allowedScopes: [];
  claims: [];
  properties: [];
  updated: string;
  lastAccessed: string;
  userSsoLifetime: number;
  userCodeType: string;
  deviceCodeLifetime: number;
  requireRequestObject: boolean;
  cibaLifetime: number;
  pollingInterval: number;
  coordinateLifetimeWithUserSession: boolean;
  allowedIdentityTokenSigningAlgorithms: [];
  nonEditable: boolean;
};

export interface TApiClientsGetAllType {
  name: string;
}

export interface TApiClientsCreateType {
  absoluteRefreshTokenLifetime: number;
  accessTokenLifetime: number;
  consentLifetime: number;
  accessTokenType: number;
  allowAccessTokensViaBrowser: boolean;
  allowOfflineAccess: boolean;
  allowPlainTextPkce: boolean;
  allowRememberConsent: boolean;
  alwaysIncludeUserClaimsInIdToken: boolean;
  alwaysSendClientClaims: boolean;
  authorizationCodeLifetime: number;
  frontChannelLogoutUri: string;
  frontChannelLogoutSessionRequired: boolean;
  backChannelLogoutUri: string;
  backChannelLogoutSessionRequired: boolean;
  clientId: string;
  clientName: string;
  clientUri: string;
  description: string;
  enabled: boolean;
  enableLocalLogin: boolean;
  id: number;
  identityTokenLifetime: number;
  includeJwtId: boolean;
  logoUri: string;
  clientClaimsPrefix: string;
  pairWiseSubjectSalt: string;
  protocolType: string;
  refreshTokenExpiration: number;
  refreshTokenUsage: number;
  slidingRefreshTokenLifetime: number;
  requireClientSecret: boolean;
  requireConsent: boolean;
  requirePkce: boolean;
  updateAccessTokenClaimsOnRefresh: boolean;
  postLogoutRedirectUris: [string];
  identityProviderRestrictions: [string];
  redirectUris: [string];
  allowedCorsOrigins: [string];
  allowedGrantTypes: [string];
  allowedScopes: [string];
  claims: [
    {
      id: number;
      type: string;
      value: string;
    }
  ];
  properties: [
    {
      id: number;
      key: string;
      value: string;
    }
  ];
  updated: string;
  lastAccessed: string;
  userSsoLifetime: number;
  userCodeType: string;
  deviceCodeLifetime: number;
  requireRequestObject: boolean;
  cibaLifetime: number;
  pollingInterval: number;
  coordinateLifetimeWithUserSession: boolean;
  allowedIdentityTokenSigningAlgorithms: [string];
  nonEditable: boolean;
}

export interface TApiClientsGet {
  absoluteRefreshTokenLifetime: number;
  accessTokenLifetime: number;
  consentLifetime: number;
  accessTokenType: number;
  allowAccessTokensViaBrowser: boolean;
  allowOfflineAccess: boolean;
  allowPlainTextPkce: boolean;
  allowRememberConsent: boolean;
  alwaysIncludeUserClaimsInIdToken: boolean;
  alwaysSendClientClaims: boolean;
  authorizationCodeLifetime: number;
  frontChannelLogoutUri: string;
  frontChannelLogoutSessionRequired: boolean;
  backChannelLogoutUri: string;
  backChannelLogoutSessionRequired: boolean;
  clientId: string;
  clientName: string;
  clientUri: string;
  description: string;
  enabled: boolean;
  enableLocalLogin: boolean;
  id: number;
  identityTokenLifetime: number;
  includeJwtId: boolean;
  logoUri: string;
  clientClaimsPrefix: string;
  pairWiseSubjectSalt: string;
  protocolType: string;
  refreshTokenExpiration: number;
  refreshTokenUsage: number;
  slidingRefreshTokenLifetime: number;
  requireClientSecret: boolean;
  requireConsent: boolean;
  requirePkce: boolean;
  updateAccessTokenClaimsOnRefresh: boolean;
  postLogoutRedirectUris: [];
  identityProviderRestrictions: [];
  redirectUris: [];
  allowedCorsOrigins: [];
  allowedGrantTypes: [];
  allowedScopes: [];
  claims: [];
  properties: [];
  updated: string;
  lastAccessed: string;
  userSsoLifetime: number;
  userCodeType: string;
  deviceCodeLifetime: number;
  requireRequestObject: boolean;
  cibaLifetime: number;
  pollingInterval: number;
  coordinateLifetimeWithUserSession: boolean;
  allowedIdentityTokenSigningAlgorithms: [];
  nonEditable: boolean;
}
export interface TClientGetType {
  id: number;
}
