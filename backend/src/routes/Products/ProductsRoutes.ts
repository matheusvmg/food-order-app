import { Express } from "express";
import {
  IProductsController,
  ProductsController,
} from "../../controller/Products/ProductsController";
import { IRoutes } from "../../Server";
import { Authentication } from "../../middlewares/Authentication";

interface IProductsRoutes extends IRoutes {
  controller: IProductsController;
}

class ProductsRoutes implements IProductsRoutes {
  app: Express;
  controller: IProductsController;

  constructor(
    app: Express,
    controller: IProductsController = new ProductsController()
  ) {
    this.app = app;
    this.controller = controller;
  }

  registerAllRoutes() {
    this.app.get(
      "/products",
      Authentication.middleware,
      this.controller.getProducts
    );
    this.app.post(
      "/products",
      Authentication.middleware,
      this.controller.insertProduct
    );
    this.app.delete(
      "/products/:id",
      Authentication.middleware,
      this.controller.deleteProduct
    );
    this.app.put(
      "/products/:id",
      Authentication.middleware,
      this.controller.updateProduct
    );
  }
}

export { ProductsRoutes, IProductsRoutes };
