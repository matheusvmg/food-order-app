export const isEmailExists = "SELECT email FROM users WHERE email=$1;";

export const registerUser =
  "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;";

export const getUserPassword = "SELECT password FROM users WHERE email=$1;";

export const getUserById = "SELECT * FROM users WHERE id=$1;";

export const getUserByEmail = "SELECT * FROM users WHERE email=$1;";

export const getAllUsers = "SELECT * FROM users;";

export const deleteUserById = "DELETE FROM users WHERE user_id=$1;";

export const updateUserResetPasswordTokenByEmail =
  "UPDATE users SET resetToken=$1 WHERE email=$2 RETURNING *;";

export const updateUserPasswordByEmail =
  "UPDATE users SET password=$1 WHERE email=$2 RETURNING *;";
