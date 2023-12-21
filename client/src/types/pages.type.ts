export interface ProjectsFilterDataType {
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
  projectsList?: string;
}
