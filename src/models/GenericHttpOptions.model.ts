export interface GenericHttpOptions<Type> {
  url: string;
  endpoint?: string;
  data?: Type;
  headers?: { [key: string]: string };
  itemRequest: string;
}
