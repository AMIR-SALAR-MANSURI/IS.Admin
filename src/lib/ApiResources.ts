import { TPage, TPaginateResponse, TResponse } from "./../types/responseType";
import apiData from "@/constants/api-resource";
import { IsApiService } from "@/service/IsApiService";

type GetAllT = TPaginateResponse<{ apiResources: TGetAllResponse[] }>;

export class ApiResources extends IsApiService {
  async getAll(data: TGetAll & TPage): Promise<GetAllT> {
    return this.axios({ ...apiData.getAll, data: data });
  }

  async create(data: TCreate) {
    return this.axios<TResponse<undefined>>({ ...apiData.create, data });
  }

  async get(data: TGet) {
    const url = this.getUrlWithParams(apiData.get.url, {});

    return this.axios.request<TResponse<TGetResponse>>({
      url,
      method: apiData.get.method,
      data: JSON.stringify(data.id),
    });
  }

  async update(data: TUpdate) {
    return this.axios<TResponse<undefined>>({ ...apiData.update, data });
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
