import {
  ApiResources,
  TCreate,
  TGet,
  TGetAll,
  TUpdate,
} from "@/lib/ApiResources";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import usePagination from "./usePagination";
import { useState } from "react";
import apiData from "@/constants/api-resource";
import customFetcher from "@/service/custome-fetcher";
import { TPage, TPaginateResponse } from "@/types/responseType";
import { TApiResourceGetAllList } from "@/types/ApiResource";

const apiService = new ApiResources();

const useGetAll = () => {
  const [filter, setFilter] = useState<TGetAll>({ name: "" });

  const pagination = usePagination();

  const pageData: TPage = {
    pageCount: pagination.pageSize,
    pageIndex: pagination.current,
  };

  const query = useQuery({
    queryKey: [apiData.getAll.url, { ...filter }, pageData],
    queryFn: (): Promise<TPaginateResponse<TApiResourceGetAllList[]>> =>
      customFetcher({
        url: apiData.getAll.method,
        data: { ...filter, ...pageData },
        ...filter,
      }),
    select: (data) => data?.value,
  });

  return {
    ...query,
    setFilter: (data: TGetAll) => {
      setFilter(data);
      pagination.onChange(1, pagination.pageSize);
    },
    pagination: { ...pagination, total: query.data?.totalCount },
  };
};

const useGet = (data: TGet) => {
  const query = useQuery({
    queryKey: [apiData.get.url, data],
    queryFn: () => apiService.get(data),
    select(data) {
      return data.data.valueOrDefault;
    },
    enabled: data.id !== undefined,
  });

  return query;
};

const useCreate = () => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (data: TCreate) => apiService.create(data),
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
    mutationFn: (data: TUpdate) => apiService.update(data),
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
    mutationFn: (data: TGet) => apiService.delete(data),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: [apiData.getAll.url],
        exact: false,
      });
    },
  });

  return { ...query };
};

export { useGetAll, useGet, useCreate, useDelete, useUpdate };
