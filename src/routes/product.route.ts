import { Hono } from "hono";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getBidRequests,
  getProduct,
  updateProduct,
} from "../controllers/product.controller.ts";
import { bearerAuth } from "hono/bearer-auth";
import { tokenMiddleware } from "../middlewares/auth.middleware.ts";

const productRoute = new Hono();

productRoute.use("/products/*", bearerAuth({ verifyToken: tokenMiddleware }));

productRoute.post("/products", createProduct);
productRoute.put("/products/:productId", updateProduct);
productRoute.delete("/products/:productId", deleteProduct);
productRoute.get("/products", getAllProducts);
productRoute.get("/products/:productId", getProduct);
productRoute.get("/products/:productId/bids", getBidRequests);

export default productRoute;
