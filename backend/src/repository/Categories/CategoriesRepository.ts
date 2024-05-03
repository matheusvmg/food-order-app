import { Category } from "../../model/Category";
import { DBClient } from "../../dataSource/DBClient";
import {
  deleteCategory,
  getCategories,
  insertCategory,
  updateCategory,
} from "../../dataSource/queries/categoriesTable";

interface ICategoriesRepository {
  getCategories(): Promise<Category[]>;
  insertCategory(name: string): Promise<Category>;
  deleteCategory(id: string): Promise<void>;
  updateCategory(id: string, name: string): Promise<Category>;
}

class CategoriesRepository implements ICategoriesRepository {
  getCategories = async (): Promise<Category[]> => {
    return (await DBClient.agent.query(getCategories)).rows;
  };

  insertCategory = async (name: string): Promise<Category> => {
    return (await DBClient.agent.query(insertCategory, [name])).rows[0];
  };

  deleteCategory = async (id: string): Promise<void> => {
    return (await DBClient.agent.query(deleteCategory, [id])).rows[0];
  };

  updateCategory = async (id: string, name: string): Promise<Category> => {
    return (await DBClient.agent.query(updateCategory, [name, id])).rows[0];
  };
}

export { CategoriesRepository, ICategoriesRepository };
