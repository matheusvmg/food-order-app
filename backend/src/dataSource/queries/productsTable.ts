export const getProducts: string = "SELECT * FROM products;";

export const getProductById: string =
  "SELECT * FROM products WHERE product_id=$1;";

export const insertProduct: string =
  "INSERT INTO products(name, description, price, qtd, category_id, option_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;";

export const updateProduct: string = `UPDATE products SET name=$1, description=$2, price=$3, qtd=$4, category_id=$5, option_id=$6 WHERE product_id=$7 RETURNING *;`;

export const deleteProduct: string =
  "DELETE FROM products WHERE product_id=$1;";
