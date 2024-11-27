import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import { userMiddleware } from "../middlewares/auth.middleware.ts";
import { createOrder, getOrder, getOrders, payOrder } from "../controllers/order.controller.ts";

const orderRouter = new Hono();

orderRouter.use("/orders/*", bearerAuth({ verifyToken: userMiddleware }));

orderRouter.post("/orders", createOrder);
orderRouter.get("/orders", getOrders);
orderRouter.get("/orders/:orderId", getOrder);
orderRouter.post("/orders/:orderId/pay", payOrder);

export default orderRouter;
