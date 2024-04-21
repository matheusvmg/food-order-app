export const getProducts: string = "SELECT * FROM products;";

export const insertProduct: string =
  "INSERT INTO products(name, description, price, qtd) VALUES ($1, $2, $3, $4) RETURNING *;";

export const updateProduct: string = `UPDATE products SET name=$1, description=$2, price=$3, qtd=$4 WHERE product_id=$5 RETURNING *;`;

export const deleteProduct: string =
  "DELETE FROM products WHERE product_id=$1;";
