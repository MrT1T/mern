export interface LinksObject {
  [key: string]: string | { (arg: string): string };
}

export type FilterObjectType<T> = { [key in keyof T]?: Array<T[key]> };
