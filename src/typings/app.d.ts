// export type Lazy<T> = () => Promise<T>;

// export interface HttpResponseBody<T = any> {
//   code: string;
//   message: string;
//   data: T;
// }

declare namespace Utils {
  type Lazy<T> = () => Promise<T>;

  type Awaitable<T> = T | Promise<T>;

  type Maybe<T, Nullable = true> = true extends Nullable ? T | undefined | null : T | undefined;
}

declare namespace Service {
  interface Response<T = any> {
    code: string;
    message: string;
    data: T;
  }
}
