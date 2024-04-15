export type TGetAllResponse = {
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

export interface TGetAllType {
  name: string;
}

export interface TCreate {
  name: string;
  displayName: string;
  description: string;
  enabled: boolean;
  showInDiscoveryDocument: boolean;
  required: boolean;
  emphasize: boolean;
  userClaims: string[];
}

export interface TUpdate {
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

export interface TGetType {
  id: number;
}

export interface TGetResponse {
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
