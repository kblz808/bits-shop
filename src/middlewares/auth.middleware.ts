import { Context } from "hono";
import { createMiddleware } from "hono/factory";
import { verifyToken } from "../utils/jwt.utils.ts";

export const tokenMiddleware = async (token: string, c: Context) => {
  const userId = await verifyToken(token);
  if (userId) {
    c.set("userId", userId);
    return true;
  }

  return false;
};
