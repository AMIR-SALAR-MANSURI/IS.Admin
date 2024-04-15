import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import usePagination from "./usePagination";
import { useState } from "react";
import apiData from "@/constants/Clients";
import customFetcher from "@/service/custome-fetcher";
import { TPage, TPaginateResponse, TResponse } from "@/types/responseType";
import {
  TApiClientsGet,
  TApiClientsGetAllList,
  TApiClientsGetAllType,
  TClientGetType,
} from "@/types/Clients";

const useGetAll = () => {
  const [filter, setFilter] = useState<TApiClientsGetAllType>({ name: "" });

  const pagination = usePagination();

  const pageData: TPage = {
    pageCount: pagination.pageSize,
    pageIndex: pagination.current,
  };

  const query = useQuery({
    queryKey: [apiData.getAll.url, { ...filter }, pageData],
    queryFn: (): Promise<
      TPaginateResponse<{ clients: TApiClientsGetAllList[] }>
    > =>
      customFetcher({
        url: apiData.getAll.url,
        method: apiData.getAll.method,
        data: { ...filter, ...pageData },
        ...filter,
      }),
    select: (data) => data?.value,
  });

  return {
    ...query,
    setFilter: (data: TApiClientsGetAllType) => {
      setFilter(data);
      pagination.onChange(1, pagination.pageSize);
    },
    pagination: { ...pagination, total: query.data?.totalCount },
  };
};

const useGet = (data: TApiClientsGet) => {
  const query = useQuery({
    queryKey: [apiData.get.url, data],
    queryFn: (): Promise<TResponse<TApiClientsGet>> =>
      customFetcher({
        url: apiData.get.url,
        method: apiData.get.method,
        data: data.id,
      }),
    select(data) {
      return data.value;
    },
    // enabled: data.id !== undefined,
  });

  return query;
};

// const useCreate = () => {
//   const queryClient = useQueryClient();

//   const query = useMutation({
//     mutationFn: (data: TApiClientsCreateType) => apiService.create(data),
//     onSuccess(data, variables, context) {
//       queryClient.invalidateQueries({
//         queryKey: [apiData.getAll.url],
//         exact: false,
//       });
//     },
//   });

//   return { ...query };
// };

// const useUpdate = () => {
//   const queryClient = useQueryClient();

//   const query = useMutation({
//     mutationFn: (data: TUpdate) => apiService.update(data),
//     onSuccess(data, variables, context) {
//       queryClient.invalidateQueries({
//         queryKey: [apiData.getAll.url],
//         exact: false,
//       });
//     },
//   });

//   return { ...query };
// };

const useDelete = () => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (data: TClientGetType): Promise<TResponse<undefined>> =>
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

export { useGetAll, useGet, useDelete };
