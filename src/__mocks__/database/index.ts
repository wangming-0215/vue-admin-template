import db from './db';

export function setupDatabase() {
  db.users.create({
    email: 'xiaoming@test.com',
    nickname: '汪小明',
    password: 'xiaoming@test.com',
    avatar: 'https://picsum.photos/seed/xiaoming@test.com/160/160',
  });
}

export default db;
