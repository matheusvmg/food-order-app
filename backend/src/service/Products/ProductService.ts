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
    description?: string
  ): Promise<Product[]>;
  deleteProduct(id: string): Promise<void>;
  updateProduct(
    id: string,
    name: string,
    price: number,
    qtd: number,
    description?: string
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
    description?: string | undefined
  ): Promise<Product[]> {
    return this.repository.insertProduct(name, price, qtd, description);
  }

  deleteProduct = async (id: string): Promise<void> => {
    await this.repository.deleteProduct(id);
  };

  updateProduct = async (
    id: string,
    name: string,
    price: number,
    qtd: number,
    description?: string
  ): Promise<Product[]> => {
    return await this.repository.updateProduct(
      id,
      name,
      price,
      qtd,
      description
    );
  };
}

export { ProductsService, IProductsService };
