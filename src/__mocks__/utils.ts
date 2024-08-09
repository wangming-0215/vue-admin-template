import {
  type DefaultBodyType,
  HttpResponse,
  type HttpResponseResolver,
  type PathParams,
  delay,
} from 'msw';
import { TokenExpiredError, TokenInvalidError, verify } from './jwt';

export const BASE_URL = '/api/v1';

/** cspell: disable-next-line */
export const SECRET = 'WANGXIAOMING0215';

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
>(
  resolver: HttpResponseResolver<Params, RequestBodyType, ResponseBodyType>,
): HttpResponseResolver<Params, RequestBodyType, ResponseBodyType> {
  return async (...args) => {
    await delay();
    return resolver(...args);
  };
}

export function withAuth<
  Params extends PathParams,
  RequestBodyType extends DefaultBodyType,
  ResponseBodyType extends DefaultBodyType,
>(
  resolver: HttpResponseResolver<Params, RequestBodyType, ResponseBodyType>,
): HttpResponseResolver<Params, RequestBodyType, ResponseBodyType> {
  return async (input) => {
    try {
      const { request } = input;

      const authorization = request.headers.get('Authorization');
      const token = authorization?.split(' ')[1];
      if (!token) {
        const response = {
          data: null,
          code: 'ERR_ACCESS_DENIED',
          message: 'Access Denied',
        } as unknown as ResponseBodyType;
        return HttpResponse.json(response, { status: 401 });
      }
      const decode = verify(token, SECRET);
      request.headers.set('userId', decode.userId);
      return resolver(input);
    } catch (error) {
      if (error instanceof TokenInvalidError) {
        return HttpResponse.json({
          data: null,
          code: 'ERR_TOKEN_INVALID',
          message: 'Token Invalid',
        } as unknown as ResponseBodyType, { status: 401 });
      }

      if (error instanceof TokenExpiredError) {
        return HttpResponse.json({
          data: null,
          code: 'ERR_TOKEN_EXPIRED',
          message: 'Token Expired',
        } as unknown as ResponseBodyType, { status: 401 });
      }

      return HttpResponse.json({
        data: null,
        code: 'ERR_INTERNAL_SERVER_ERROR',
        message: 'Internal Server Error',
      } as unknown as ResponseBodyType, { status: 500 });
    };
  };
}
