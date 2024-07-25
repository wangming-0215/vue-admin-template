export interface ResponseBody<T> {
  data: T | null;
  code: string;
  message: string;
}
