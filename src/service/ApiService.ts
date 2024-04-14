import axios, { AxiosInstance, AxiosHeaders } from "axios";

class ApiService {
  pageIndex?: number;

  pageCount?: number;

  axios: AxiosInstance;

  authority?: string;

  client_id?: string;

  client_secret?: string;

  scope?: string;

  constructor({
    baseUrl,
    version,
    header,
    oid,
  }: {
    baseUrl: string;
    version: number | undefined;
    header?: AxiosHeaders;
    token?: string;
    oid?: boolean;
  }) {
    this.authority = process.env.NEXT_PUBLIC_AUTHORITY;
    this.client_id = process.env.NEXT_PUBLIC_CLIENT_ID;
    this.client_secret = process.env.NEXT_PUBLIC_CLIENT_SECRET;
    this.scope = process.env.NEXT_PUBLIC_SCOP;

    this.axios = axios.create({
      baseURL: `${baseUrl}${version && "/api/v" + version}`,
      headers: {
        ...header,
        "content-type": "application/json",
        Authorization: oid
          ? this.getAuthorization()
          : header?.["Authorization"],
      },
    });
  }

  private getAuthorization() {
    let token = "";

    if (window) {
      let session: any = sessionStorage.getItem(
        `oidc.user:${this.authority}:${this.client_id}`
      );

      if (session) {
        try {
          session = JSON.parse(session);
          token = session?.access_token;
        } catch (error) {
          console.log(error);
        }
      }
    }

    return token;
  }

  addIndexToData(
    data: any[] | undefined,
    keyName: string = "row",
    startFrom: number = 1
  ) {
    if (data && data?.length) {
      return data?.map((item: any, index: number) => ({
        ...item,
        [keyName]: index + startFrom,
      }));
    }

    return [];
  }

  getUrlWithParams(url: string, params: any) {
    let joinedParams = "";

    if (params) {
      const mappedParams = Object.keys(params).map(
        (item) => `${item}=${params[item]}`
      );
      joinedParams = `?${mappedParams.join("&")}`;
    }

    return `${url}${joinedParams}`;
  }
}

export { ApiService };
