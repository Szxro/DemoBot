class Util {
  static tryCallback(callback: Function, ...argts: any[]): void {
    const [logger, key, client, args] = argts;

    try {
      callback({ logger, client }, ...args);
    } catch (err: unknown) {
      logger(`[Uncaught Error]:${key}`, err);
    }
  }
}

export default Util;
