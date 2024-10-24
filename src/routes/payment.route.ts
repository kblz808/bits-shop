import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import { userMiddleware } from "../middlewares/auth.middleware.ts";
import { pay, verifyTransaction } from "../controllers/payment.controller.ts";

const paymentRouter = new Hono();

paymentRouter.use("/payment/*", bearerAuth({ verifyToken: userMiddleware }));

paymentRouter.post("/payment/pay", pay);
paymentRouter.post("/payment/verify/:txId", verifyTransaction);

export default paymentRouter;
