import { InternalErrorException } from "../../exceptions/InternalErrorException";
import { NotFoundException } from "../../exceptions/NotFoundException";
import { GenericHttpOptions } from "../../models/GenericHttpOptions.model";
import { IErrorDict } from "../../models/errorDict.model";

export class HttpServiceFactory<TRequest> {
  private readonly _itemRequest: string;

  private readonly _url: string;

  private readonly _data?: TRequest;

  private readonly _headers?: Pick<GenericHttpOptions<TRequest>, "headers">;

  private readonly errorDict: IErrorDict = {
    404: () => {
      throw new NotFoundException({ itemRequest: this._itemRequest });
    },
    500: () => {
      throw new InternalErrorException();
    },
  };

  constructor({
    itemRequest,
    url,
    data,
    headers,
  }: GenericHttpOptions<TRequest>) {
    this._url = url;
    this._itemRequest = itemRequest;
    this._data = data;
    this._headers = headers;
  }

  async get(): Promise<TRequest> {
    const response = await fetch(this._url);

    if (!response.ok) {
      return this.errorDict[response.status as keyof IErrorDict]();
    }

    return await response.json();
  }

  async getByItemName(): Promise<TRequest> {
    const response = await fetch(`${this._url}/${this._itemRequest}`);

    if (!response.ok) {
      return this.errorDict[response.status as keyof IErrorDict]();
    }

    return await response.json();
  }
  async postWithResponse(): Promise<TRequest> {
    const response = await fetch(this._url, {
      method: "POST",
      headers: { ...((this._headers ? this._headers : {}) as HeadersInit) },
      body: JSON.stringify(this._data),
    });

    if (!response.ok) {
      return this.errorDict[response.status as keyof IErrorDict]();
    }

    return await response.json();
  }

  async postWithOutResponse(): Promise<boolean> {
    const response = await fetch(this._url, {
      method: "POST",
      headers: { ...((this._headers ? this._headers : {}) as HeadersInit) },
      body: JSON.stringify(this._data),
    });

    if (!response.ok) {
      return this.errorDict[response.status as keyof IErrorDict]();
    }

    return response.ok;
  }
}
