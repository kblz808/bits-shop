import { Hono } from "hono";

import { swaggerUI } from "npm:@hono/swagger-ui";

import productRouter from "./product.route.ts";
import userRouter from "./user.route.ts";
import bidRouter from "./bid.route.ts";
import paymentRouter from "./payment.route.ts";

import doc from "../swagger.json" with { type: "json" };

export function InitRoutes(app: Hono) {
  app.get("/ui", swaggerUI({ spec: doc }));
  app.route("/api", userRouter);
  app.route("/api", productRouter);
  app.route("/api", bidRouter);
  app.route("/api", paymentRouter);
}
