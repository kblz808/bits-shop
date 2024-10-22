import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import { userMiddleware } from "../middlewares/auth.middleware.ts";
import { pay, verifyPayment } from "../controllers/payment.controller.ts";

const paymentRouter = new Hono();

paymentRouter.post("/payment/pay", pay);
paymentRouter.post("/payment/verify/:ref", verifyPayment);

export default paymentRouter;
