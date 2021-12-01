export interface StringObject {
  [key: string]: string;
}

export interface LinksObject {
  [key: string]: string | { (arg: string): string };
}

export interface ApiLinksObject {
  SING_IN: string;
  FILTERED_GROUPS: { (arg: string): string };
  FILTERED_USERS: { (arg: string): string };
  UPDATE_GROUPS: string;
  UPDATE_USERS: string;
  GROUP: { (arg: string): string };
  USER: { (arg: string): string };
  ALL_GROUPS: string;
  ALL_USERS: string;
}
