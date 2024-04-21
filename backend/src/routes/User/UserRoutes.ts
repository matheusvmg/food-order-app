import { IRoutes } from "../../Server";
import { Express } from "express";
import {
  IUserController,
  UserController,
} from "../../controller/User/UserController";

interface IUserRoutes extends IRoutes {
  controller: IUserController;
}

class UserRoutes implements IUserRoutes {
  app: Express;
  controller: IUserController;

  constructor(
    app: Express,
    controller: IUserController = new UserController()
  ) {
    this.app = app;
    this.controller = controller;
  }

  registerAllRoutes() {
    this.app.post("/register", this.controller.registerUser);
    this.app.post("/login", this.controller.login);
  }
}

export { UserRoutes };
