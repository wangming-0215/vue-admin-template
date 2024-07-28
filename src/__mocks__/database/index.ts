import db from './db';

export function setupDatabase() {
  db.users.create({
    id: 1,
    email: 'xiaoming@test.com',
    nickname: '汪小明',
    password: 'xiaoming@test.com',
  });
}

export default db;
