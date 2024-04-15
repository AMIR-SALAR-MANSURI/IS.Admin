import apiData from "@/constants/api-scopes";
import customFetcher from "@/service/custome-fetcher";
import { TPage, TPaginateResponse, TResponse } from "@/types/responseType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import usePagination from "./usePagination";
import {
  TApiScopesCreateType,
  TApiScopesGet,
  TApiScopesGetAllList,
  TApiScopesGetAllType,
  TApiScopesUpdateType,
} from "@/types/ApiScopes";

const useGetAll = () => {
  const [filter, setFilter] = useState<TApiScopesGetAllType>({ name: "" });

  const pagination = usePagination();

  const pageData: TPage = {
    pageCount: pagination.pageSize,
    pageIndex: pagination.current,
  };

  const query = useQuery({
    queryKey: [apiData.getAll.url, { ...filter }, pageData],
    queryFn: (): Promise<
      TPaginateResponse<{ scopes: TApiScopesGetAllList[] }>
    > =>
      customFetcher({
        url: apiData.getAll.url,
        data: { ...filter, ...pageData },
        method: apiData.getAll.method,
      }),
    select: (data) => data?.value,
  });

  useEffect(() => {
    if (Array.isArray(query.data?.scopes) && query.data?.scopes.length == 0) {
      pagination.onChange(pagination.current - 1, pagination.pageSize);
    }
  }, [query.data?.scopes]);

  return {
    ...query,
    setFilter,
    pagination: { ...pagination, total: query.data?.totalCount },
  };
};

const useGet = (data: { id: number }) => {
  const query = useQuery({
    queryKey: [apiData.get.url, { id: data.id }],
    queryFn: (): Promise<TResponse<TApiScopesGet>> =>
      customFetcher({
        url: apiData.get.url,
        data: data.id,
        method: apiData.get.method,
      }),
    enabled: data.id !== undefined,
    select(data) {
      data.value;
    },
  });

  return query;
};

const useCreate = () => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (data: TApiScopesCreateType): Promise<TResponse<undefined>> =>
      customFetcher({
        url: apiData.create.url,
        data,
        method: apiData.create.method,
      }),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: [apiData.getAll.url],
        exact: false,
      });
    },
  });

  return { ...query };
};

const useUpdate = () => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (data: TApiScopesUpdateType): Promise<TResponse<undefined>> =>
      customFetcher({
        url: apiData.update.url,
        data,
        method: apiData.update.method,
      }),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: [apiData.getAll.url],
        exact: false,
      });
    },
  });

  return { ...query };
};

const useDelete = () => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (data: { id: number }): Promise<TResponse<undefined>> =>
      customFetcher({
        url: apiData.delete.url,
        params: data,
        method: apiData.delete.method,
      }),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: [apiData.getAll.url],
        exact: false,
      });
    },
  });

  return { ...query };
};

export { useCreate, useDelete, useGet, useGetAll, useUpdate };
