export interface GroupsFilterDataType {
  page: number;
  name?: string;
  title?: string;
  usersList?: string;
}

export interface UsersFilterDataType {
  page: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  groupsList?: string;
}
