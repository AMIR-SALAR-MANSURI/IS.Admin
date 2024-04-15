export type TApiScopesGetAllList = {
  id: number;
  name: string;
  displayName: string;
  description: string;
  enabled: boolean;
  showInDiscoveryDocument: boolean;
  required: boolean;
  emphasize: boolean;
  userClaims: string[];
};

export interface TApiScopesGetAllType {
  name: string;
}

export interface TApiScopesCreateType {
  showInDiscoveryDocument: boolean;
  id: number;
  name: string;
  displayName: string;
  description: string;
  required: boolean;
  emphasize: boolean;
  enabled: boolean;
  userClaims: [string];
  apiScopeProperties: [
    {
      id: 0;
      key: string;
      value: string;
    }
  ];
}

export interface TApiScopesUpdateType {
  showInDiscoveryDocument: boolean;
  id: number;
  name: string;
  displayName: string;
  description: string;
  required: boolean;
  emphasize: boolean;
  enabled: boolean;
  userClaims: [string];
  apiScopeProperties: [
    {
      id: number;
      key: string;
      value: string;
    }
  ];
}

export interface TApiScopesGet {
  id: number;
  name: string;
  displayName: string;
  description: string;
  enabled: boolean;
  showInDiscoveryDocument: boolean;
  required: boolean;
  emphasize: boolean;
  userClaims: string[];
}
