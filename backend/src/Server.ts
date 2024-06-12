import { DBClient } from "./dataSource/DBClient";
import * as path from "path";
import { Server as HTTPServer } from "http";
import { Server as IOServer } from "socket.io";
require("dotenv").config({
  path: path.resolve(__dirname, "../../../.env"),
});

export interface IRoutes {
  registerAllRoutes(): void;
}

class Server {
  http: HTTPServer;
  io: IOServer;

  constructor(http: HTTPServer, io: IOServer) {
    this.http = http;
    this.io = io;
  }

  async onInitialization() {
    await DBClient.shared.connect();
  }

  startSocketConnection() {
    this.io.on("connection", () => console.log("Client Connected ✅"));
  }

  start() {
    this.http.listen(process.env.PORT || 5001, this.onInitialization);
  }
}

export { Server };
