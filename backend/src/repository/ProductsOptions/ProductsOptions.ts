import { ProductOption } from "../../model/ProductOption";
import { DBClient } from "../../dataSource/DBClient";
import {
  getProductsOptions,
  insertProductOption,
  deleteProductOption,
  updateProductOption,
} from "../../dataSource/queries/productsOptionsTable";

interface IProductsOptionsRepository {
  getProductsOptions(): Promise<ProductOption[]>;
  insertProductOption(name: string): Promise<ProductOption>;
  deleteProductOption(id: string): Promise<void>;
  updateProductOption(id: string, name: string): Promise<ProductOption>;
}

class ProductsOptionsRepository implements IProductsOptionsRepository {
  getProductsOptions = async (): Promise<ProductOption[]> => {
    return (await DBClient.agent.query(getProductsOptions)).rows;
  };

  insertProductOption = async (name: string): Promise<ProductOption> => {
    return (await DBClient.agent.query(insertProductOption, [name])).rows[0];
  };

  deleteProductOption = async (id: string): Promise<void> => {
    return (await DBClient.agent.query(deleteProductOption, [id])).rows[0];
  };

  updateProductOption = async (
    id: string,
    name: string
  ): Promise<ProductOption> => {
    return (await DBClient.agent.query(updateProductOption, [name, id]))
      .rows[0];
  };
}

export { ProductsOptionsRepository, IProductsOptionsRepository };
