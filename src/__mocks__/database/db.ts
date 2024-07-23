import { factory, primaryKey } from '@mswjs/data';

const db = factory({
  users: {
    id: primaryKey(String),
    email: String,
    password: String,
    nickname: String,
  },
});

export default db;
