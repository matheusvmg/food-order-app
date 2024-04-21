import { Product } from "../model/Product";
import { DBClient } from "../dataSource/DBClient";
import {
  deleteProduct,
  getProducts,
  insertProduct,
  updateProduct,
} from "../dataSource/queries/productsTable";

interface IProductsRepository {
  getProducts(): Promise<Product[]>;
  insertProduct(
    name: string,
    price: number,
    qtd: number,
    description?: string,
  ): Promise<Product[]>;
  deleteProduct(id: string): Promise<void>;
  updateProduct(
    id: string,
    name: string,
    price: number,
    qtd: number,
    description?: string,
  ): Promise<Product[]>;
}

class ProductsRepository implements IProductsRepository {
  getProducts = async (): Promise<Product[]> => {
    return (await DBClient.agent.query(getProducts)).rows;
  };

  insertProduct = async (
    name: string,
    price: number,
    qtd: number,
    description?: string,
  ): Promise<Product[]> => {
    return (
      await DBClient.agent.query(insertProduct, [name, description, price, qtd])
    ).rows;
  };

  deleteProduct = async (id: string): Promise<void> => {
    await DBClient.agent.query(deleteProduct, [id]);
  };

  updateProduct = async (
    id: string,
    name: string,
    price: number,
    qtd: number,
    description?: string | undefined,
  ): Promise<Product[]> => {
    return (
      await DBClient.agent.query(updateProduct, [
        name,
        description,
        price,
        qtd,
        id,
      ])
    ).rows;
  };
}

export { ProductsRepository, IProductsRepository };
