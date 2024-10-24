import { Hono } from "hono";
import {
  createExchangeRequest,
  createProduct,
  deleteProduct,
  getAllProducts,
  getBidRequests,
  getProduct,
  updateProduct,
} from "../controllers/product.controller.ts";
import { bearerAuth } from "hono/bearer-auth";
import { userMiddleware } from "../middlewares/auth.middleware.ts";
import { getExchangeRequests } from "../controllers/product.controller.ts";

const productRouter = new Hono();

productRouter.use("/products/*", bearerAuth({ verifyToken: userMiddleware }));

productRouter.post("/products", createProduct);
productRouter.put("/products/:productId", updateProduct);
productRouter.delete("/products/:productId", deleteProduct);
productRouter.get("/products", getAllProducts);
productRouter.get("/products/:productId", getProduct);
productRouter.get("/products/:productId/bids", getBidRequests);
productRouter.post("/products/:productId/exchange", createExchangeRequest);
productRouter.get(
  "/products/:productId/exchange_requests",
  getExchangeRequests,
);

export default productRouter;
