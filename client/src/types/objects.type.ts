export type FilterObjectType<T> = { [key in keyof T]?: Array<T[key]> };
