import { http, passthrough } from 'msw';
import { handlers as auth } from './auth';

export const handlers = [
  ...auth,
  http.all('*', () => {
    passthrough();
  }),
];
