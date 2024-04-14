import { TPage, TPaginateResponse, TResponse } from "./../types/responseType";
import apiData from "@/constants/identity-resource";
import { IsApiService } from "@/service/IsApiService";
import { TGetResponse } from "./ApiResources";

type GetAllT = TPaginateResponse<{ identityResources: TGetAllResponse[] }>;

export class IdentityResource extends IsApiService {
  async getAll(data: TGetAll & TPage): Promise<GetAllT> {
    return this.axios({ ...apiData.getAll, data: data });
  }

  async create(data: TCreate) {
    return this.axios.request<TResponse<undefined>>({
      ...apiData.create,
      data,
    });
  }

  async get(data: TGet) {
    const url = this.getUrlWithParams(apiData.get.url, {});

    return this.axios<TResponse<TGetResponse>>({
      url,
      method: apiData.get.method,
      data: JSON.stringify(data.id),
    });
  }

  async update(data: TUpdate) {
    return this.axios<TResponse<undefined>>({ ...apiData.update, data }).then(
      (res) => res.data
    );
  }

  async delete(data: TGet) {
    const url = this.getUrlWithParams(apiData.delete.url, data);
    return this.axios.request<TResponse<undefined>>({
      url,
      method: apiData.delete.method,
    });
  }
}

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

export interface TGetAll {
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

export interface TGet {
  id: number;
}
