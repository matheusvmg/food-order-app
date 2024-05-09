export const getProductsOptions = "SELECT * FROM products_options;";

export const insertProductOption: string =
  "INSERT INTO products_options(name) VALUES ($1) RETURNING *;";

export const updateProductOption: string = `UPDATE products_options SET name=$1 WHERE option_id=$2 RETURNING *;`;

export const deleteProductOption: string =
  "DELETE FROM products_options WHERE option_id=$1;";
