export const isEmailExists = "SELECT email FROM users WHERE email=$1;";

export const registerUser =
  "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;";

export const getUserPassword = "SELECT password FROM users WHERE email=$1;";

export const getUserById = "SELECT * FROM users WHERE id=$1;";

export const getUserByEmail = "SELECT * FROM users WHERE email=$1;";
