import apiData from "@/constants/identity-resource";
import { TCreate, TGet, TGetAll, TUpdate } from "@/lib/IdentityResource";
import customFetcher from "@/service/custome-fetcher";
import { TGetAllResponse, TGetResponse } from "@/types/IdentityResource";
import { TPage, TPaginateResponse, TResponse } from "@/types/responseType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import usePagination from "./usePagination";

const useGetAll = () => {
  const [filter, setFilter] = useState<TGetAll>({ name: "" });

  const pagination = usePagination();

  const pageData: TPage = {
    pageCount: pagination.pageSize,
    pageIndex: pagination.current,
  };

  const query = useQuery({
    queryKey: [apiData.getAll.url, { ...filter }, pageData],
    queryFn: (): Promise<
      TPaginateResponse<{ identityResources: TGetAllResponse[] }>
    > =>
      customFetcher({
        url: apiData.getAll.url,
        data: { ...filter, ...pageData },
        method: apiData.getAll.method,
      }),
    select: (data) => data?.value,
  });

  useEffect(() => {
    if (
      Array.isArray(query.data?.identityResources) &&
      query.data?.identityResources.length == 0
    ) {
      pagination.onChange(pagination.current - 1, pagination.pageSize);
    }
  }, [query.data?.identityResources]);

  return {
    ...query,
    setFilter,
    pagination: { ...pagination, total: query.data?.totalCount },
  };
};

const useGet = (data: TGet) => {
  const query = useQuery({
    queryKey: [apiData.get.url, { id: data.id }],
    queryFn: (): Promise<TResponse<TGetResponse>> =>
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
    mutationFn: (data: TCreate): Promise<TResponse<undefined>> =>
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
    mutationFn: (data: TUpdate): Promise<TResponse<undefined>> =>
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
    mutationFn: (data: TGet): Promise<TResponse<undefined>> =>
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
