import { Hono } from "hono";

import { swaggerUI } from "npm:@hono/swagger-ui";

import productRoute from "./product.route.ts";
import userRoute from "./user.route.ts";
import bidRoute from "./bid.route.ts";
import paymentRoute from "./payment.route.ts";

import doc from "../swagger.json" with { type: "json" };

export function InitRoutes(app: Hono) {
  app.get("/ui", swaggerUI({ spec: doc }));
  app.route("/api", userRoute);
  app.route("/api", productRoute);
  app.route("/api", bidRoute);
  app.route("/api", paymentRoute);
}
