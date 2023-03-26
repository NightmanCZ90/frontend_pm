import { axiosPrivate } from './axios';

type Query = Record<string, any>;

type RestApiValidationError = {
  value: string;
  msg: string;
}

export interface RestApiError extends Error {
  data?: RestApiValidationError[];
  statusText?: string;
}

interface RequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  url: string,
  query?: Query,
  body?: any,
  headers?: Record<string, string>,
}

abstract class ApiClient {
  baseUrl!: string;

  /**
   * Converts `Query` object to match the type of `URLSearchParams`.
   */
  getQueryObject = (query?: Query): Record<string, string> => Object.entries(query ?? {})
    .reduce((entries, entry) => ({
      ...entries, [entry[0].toString()]: entry[1],
    }), {});

  getUrl = (resourceUrl: string) => new URL(resourceUrl, this.baseUrl).href;

  async axiosRequest<T>(options: RequestOptions) {
    try {
      const { data } = await axiosPrivate.request<T>({
        url: options.url,
        method: options.method,
        data: options.body,
      })
      return data;
    } catch (err: any) {
      // TODO: Fix Error types
      const error: RestApiError = new Error();
      error.message = err?.response?.data?.message || err?.message;
      error.data = err?.response?.data?.data;
      error.statusText = err?.response.statusText;
      throw error;
    }
  }
}

export default ApiClient;