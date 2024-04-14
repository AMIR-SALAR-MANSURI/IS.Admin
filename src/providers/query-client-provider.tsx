"use client";

import React from "react";
import {
  QueryClient,
  MutationCache,
  QueryClientProvider as TanstackQueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import useMessage from "antd/es/message/useMessage";

const key = "toast"

const QueryClientProvider = ({ children }: { children: React.ReactNode }) => {

  const [messageApi, contextHolder] = useMessage()

  const queryClient = new QueryClient({
    mutationCache: new MutationCache({
      // onMutate: () => messageApi.loading({ key, type: "loading", content: "در حال بارگزاری" }),
      onSuccess: (data, variables, context, mutation) => {
        console.log(data);

        messageApi.success("test")
      },
      onError: (error, variable, context, mutation) => {
        console.log(error);

        messageApi.error("test")
      }
    })
  });

  return (
    <TanstackQueryClientProvider client={queryClient}>
      {children}
      {contextHolder}
      <ReactQueryDevtools initialIsOpen={true} />
    </TanstackQueryClientProvider>
  );
};

export default QueryClientProvider;
