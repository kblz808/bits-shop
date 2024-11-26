import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import { userMiddleware } from "../middlewares/auth.middleware.ts";

const orderRouter = new Hono();

orderRouter.use("/orders/*", bearerAuth({ verifyToken: userMiddleware }));

orderRouter.post("/order", createOrder);
orderRouter.get("/order/:orderId", getOrder);
