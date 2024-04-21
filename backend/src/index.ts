import { Server } from "./Server";
import { ProductsRoutes } from "./routes/ProductsRoutes";
import express from "express";

class App {
  app = express();
  productsRoutes = new ProductsRoutes(this.app);
  server = new Server(this.app);

  initialize() {
    this.server.start();
    this.app.use(express.json());
    this.productsRoutes.registerAllRoutes();
  }
}

const app = new App();
app.initialize();
