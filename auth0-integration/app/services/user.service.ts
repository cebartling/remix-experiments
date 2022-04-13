import fetch from 'node-fetch';
import { randomUUID } from 'crypto';
import type { User } from '~/types/user';

async function create(user: User): Promise<string> {
  if (!user.id) {
    user.id = randomUUID();
  }
  // @ts-ignore
  const response = await fetch(process.env.USERS_API_URL, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: { 'Content-Type': 'application/json' },
  });
  console.log(response);
  const json = await response.json();
  console.log(json);
  return '';
}

export async function findOrCreate(user: User): Promise<User> {
  if (!user.id) {
    const location = await create(user);
  }
  // @ts-ignore
  return {} as User;
}
