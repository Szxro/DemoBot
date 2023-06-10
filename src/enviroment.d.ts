declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN_BOT: string;
      APPLICATION_ID: string;
      SERVER_ID: string;
      POKE_URL: string;
    }
  }
}

export {};
