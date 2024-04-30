import pg from "pg";
const { Client } = pg;
import * as path from "path";
require("dotenv").config({
  path: path.resolve(__dirname, "../../../.env"),
});

const client = new Client({
  host:
    process.env.NODE_ENV === "production"
      ? process.env.DATABASE_HOST
      : "localhost",
  port: Number(process.env.DATABASE_PORT),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

class DBClient {
  static shared: DBClient = new DBClient();
  static agent: pg.Client = client;

  private constructor() {}

  connect = async () => {
    setTimeout(() => {
      client
        .connect()
        .then(async () => {
          console.log("DB Connected ✅");
          console.log(process.env);
        })
        .catch(async (e) => {
          console.error(e);
          console.log(process.env);
          await this.disconnect();
        });
    }, 20000);
  };

  disconnect = async () => {
    await client.end();
  };
}

export { DBClient };
