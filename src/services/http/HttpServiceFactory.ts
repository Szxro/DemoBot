import { GenericHttpOptions } from "../../models/GenericHttpOptions.model";

export class HttpServiceFactory<TRequest> {
  // TODO: Search a better way to do this
  protected async get({
    url,
  }: Pick<GenericHttpOptions<TRequest>, "url">): Promise<TRequest> {
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            JSON.stringify({
              status: response.ok,
              statusText: response.statusText,
            })
          );
        }

        return response.json() as TRequest;
      })
      .catch((err) => {
        throw err;
      });
  }
  protected async post({
    url,
    data,
    headers,
  }: Pick<GenericHttpOptions<TRequest>, "url" | "data" | "headers">) {
    return fetch(url, {
      method: "POST",
      headers: { ...(headers ? headers : {}) },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            JSON.stringify({
              status: response.ok,
              statusText: response.statusText,
            })
          );
        }

        return response.json() as TRequest;
      })
      .catch((err) => {
        throw err;
      });
  }
}
