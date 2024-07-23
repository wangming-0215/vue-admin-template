import {
  type DefaultBodyType,
  type HttpResponseResolver,
  type PathParams,
  delay,
} from 'msw';

export const BASE_URL = '/api/v1';

/** cspell: disable-next-line */
export const SECRET = '__WANGXIAOMING_02_14__';

export function predicate<T extends string>(predicate: T): `${typeof BASE_URL}${T}` {
  return `${BASE_URL}${predicate}`;
}

export async function enableMocking() {
  if (import.meta.env.MODE !== 'development') {
    return Promise.resolve();
  }

  const { worker } = await import('./browser');

  return worker.start({
    onUnhandledRequest(request, print) {
      if (request.url.includes(BASE_URL)) {
        print.warning();
      }
    },
  });
}

export function withDelay<
  // Recreate the generic signature of the HTTP resolver
  // so the arguments passed to "http.get" propagate here.
  Params extends PathParams,
  RequestBodyType extends DefaultBodyType,
  ResponseBodyType extends DefaultBodyType,
>(resolver: HttpResponseResolver<Params, RequestBodyType, ResponseBodyType>): HttpResponseResolver<Params, RequestBodyType, ResponseBodyType> {
  return async (...args) => {
    await delay(1000);
    return resolver(...args);
  };
}

export interface ResponseBody<T> {
  message: string;
  data: T;
  code: string;
}

export function createResponseBody<T>(data: T, code: string, message: string): ResponseBody<T> {
  return {
    message,
    data,
    code,
  };
}
