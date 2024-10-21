import { Hono } from "hono";
import { cors } from "hono/cors";
import * as dotenv from "npm:dotenv";
import { ConnectDB } from "./utils/db.utils.ts";
import { InitRoutes } from "./routes/index.ts";

dotenv.config();

const app = new Hono();

app.use(cors({
  origin: "*",
  allowMethods: ["GET", "POST", "PUT", "DELETE"],
  allowHeaders: ["Content-Type", "Authorization"],
  maxAge: 600,
  credentials: true,
}));

InitRoutes(app);

// ConnectDB();

Deno.serve({ port: 3000 }, app.fetch);
