import { AxiosHeaders, AxiosInstance } from "axios";
// import { GeneralResponseType } from "../@types/general";
import { GetServerSidePropsContext } from "next";
import { IsApiService } from "./IsApiService";

type Props = {
  url: string;
  axiosInstance?: AxiosInstance;
  params?: Record<string, string | number>;
  data?: any;
  headers?: AxiosHeaders;
  method?: "GET" | "POST" | "PUT" | "DELETE" | string;
  cache?: RequestCache;
  token?: string;
  notify?: boolean;
  context?: GetServerSidePropsContext;
};

const baseAxios = new IsApiService();

async function customFetcher(props: Props) {
  const { url, axiosInstance, params, data, headers, method, notify } = props;

  const BaseAxios = axiosInstance || baseAxios.axios;

  const finalUrl = baseAxios.getUrlWithParams(BaseAxios.getUri() + url, params);

  console.log(url);

  let logEntry = {
    timestamp: new Date().toISOString(),
    method: method || "GET",
    path: finalUrl,
    status: "0",
    // token: token,
    message: "",
    data: null as any,
  };

  try {
    const response = await BaseAxios.request({
      url: finalUrl,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
        ...headers,
      },
      method: method || "GET",
      data: data,
    });

    const responseBody = await response.data;

    console.log(logEntry);

    return responseBody;
  } catch (error: any) {
    logEntry.message = error.message;
    logEntry.status = `${error?.response?.status}`;
    logEntry.data = JSON.stringify(error?.response?.data);

    console.error("Request Network/Error:", logEntry);

    return {
      notify: notify || true,
      message: error?.response?.data?.message || error.message,
      status: error?.response?.status || error.status,
      ok: false,
      ...error?.response?.data,
    };
  }
}

export default customFetcher;
