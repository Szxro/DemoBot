export class InternalErrorException extends Error {
  constructor() {
    super("Something happen making the request , try again later");
  }
}
