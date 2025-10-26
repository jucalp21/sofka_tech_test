import { env } from "../../config/env";
import type { ApiResponse, RequestOptions } from "./httpTypes";

const DEFAULT_TIMEOUT = 10_000;

export class ApiClient {
  private readonly baseUrl: string;
  constructor(baseUrl = env.apiBaseUrl) {
    this.baseUrl = baseUrl;
  }

  async request<TResp = unknown, TBody = unknown>(
    opts: RequestOptions<TBody>
  ): Promise<ApiResponse<TResp>> {
    const {
      method = "GET",
      path,
      body,
      headers,
      timeoutMs = DEFAULT_TIMEOUT,
    } = opts;

    const url =
      this.baseUrl.replace(/\/+$/, "") + "/" + path.replace(/^\/+/, "");
    const signal = (AbortSignal as any).timeout
      ? AbortSignal.timeout(timeoutMs)
      : undefined;

    try {
      const res = await fetch(url, {
        method,
        signal,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...headers,
        },
        body: body !== undefined ? JSON.stringify(body) : undefined,
      });

      const contentType = res.headers.get("content-type") ?? "";
      const isJson = contentType.includes("application/json");

      if (!res.ok) {
        const problem = isJson ? await res.json() : { title: res.statusText };
        return { ok: false, status: res.status, problem };
      }

      const data = isJson ? await res.json() : (undefined as unknown as TResp);
      return { ok: true, status: res.status, data };
    } catch (err: any) {
      return {
        ok: false,
        status: 0,
        problem: {
          title: err?.name ?? "NetworkError",
          detail: err?.message ?? "Network error",
        },
      };
    }
  }
}
