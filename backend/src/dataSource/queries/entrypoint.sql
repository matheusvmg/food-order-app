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

CREATE TABLE IF NOT EXISTS products (
  product_id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description VARCHAR,
  price FLOAT8 NOT NULL,
  qtd INTEGER NOT NULL
);

\dt;
