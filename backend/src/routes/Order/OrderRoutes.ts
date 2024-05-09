import { IRoutes } from "../../Server";
import { Express } from "express";
import {
  IOrderController,
  OrderController,
} from "../../controller/Order/OrderController";
import { Authentication } from "../../middlewares/Authentication";

interface IOrderRoutes extends IRoutes {
  controller: IOrderController;
}

class OrderRoutes implements IOrderRoutes {
  app: Express;
  controller: IOrderController;

  constructor(
    app: Express,
    controller: IOrderController = new OrderController()
  ) {
    this.app = app;
    this.controller = controller;
  }

  registerAllRoutes() {
    this.app.post("/order", this.controller.registerOrder);
    this.app.put("/order/:id", this.controller.updateOrder);
    this.app.get(
      "/order",
      Authentication.middleware,
      this.controller.getAllOrders
    );
    this.app.delete(
      "/order/:id",
      Authentication.middleware,
      this.controller.deleteOrderById
    );
  }
}

export { OrderRoutes };
