import { config } from "dotenv";
import { join } from "path";
import Guard from "../guards/guard";
import { IEnvVar } from "../types/config";

class Config {
  static getEnvVar({ envVar }: IEnvVar): string {
    const envFile = process.env.NODE_ENV === "dev" ? ".env.dev" : ".env";

    const envFilePath = join(process.cwd(), envFile);

    config({ path: envFilePath });

    return Guard.Against.NullOrUndefined(process.env[envVar], envVar);
  }
}

export default Config;
