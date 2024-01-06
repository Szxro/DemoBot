import Config from "./config";

export const CONFIG_KEYS = Object.freeze({
  TOKEN: Config.getEnvVar({ envVar: "TOKEN" }),
  PREFIX: Config.getEnvVar({ envVar: "PREFIX" }),
  CLIENT_ID: Config.getEnvVar({ envVar: "CLIENT_ID" }),
});
