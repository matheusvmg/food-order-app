import { Express } from "express";
import {
  IProductsOptionsController,
  ProductsOptionsController,
} from "../../controller/ProductsOptions/ProductsOptionsController";
import { IRoutes } from "../../Server";
import { Authentication } from "../../middlewares/Authentication";

interface IProductsOptionsRoutes extends IRoutes {
  controller: IProductsOptionsController;
}

class ProductsOptionsRoutes implements IProductsOptionsRoutes {
  app: Express;
  controller: IProductsOptionsController;

  constructor(
    app: Express,
    controller: IProductsOptionsController = new ProductsOptionsController()
  ) {
    this.app = app;
    this.controller = controller;
  }

  registerAllRoutes() {
    this.app.get(
      "/product-options",
      Authentication.middleware,
      this.controller.getProductsOptions
    );
    this.app.post(
      "/product-options",
      Authentication.middleware,
      this.controller.insertProductOption
    );
    this.app.delete(
      "/product-options/:id",
      Authentication.middleware,
      this.controller.deleteProductOption
    );
    this.app.put(
      "/product-options/:id",
      Authentication.middleware,
      this.controller.updateProductOption
    );
  }
}

export { ProductsOptionsRoutes, IProductsOptionsRoutes };
