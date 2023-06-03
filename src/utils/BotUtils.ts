import { promisify } from "util";
import { glob } from "glob";
import { BotUtil } from "../types/utilsType";

const globPromise = promisify(glob);

export async function loadFiles({
  pattern,
}: Pick<BotUtil, "pattern">): Promise<string[]> {
  return await globPromise(pattern, { ignore: "node_modules/**" });
}

export async function importFiles({
  path,
}: Pick<BotUtil, "path">): Promise<unknown> {
  return (await import(path)).default;
}

// ?? Notes:

// default is to access to the file itself (default:what is inside the file)
