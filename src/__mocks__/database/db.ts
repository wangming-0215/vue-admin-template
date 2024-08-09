import { factory, primaryKey } from '@mswjs/data';

const db = factory({
  users: {
    id: primaryKey<string>(() => Math.random().toString(16).slice(2)),
    email: String,
    password: String,
    nickname: String,
    avatar: String,
  },
});

export default db;
