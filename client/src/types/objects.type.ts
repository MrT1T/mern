export interface StringObject {
  [key: string]: string;
}

export interface LinksObject {
  [key: string]: string | { (arg: string): string };
}
