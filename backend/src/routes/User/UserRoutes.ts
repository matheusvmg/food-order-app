import { IRoutes } from "../../Server";
import { Express } from "express";
import {
  IUserController,
  UserController,
} from "../../controller/User/UserController";
import { Authentication } from "../../middlewares/Authentication";

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
    this.app.get(
      "/users/all",
      Authentication.middleware,
      this.controller.getAllUsers
    );
    this.app.delete(
      "/users/:id",
      Authentication.middleware,
      this.controller.deleteUserById
    );
    this.app.post("/reset-password", this.controller.resetPassword);
    this.app.post("/forget-password/:token", this.controller.forgetPassword);
  }
}

export { UserRoutes };
