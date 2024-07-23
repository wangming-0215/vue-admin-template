import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';
import { setupDatabase } from './database';

setupDatabase();

export const worker = setupWorker(...handlers);
