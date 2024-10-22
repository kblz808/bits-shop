import type { Context } from "hono";
// import { createMiddleware } from "hono/factory";
import { verifyToken } from "../utils/jwt.utils.ts";

export const adminMiddleware = async (token: string, c: Context) => {
  try {
    const userId = await verifyToken(token, true);
    c.set("userId", userId.sub);
    return true;
  } catch (_) {
    return false;
  }
};

export const userMiddleware = async (token: string, c: Context) => {
  try {
    const userId = await verifyToken(token, false);
    c.set("userId", userId.sub);
    return true;
  } catch (_) {
    return false;
  }
};
