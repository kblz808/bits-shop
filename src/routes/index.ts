import { Hono } from "hono";

import { swaggerUI } from "npm:@hono/swagger-ui";

import productRouter from "./product.route.ts";
import userRouter from "./user.route.ts";
import bidRouter from "./bid.route.ts";
import paymentRouter from "./payment.route.ts";
import messageRouter from "./message.route.ts";

import doc from "../swagger.json" with { type: "json" };

export function InitRoutes(app: Hono) {
  app.get("/ui", swaggerUI({ spec: doc }));
  app.route("/api", userRouter);
  app.route("/api", productRouter);
  app.route("/api", bidRouter);
  app.route("/api", paymentRouter);
  app.route("/api", messageRouter);

  // app.post("/upload", async (c) => {
  //   const body = await c.req.blob();
  //   console.log(body);
  //   // console.log(body["image"]);
  //   return c.json({ message: "Upload successfull" });
  // });
}
