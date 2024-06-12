import { Order } from "../../model/Order";
import {
  IOrderRepository,
  OrderRepository,
} from "../../repository/Order/OrderRepository";

interface IOrderService {
  getAllOrders(): Promise<Order[]>;
  registerOrder(
    tablenumber: string,
    total_price: number,
    status: string,
    product_id: string,
    cellphone?: string,
    observation?: string
  ): Promise<Order>;
  deleteOrderById(id: string): Promise<void>;
  updateOrder(
    id: string,
    tablenumber: string,
    total_price: number,
    status: string,
    product_id: string,
    cellphone?: string,
    observation?: string
  ): Promise<Order>;
}

class OrderService implements IOrderService {
  repository: IOrderRepository;

  constructor(repository = new OrderRepository()) {
    this.repository = repository;
  }

  getAllOrders = async (): Promise<Order[]> => {
    return this.repository.getAllOrders();
  };

  registerOrder = async (
    tablenumber: string,
    total_price: number,
    status: string,
    product_id: string,
    cellphone?: string,
    observation?: string
  ): Promise<Order> => {
    return this.repository.registerOrder(
      tablenumber,
      total_price,
      status,
      product_id,
      cellphone,
      observation
    );
  };

  deleteOrderById = async (id: string): Promise<void> => {
    await this.repository.deleteOrderById(id);
  };

  updateOrder = async (
    id: string,
    tablenumber: string,
    total_price: number,
    status: string,
    product_id: string,
    cellphone?: string,
    observation?: string
  ): Promise<Order> => {
    return this.repository.updateOrder(
      id,
      tablenumber,
      total_price,
      status,
      product_id,
      cellphone,
      observation
    );
  };
}

export { OrderService, IOrderService };
