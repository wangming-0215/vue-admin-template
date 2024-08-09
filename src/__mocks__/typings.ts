export type ApiPath<T extends string> = `/api/v1${T}`;

export interface BaseResponseBody<T = any> {
  data: T;
  code: string;
  message: string;
}

export interface SuccessResponseBody<T = any> extends BaseResponseBody<T> {
  data: T;
  code: `SUCCESS_${Uppercase<string>}`;
}

export interface FailedResponseBody extends BaseResponseBody<null> {
  data: null;
  code: `ERR_${Uppercase<string>}`;
}

export type ResponseBody<T> = SuccessResponseBody<T> | FailedResponseBody;
