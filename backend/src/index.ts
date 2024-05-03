import { Server as ApplicationServer } from "./Server";
import { ProductsRoutes } from "./routes/Products/ProductsRoutes";
import express from "express";
import { UserRoutes } from "./routes/User/UserRoutes";
import { Cors } from "./middlewares/Cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { CategoriesRoutes } from "./routes/Categories/CategoriesRoutes";

class App {
  app = express();
  http = createServer(this.app);
  io = new Server(this.http);
  productsRoutes = new ProductsRoutes(this.app);
  userRoutes = new UserRoutes(this.app);
  categoriesRoutes = new CategoriesRoutes(this.app);
  applicationServer = new ApplicationServer(this.app);

  initialize() {
    this.applicationServer.start();
    this.app.use(express.json());
    this.app.use(Cors.middleware);
    this.productsRoutes.registerAllRoutes();
    this.userRoutes.registerAllRoutes();
    this.categoriesRoutes.registerAllRoutes();
  }
}

const app = new App();
app.initialize();
