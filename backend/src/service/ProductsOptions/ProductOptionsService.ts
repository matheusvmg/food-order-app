import { ProductOption } from "../../model/ProductOption";
import {
  IProductsOptionsRepository,
  ProductsOptionsRepository,
} from "../../repository/ProductsOptions/ProductsOptions";

interface IProductsOptionsService {
  getProductsOptions(): Promise<ProductOption[]>;
  insertProductOption(name: string): Promise<ProductOption>;
  deleteProductOption(id: string): Promise<void>;
  updateProductOption(id: string, name: string): Promise<ProductOption>;
}

class ProductsOptionsService implements IProductsOptionsService {
  repository: IProductsOptionsRepository;

  constructor(repository = new ProductsOptionsRepository()) {
    this.repository = repository;
  }

  getProductsOptions = async (): Promise<ProductOption[]> => {
    return this.repository.getProductsOptions();
  };

  insertProductOption(name: string): Promise<ProductOption> {
    return this.repository.insertProductOption(name);
  }

  deleteProductOption = async (id: string): Promise<void> => {
    await this.repository.deleteProductOption(id);
  };

  updateProductOption = async (
    id: string,
    name: string
  ): Promise<ProductOption> => {
    return await this.repository.updateProductOption(id, name);
  };
}

export { ProductsOptionsService, IProductsOptionsService };
