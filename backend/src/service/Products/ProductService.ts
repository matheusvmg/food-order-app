import { Product } from "../../model/Product";
import {
  IProductsRepository,
  ProductsRepository,
} from "../../repository/Products/ProductsRepository";

interface IProductsService {
  getProducts(): Promise<Product[]>;
  insertProduct(
    name: string,
    price: number,
    qtd: number,
    description?: string,
    category_id?: string,
    option_id?: string
  ): Promise<Product[]>;
  deleteProduct(id: string): Promise<void>;
  updateProduct(
    id: string,
    name: string,
    price: number,
    qtd: number,
    description?: string,
    category_id?: string,
    option_id?: string
  ): Promise<Product[]>;
}

class ProductsService implements IProductsService {
  repository: IProductsRepository;

  constructor(repository = new ProductsRepository()) {
    this.repository = repository;
  }

  getProducts = async (): Promise<Product[]> => {
    return this.repository.getProducts();
  };

  insertProduct(
    name: string,
    price: number,
    qtd: number,
    description?: string,
    category_id?: string,
    option_id?: string
  ): Promise<Product[]> {
    return this.repository.insertProduct(
      name,
      price,
      qtd,
      description,
      category_id,
      option_id
    );
  }

  deleteProduct = async (id: string): Promise<void> => {
    await this.repository.deleteProduct(id);
  };

  updateProduct = async (
    id: string,
    name: string,
    price: number,
    qtd: number,
    description?: string,
    category_id?: string,
    option_id?: string
  ): Promise<Product[]> => {
    return await this.repository.updateProduct(
      id,
      name,
      price,
      qtd,
      description,
      category_id,
      option_id
    );
  };
}

export { ProductsService, IProductsService };
