import { isAxiosError } from 'axios';

/**
 * 获取异常信息
 * @param error
 */
export default function getErrorMessage(error: any) {
  if (isAxiosError(error)) {
    return error.response?.data.message || 'Unknown Server Error';
  }

  return error.message || 'Unknown Error';
}
