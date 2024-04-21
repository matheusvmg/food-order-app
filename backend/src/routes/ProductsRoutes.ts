import { Express } from "express";
import {
  IProductsController,
  ProductsController,
} from "../controller/ProductsController";
import { IRoutes } from "../Server";

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
    this.app.get("/products", this.controller.getProducts);
    this.app.post("/products", this.controller.insertProduct);
    this.app.delete("/products/:id", this.controller.deleteProduct);
    this.app.put("/products/:id", this.controller.updateProduct);
  }
}

export { ProductsRoutes, IProductsRoutes };
