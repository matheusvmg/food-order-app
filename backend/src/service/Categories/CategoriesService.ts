import { Category } from "../../model/Category";
import {
  ICategoriesRepository,
  CategoriesRepository,
} from "../../repository/Categories/CategoriesRepository";

interface ICategoriesService {
  getCategories(): Promise<Category[]>;
  insertCategory(name: string): Promise<Category>;
  deleteCategory(id: string): Promise<void>;
  updateCategory(id: string, name: string): Promise<Category>;
}

class CategoriesService implements ICategoriesService {
  repository: ICategoriesRepository;

  constructor(repository = new CategoriesRepository()) {
    this.repository = repository;
  }
  getCategories = async (): Promise<Category[]> => {
    return await this.repository.getCategories();
  };

  insertCategory = async (name: string): Promise<Category> => {
    return await this.repository.insertCategory(name);
  };

  deleteCategory = async (id: string): Promise<void> => {
    return await this.repository.deleteCategory(id);
  };

  updateCategory = async (id: string, name: string): Promise<Category> => {
    return await this.repository.updateCategory(id, name);
  };
}

export { CategoriesService, ICategoriesService };
