import type { AxiosRequestConfig, CreateAxiosDefaults } from 'axios';
import axios from 'axios';
import { nanoid } from 'nanoid';

declare module 'axios' {
  interface AxiosRequestConfig {
    requestId?: string;
  }
}

export class AbortError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AbortError';
  }
}

const DEFAULT_AXIOS_CONFIG: CreateAxiosDefaults = {
  baseURL: '',
  timeout: 1 * 1000 * 60,
  headers: {
    'Content-Type': 'application/json',
  },
};

export interface HttpClientOptions extends CreateAxiosDefaults {
  onRequest?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  onError?: (error: any) => void;
}

function unwrapResult(result: any) {
  if (result instanceof Error || result.name === 'AbortError') {
    throw result;
  }
  return result;
}

/**
 * TODO：这个封装有待斟酌，真的有必要吗，有哪些好处
 * @param config
 */
export default function createHttpClient(config?: HttpClientOptions) {
  const instance = axios.create(Object.assign(DEFAULT_AXIOS_CONFIG, config));

  function request<T, D = any>(
    options: AxiosRequestConfig<D>,
  ): Promise<T> & { requestId: string; abort: (reason?: string) => void; unwrap: () => Promise<T> } {
    const requestId = nanoid();

    const abortController = new AbortController();
    let abortReason: string | undefined;
    let abortHandler: (() => void) | undefined;

    function abort(reason?: string) {
      abortReason = reason;
      abortController.abort();
    }

    const promise = (async function () {
      let finalResult: any;
      try {
        // TODO: 也许并不需要这个
        const abortedPromise = new Promise<never>((_, reject) => {
          abortHandler = () => {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject({
              name: 'AbortError',
              message: abortReason || 'Aborted',
            });
          };
          abortController.signal.addEventListener('abort', abortHandler);
        });

        const _config = config?.onRequest?.(options) || options;

        finalResult = await Promise.race([
          abortedPromise,
          instance.request<T>({
            ..._config,
            requestId,
            signal: abortController.signal,
          }),
        ]).then((res) => {
          return res.data;
        });
      } catch (error) {
        if (config?.onError) {
          config.onError(error);
        }
        finalResult = error;
      } finally {
        if (abortHandler) {
          abortController.signal.removeEventListener('abort', abortHandler);
        }
      }

      return finalResult;
    })();

    return Object.assign(promise, {
      requestId,
      abort,
      unwrap() {
        return promise.then<T>(unwrapResult);
      },
    });
  }

  function post<T, D = any>(url: string, config?: AxiosRequestConfig<D>) {
    return request<T, D>({
      url,
      method: 'POST',
      ...config,
    });
  }

  function get<T>(url: string, config?: AxiosRequestConfig) {
    return request<T>({
      url,
      method: 'GET',
      ...config,
    });
  }

  return {
    post,
    get,
  };
}
