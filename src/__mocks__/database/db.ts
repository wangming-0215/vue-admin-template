import { factory, primaryKey } from '@mswjs/data';

const db = factory({
  users: {
    id: primaryKey(Number),
    email: String,
    password: String,
    nickname: String,
    avatar: String,
  },
});

export default db;
