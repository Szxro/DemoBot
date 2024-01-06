import { glob } from "glob";

class FileService {
  async getFilesByPattern({ pattern }: { pattern: string }): Promise<string[]> {
    return await glob(pattern, { ignore: "node_modules/**" });
  }

  async importFile({ path }: { path: string }): Promise<unknown> {
    return (await import(path)).default;
  }
}

export default FileService;
