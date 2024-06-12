import { Server as ApplicationServer } from "./Server";
import { ProductsRoutes } from "./routes/Products/ProductsRoutes";
import express from "express";
import { UserRoutes } from "./routes/User/UserRoutes";
import { Cors } from "./middlewares/Cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { CategoriesRoutes } from "./routes/Categories/CategoriesRoutes";
import { ProductsOptionsRoutes } from "./routes/ProductsOptions/ProductsOptions";
import { OrderRoutes } from "./routes/Order/OrderRoutes";

class App {
  app = express();
  http = createServer(this.app);
  io = new Server(this.http);
  productsRoutes = new ProductsRoutes(this.app);
  userRoutes = new UserRoutes(this.app);
  categoriesRoutes = new CategoriesRoutes(this.app);
  productsOptionsRoutes = new ProductsOptionsRoutes(this.app);
  orderRoutes = new OrderRoutes(this.app);
  applicationServer = new ApplicationServer(this.http, this.io);

  initialize() {
    this.applicationServer.start();
    this.app.use(express.json());
    this.app.use(Cors.middleware);
    this.productsRoutes.registerAllRoutes();
    this.userRoutes.registerAllRoutes();
    this.categoriesRoutes.registerAllRoutes();
    this.productsOptionsRoutes.registerAllRoutes();
    this.orderRoutes.registerAllRoutes();
    this.io.on("connection", () => console.log("Client Connected ✅"));
  }
}

const app = new App();
app.initialize();
