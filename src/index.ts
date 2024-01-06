import FileService from "./services/fileService";
import ClientHandler from "./structs/client-handler";

let client = new ClientHandler(new FileService());

client.init();
