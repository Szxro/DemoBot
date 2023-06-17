import { glob } from "glob";
import { promisify } from "util";
import { FileType } from "../../models/fileType.model";

export class FileService {
  private readonly globPromise = promisify(glob);

  async loadFiles({ pattern }: Pick<FileType, "pattern">): Promise<string[]> {
    return await this.globPromise(pattern, { ignore: "node_modules/**" });
  }

  async importFiles({ path }: Pick<FileType, "path">): Promise<unknown> {
    return (await import(path)).default;
  }
}

// ?? Notes:

// default is to access to the file itself (default:what is inside the file)
