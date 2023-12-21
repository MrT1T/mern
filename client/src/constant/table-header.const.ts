import type { Project, User } from '../types/store.type';

export const usersFields = [
  'username',
  'firstName',
  'lastName',
  'email',
  'projectsList'
] as Array<keyof User>;

export const projectFields = ['name', 'title', 'usersList'] as Array<
  keyof Project
>;

export const usersEditFields = usersFields.slice(0, 4);

export const projectEditFields = projectFields.slice(0, 2);
