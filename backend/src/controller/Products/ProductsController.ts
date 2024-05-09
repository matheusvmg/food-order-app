import { Request, Response } from "express";
import {
  ProductsService,
  IProductsService,
} from "../../service/Products/ProductService";

interface IProductsController {
  getProducts(request: Request, response: Response): Promise<void>;
  insertProduct(request: Request, response: Response): Promise<void>;
  deleteProduct(request: Request, response: Response): Promise<void>;
  updateProduct(request: Request, response: Response): Promise<void>;
}

class ProductsController implements IProductsController {
  service: IProductsService;

  constructor(productsService = new ProductsService()) {
    this.service = productsService;
  }

  getProducts = async (
    _request: Request,
    response: Response
  ): Promise<void> => {
    try {
      let products = await this.service.getProducts();
      response.status(200).json({ products });
    } catch (e) {
      console.error(e);
      response.status(500).json({ error: "Could not retrieve the products" });
    }
  };

  insertProduct = async (
    request: Request,
    response: Response
  ): Promise<void> => {
    try {
      const { name, description, price, qtd, category_id, option_id } =
        request.body;
      const product = await this.service.insertProduct(
        name,
        price,
        qtd,
        description,
        category_id,
        option_id
      );
      response.status(200).json({ message: "Product inserted!", product });
    } catch (e) {
      console.error(e);
      response.status(500).json({ error: "Could not insert the product" });
    }
  };

  deleteProduct = async (
    request: Request,
    response: Response
  ): Promise<void> => {
    try {
      let id = request.params.id;
      await this.service.deleteProduct(id);
      response.status(204).json({ message: "Product Deleted!" });
    } catch (e) {
      console.error(e);
      response.status(500).json({ error: "Could not delete the product" });
    }
  };

  updateProduct = async (
    request: Request,
    response: Response
  ): Promise<void> => {
    try {
      let { id } = request.params;
      let { name, description, price, qtd, category_id, option_id } =
        request.body;

      const product = await this.service.updateProduct(
        id,
        name,
        Number(price),
        Number(qtd),
        description,
        category_id,
        option_id
      );
      response.status(200).json({ message: "Product Updated!", product });
    } catch (e) {
      console.error(e);
      response.status(500).json({ error: "Could not update the product" });
    }
  };
}

export { ProductsController, IProductsController };
