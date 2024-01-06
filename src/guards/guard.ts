interface IGuard {
  Null<T>(input: T | null, paramName: unknown, message?: string | null): T;

  NullOrUndefined<T>(
    input: T | undefined,
    paramName: unknown,
    message?: string | null
  ): T;
}

class Guard implements IGuard {
  public static Against: IGuard = new Guard();

  private Guard() {}

  Null<T>(input: T | null, paramName: string, message?: string | null): T {
    if (input == null) {
      throw new Error(message ?? `Required input ${paramName} was null`);
    }

    return input;
  }

  NullOrUndefined<T>(
    input: T | undefined,
    paramName: string,
    message?: string | null
  ): T {
    this.Null(input, paramName, message);

    if (input == undefined) {
      throw new Error(message ?? `Required input ${paramName} was undefined`);
    }

    return input;
  }
}

export default Guard;
