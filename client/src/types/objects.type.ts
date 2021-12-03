export interface StringObject {
  [key: string]: string;
}

export interface LinksObject {
  [key: string]: string | { (arg: string): string };
}

export type FilterObjectType<T> = { [key in keyof T]?: Array<T[key]> };

export type ObjectType<T> = { [key in keyof T]?: T[key] };
