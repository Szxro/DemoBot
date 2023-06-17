export class NotFoundException extends Error {
  private readonly _itemRequest: string;
  constructor({ itemRequest }: { itemRequest: string }) {
    super(`${itemRequest} was not found, check the name and try again`);
    this._itemRequest = itemRequest;
  }
}
