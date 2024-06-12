import { Request, Response } from "express";
import { OrderService, IOrderService } from "../../service/Order/OrderService";

interface IOrderController {
  getAllOrders(request: Request, response: Response): Promise<void>;
  registerOrder(request: Request, response: Response): Promise<void>;
  deleteOrderById(request: Request, response: Response): Promise<void>;
  updateOrder(request: Request, response: Response): Promise<void>;
}

class OrderController implements IOrderController {
  service: IOrderService;

  constructor(productsService = new OrderService()) {
    this.service = productsService;
  }

  getAllOrders = async (
    _request: Request,
    response: Response
  ): Promise<void> => {
    try {
      let orders = await this.service.getAllOrders();
      response.status(200).json({ orders });
    } catch (e) {
      console.error(e);
      response.status(500).json({ error: "Could not retrieve the orders" });
    }
  };

  registerOrder = async (
    request: Request,
    response: Response
  ): Promise<void> => {
    try {
      const {
        tablenumber,
        cellphone,
        total_price,
        status,
        product_id,
        observation,
      } = request.body;
      const order = await this.service.registerOrder(
        tablenumber,
        cellphone,
        total_price,
        status,
        product_id,
        observation
      );
      response.status(200).json({ message: "Order registered!", order });
    } catch (e) {
      console.error(e);
      response.status(500).json({ error: "Could not register the order" });
    }
  };

  deleteOrderById = async (
    request: Request,
    response: Response
  ): Promise<void> => {
    try {
      let id = request.params.id;
      await this.service.deleteOrderById(id);
      response.status(204).json({ message: "Order Deleted!" });
    } catch (e) {
      console.error(e);
      response.status(500).json({ error: "Could not delete the order" });
    }
  };

  updateOrder = async (request: Request, response: Response): Promise<void> => {
    try {
      let { id } = request.params;
      let {
        tablenumber,
        cellphone,
        total_price,
        status,
        product_id,
        observation,
      } = request.body;

      const order = await this.service.updateOrder(
        id,
        tablenumber,
        total_price,
        status,
        product_id,
        cellphone,
        observation
      );
      response.status(200).json({ message: "Order Updated!", order });
    } catch (e) {
      console.error(e);
      response.status(500).json({ error: "Could not update the order" });
    }
  };
}

export { OrderController, IOrderController };
