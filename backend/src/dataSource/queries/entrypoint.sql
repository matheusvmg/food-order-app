CREATE DATABASE foodOrderDB;

\c foodOrderDB;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
  user_id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  resetToken VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS categories (
  category_id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
  product_id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description VARCHAR,
  price FLOAT8 NOT NULL,
  qtd INTEGER NOT NULL,
  category_id UUID,
  FOREIGN KEY(category_id) REFERENCES categories(category_id)
);

CREATE TABLE IF NOT EXISTS orders (
  order_id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  tablenumber VARCHAR(255),
  cellphone VARCHAR(255),
  total_price FLOAT8 NOT NULL,
  product_id UUID,
  FOREIGN KEY(product_id) REFERENCES products(product_id)
);

\dt;
