export const usersFields = [
  'username',
  'firstName',
  'lastName',
  'email',
  'groupsList'
] as const;

export const groupFields = ['name', 'title', 'usersList'] as const;

export const usersEditFields = usersFields.slice(0, 4);

export const groupEditFields = groupFields.slice(0, 2);
