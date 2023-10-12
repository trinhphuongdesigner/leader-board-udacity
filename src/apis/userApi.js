import { getUsers } from '@/helper/fakeData';

export async function getAllUsers() {
  const users = await getUsers();
  return users;
}
