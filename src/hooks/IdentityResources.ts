import {
  IdentityResource,
  TCreate,
  TGet,
  TGetAll,
  TUpdate,
} from "@/lib/IdentityResource";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import usePagination from "./usePagination";
import { useState } from "react";
import apiData from "@/constants/identity-resource";

const apiService = new IdentityResource();

const useGetAll = () => {
  const [filter, setFilter] = useState<TGetAll>({ name: "" });

  const pagination = usePagination();

  const pageData = {
    page: pagination.current,
    pageIndex: pagination.pageSize,
  };

  const query = useQuery({
    queryKey: [apiData.getAll.url, { ...filter }, pageData],
    queryFn: () =>
      apiService.getAll({
        pageCount: pagination.pageSize,
        pageIndex: pagination.current,
        ...filter,
      }),
    // select: (data) => data?.value,
  });

  return {
    ...query,
    setFilter,
    pagination: { ...pagination, total: 50 },
  };
};

const useGet = (data: TGet) => {
  const query = useQuery({
    queryKey: [apiData.get.url, data],
    queryFn: () => apiService.get(data),
    enabled: data.id !== undefined,
    select(data) {
      data.data.value;
    },
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
