// d.ts files are use for global variables and some advance stuffs
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;
      PREFIX: string;
      NODE_ENV: string;
      CLIENT_ID: number;
    }
  }
}

export {}; // exporting the global object for use
