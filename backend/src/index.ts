import { Server } from "./Server";
import { ProductsRoutes } from "./routes/Products/ProductsRoutes";
import express from "express";
import { UserRoutes } from "./routes/User/UserRoutes";
import { Cors } from "./middlewares/Cors";

class App {
  app = express();
  productsRoutes = new ProductsRoutes(this.app);
  userRoutes = new UserRoutes(this.app);
  server = new Server(this.app);

  initialize() {
    this.server.start();
    this.app.use(express.json());
    this.app.use(Cors.middleware);
    this.productsRoutes.registerAllRoutes();
    this.userRoutes.registerAllRoutes();
  }
}

const app = new App();
app.initialize();
