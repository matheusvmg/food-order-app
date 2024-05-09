import { Order } from "../../model/Order";
import { DBClient } from "../../dataSource/DBClient";
import {
  deleteOrderById,
  getAllOrders,
  registerOrder,
  updateOrder,
} from "../../dataSource/queries/orderTable";

interface IOrderRepository {
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

class OrderRepository implements IOrderRepository {
  getAllOrders = async (): Promise<Order[]> => {
    return (await DBClient.agent.query(getAllOrders)).rows;
  };

  registerOrder = async (
    tablenumber: string,
    total_price: number,
    status: string,
    product_id: string,
    cellphone?: string,
    observation?: string
  ): Promise<Order> => {
    return (
      await DBClient.agent.query(registerOrder, [
        tablenumber,
        total_price,
        status,
        product_id,
        cellphone,
        observation,
      ])
    ).rows[0];
  };

  deleteOrderById = async (id: string): Promise<void> => {
    await DBClient.agent.query(deleteOrderById, [id]);
  };

  updateOrder = async (
    id: string,
    tablenumber: string,
    total_price: number,
    status: string,
    product_id: string,
    cellphone?: string | undefined,
    observation?: string | undefined
  ): Promise<Order> => {
    return (
      await DBClient.agent.query(updateOrder, [
        tablenumber,
        total_price,
        status,
        product_id,
        cellphone,
        observation,
        id,
      ])
    ).rows[0];
  };
}

export { OrderRepository, IOrderRepository };
