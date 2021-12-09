import type { Group, User } from '../types/store.type';

export const usersFields = [
  'username',
  'firstName',
  'lastName',
  'email',
  'groupsList'
] as Array<keyof User>;

export const groupFields = ['name', 'title', 'usersList'] as Array<keyof Group>;

export const usersEditFields = usersFields.slice(0, 4);

export const groupEditFields = groupFields.slice(0, 2);
