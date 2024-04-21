import pg from "pg";
const { Client } = pg;
import * as path from "path";
require("dotenv").config({
  path: path.resolve(__dirname, "../../../.env"),
});

const client = new Client({
  // NOTE: Only works locally
  host: process.env.DATABASE_HOST, // BUG: Fix database host in docker
  port: Number(process.env.DATABASE_PORT),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.DATABASE,
});

class DBClient {
  static shared: DBClient = new DBClient();
  static agent: pg.Client = client;

  private constructor() {}

  connect = async () => {
    client
      .connect()
      .then(async () => console.log("DB Connected ✅"))
      .catch(async (e) => {
        console.error(e);
        await this.disconnect();
      });
  };

  disconnect = async () => {
    await client.end();
  };
}

export { DBClient };
