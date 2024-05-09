import { Request, Response } from "express";
import {
  ProductsOptionsService,
  IProductsOptionsService,
} from "../../service/ProductsOptions/ProductOptionsService";

interface IProductsOptionsController {
  getProductsOptions(request: Request, response: Response): Promise<void>;
  insertProductOption(request: Request, response: Response): Promise<void>;
  deleteProductOption(request: Request, response: Response): Promise<void>;
  updateProductOption(request: Request, response: Response): Promise<void>;
}

class ProductsOptionsController implements IProductsOptionsController {
  service: IProductsOptionsService;

  constructor(productsService = new ProductsOptionsService()) {
    this.service = productsService;
  }

  getProductsOptions = async (
    _request: Request,
    response: Response
  ): Promise<void> => {
    try {
      let options = await this.service.getProductsOptions();
      response.status(200).json({ options });
    } catch (e) {
      console.error(e);
      response
        .status(500)
        .json({ error: "Could not retrieve the products options" });
    }
  };

  insertProductOption = async (
    request: Request,
    response: Response
  ): Promise<void> => {
    try {
      const { name } = request.body;
      const productOption = await this.service.insertProductOption(name);
      response.status(200).json({ message: "Option inserted!", productOption });
    } catch (e) {
      console.error(e);
      response
        .status(500)
        .json({ error: "Could not insert the product option" });
    }
  };

  deleteProductOption = async (
    request: Request,
    response: Response
  ): Promise<void> => {
    try {
      let id = request.params.id;
      await this.service.deleteProductOption(id);
      response.status(204).json({ message: "Product Option Deleted!" });
    } catch (e) {
      console.error(e);
      response
        .status(500)
        .json({ error: "Could not delete the product option" });
    }
  };

  updateProductOption = async (
    request: Request,
    response: Response
  ): Promise<void> => {
    try {
      let { id } = request.params;
      let { name } = request.body;

      const option = await this.service.updateProductOption(id, name);
      response.status(200).json({ message: "Product Option Updated!", option });
    } catch (e) {
      console.error(e);
      response
        .status(500)
        .json({ error: "Could not update the product option" });
    }
  };
}

export { ProductsOptionsController, IProductsOptionsController };
