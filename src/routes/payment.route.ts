import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import { tokenMiddleware } from "../middlewares/auth.middleware.ts";
import { pay, verifyPayment } from "../controllers/payment.controller.ts";

const paymentRoute = new Hono();

paymentRoute.post("/payment/pay", pay);
paymentRoute.post("/payment/verify/:ref", verifyPayment);

export default paymentRoute;
