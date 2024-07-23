import { storage } from '../storage';
import createHttpClient from './createHttpClient';
import { StorageKeys } from '~/constants';

export const http = createHttpClient({
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
});
