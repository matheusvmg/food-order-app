export const getCategories = "SELECT * FROM categories;";

export const insertCategory: string =
  "INSERT INTO categories(name) VALUES ($1) RETURNING *;";

export const updateCategory: string = `UPDATE categories SET name=$1 WHERE category_id=$2 RETURNING *;`;

export const deleteCategory: string =
  "DELETE FROM categories WHERE category_id=$1;";
