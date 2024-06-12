export const getAllOrders: string = "SELECT * FROM orders;";

export const getOrderById: string = "SELECT * FROM orders WHERE order_id=$1;";

export const registerOrder: string =
  "INSERT INTO orders(tablenumber, cellphone, total_price, status, product_id, observation) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;";

export const updateOrder: string = `UPDATE orders SET tablenumber=$1, total_price=$2, status=$3, product_id=$4, cellphone=$5, observation=$6 WHERE order_id=$7 RETURNING *;`;

export const deleteOrderById: string = "DELETE FROM orders WHERE order_id=$1;";
