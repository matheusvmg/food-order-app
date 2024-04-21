import { Request, Response } from "express";
import { ProductsService, IProductsService } from "../service/ProductService";

interface IProductsController {
  getProducts(request: Request, response: Response): Promise<void>;
  insertProduct(request: Request, response: Response): Promise<void>;
  deleteProduct(request: Request, response: Response): Promise<void>;
  updateProduct(request: Request, response: Response): Promise<void>;
}

class ProductsController implements IProductsController {
  productsService: IProductsService;

  constructor(productsService = new ProductsService()) {
    this.productsService = productsService;
  }

  getProducts = async (
    _request: Request,
    response: Response,
  ): Promise<void> => {
    try {
      let products = await this.productsService.getProducts();
      response.status(200).json({ products });
    } catch (e) {
      console.error(e);
      response.status(500).json({ error: "Could not retrieve the products" });
    }
  };

  insertProduct = async (
    request: Request,
    response: Response,
  ): Promise<void> => {
    try {
      const { name, description, price, qtd } = request.body;
      const product = await this.productsService.insertProduct(
        name,
        price,
        qtd,
        description,
      );
      response.status(200).json({ message: "Product inserted!", product });
    } catch (e) {
      console.error(e);
      response.status(500).json({ error: "Could not insert the product" });
    }
  };

  deleteProduct = async (
    request: Request,
    response: Response,
  ): Promise<void> => {
    try {
      let id = request.params.id;
      await this.productsService.deleteProduct(id);
      response.status(204).json({ message: "Product Deleted!" });
    } catch (e) {
      console.error(e);
      response.status(500).json({ error: "Could not delete the product" });
    }
  };

  updateProduct = async (
    request: Request,
    response: Response,
  ): Promise<void> => {
    try {
      let { id } = request.params;
      let { name, description, price, qtd } = request.body;

      const product = await this.productsService.updateProduct(
        id,
        name,
        Number(price),
        Number(qtd),
        description,
      );
      response.status(200).json({ message: "Product Updated!", product });
    } catch (e) {
      console.error(e);
      response.status(500).json({ error: "Could not update the product" });
    }
  };
}

export { ProductsController, IProductsController };
