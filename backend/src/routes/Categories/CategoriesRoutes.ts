import { Express } from "express";
import {
  ICategoriesController,
  CategoriesController,
} from "../../controller/Categories/CategoriesController";
import { IRoutes } from "../../Server";
import { Authentication } from "../../middlewares/Authentication";

interface ICategoriesRoutes extends IRoutes {
  controller: ICategoriesController;
}

class CategoriesRoutes implements ICategoriesRoutes {
  app: Express;
  controller: ICategoriesController;

  constructor(
    app: Express,
    controller: ICategoriesController = new CategoriesController()
  ) {
    this.app = app;
    this.controller = controller;
  }

  registerAllRoutes() {
    this.app.get(
      "/categories",
      Authentication.middleware,
      this.controller.getCategories
    );
    this.app.post(
      "/categories",
      Authentication.middleware,
      this.controller.insertCategory
    );
    this.app.delete(
      "/categories/:id",
      Authentication.middleware,
      this.controller.deleteCategory
    );
    this.app.put(
      "/categories/:id",
      Authentication.middleware,
      this.controller.updateCategory
    );
  }
}

export { CategoriesRoutes, ICategoriesRoutes };
