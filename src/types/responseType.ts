import { AxiosResponse } from "axios";

export interface TPage {
  pageIndex: number;
  pageCount: number;
}

export interface TResponse<T> {
  valueOrDefault: T | undefined;
  value: T | undefined;
  isSuccess: boolean;
  isFailed: boolean;
}

export type TPaginateResponse<T> = TResponse<
  T & {
    pageSize: number;
    totalCount: number;
  }
>;
