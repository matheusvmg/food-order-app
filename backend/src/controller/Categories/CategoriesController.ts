import { Request, Response } from "express";
import {
  CategoriesService,
  ICategoriesService,
} from "../../service/Categories/CategoriesService";

interface ICategoriesController {
  getCategories(request: Request, response: Response): Promise<void>;
  insertCategory(request: Request, response: Response): Promise<void>;
  deleteCategory(request: Request, response: Response): Promise<void>;
  updateCategory(request: Request, response: Response): Promise<void>;
}

class CategoriesController implements ICategoriesController {
  service: ICategoriesService;

  constructor(categoriesService = new CategoriesService()) {
    this.service = categoriesService;
  }

  getCategories = async (
    _request: Request,
    response: Response
  ): Promise<void> => {
    try {
      let categories = await this.service.getCategories();
      response.status(200).json({ categories });
    } catch (e) {
      console.error(e);
      response.status(500).json({ error: "Could not retrieve the categories" });
    }
  };

  insertCategory = async (
    request: Request,
    response: Response
  ): Promise<void> => {
    try {
      const { name } = request.body;
      const category = await this.service.insertCategory(name);
      response.status(200).json({ message: "Category inserted!", category });
    } catch (e) {
      console.error(e);
      response.status(500).json({ error: "Could not insert the category" });
    }
  };

  deleteCategory = async (
    request: Request,
    response: Response
  ): Promise<void> => {
    try {
      let id = request.params.id;
      await this.service.deleteCategory(id);
      response.status(204).json({ message: "Category Deleted!" });
    } catch (e) {
      console.error(e);
      response.status(500).json({ error: "Could not delete the category" });
    }
  };

  updateCategory = async (
    request: Request,
    response: Response
  ): Promise<void> => {
    try {
      let { id } = request.params;
      let { name } = request.body;

      const category = await this.service.updateCategory(id, name);
      response.status(200).json({ message: "Category Updated!", category });
    } catch (e) {
      console.error(e);
      response.status(500).json({ error: "Could not update the category" });
    }
  };
}

export { CategoriesController, ICategoriesController };
