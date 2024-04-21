import { Express } from "express";
import { DBClient } from "./dataSource/DBClient";
import * as path from "path";
require("dotenv").config({
  path: path.resolve(__dirname, "../../../.env"),
});

export interface IRoutes {
  registerAllRoutes(): void;
}

class Server {
  app: Express;

  constructor(app: Express) {
    this.app = app;
  }

  async onInitialization() {
    await DBClient.shared.connect();
  }

  start() {
    this.app.listen(process.env.PORT || 5001, this.onInitialization);
  }
}

export { Server };
