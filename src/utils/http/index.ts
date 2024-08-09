import { isAxiosError } from 'axios';
import { storage } from '../storage';
import createHttpClient from './createHttpClient';
import { StorageKeys } from '@/constants';

export const http = createHttpClient({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  onRequest(config) {
    const token = storage.get(StorageKeys.AccessToken);
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  onError(error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 401) {
        storage.remove(StorageKeys.AccessToken);
        window.location.reload();
      }
    }
  },
});
