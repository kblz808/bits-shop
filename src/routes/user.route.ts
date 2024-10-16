import { Hono } from "hono";
import {
  addToWishlist,
  createUser,
  loginUser,
  removeFromWishlist,
} from "../controllers/user.controller.ts";
import { bearerAuth } from "hono/bearer-auth";
import { tokenMiddleware } from "../middlewares/auth.middleware.ts";

const userRoute = new Hono();
userRoute.post("/users/register", createUser);
userRoute.post("/users/login", loginUser);
userRoute.use("/admin/*", bearerAuth({ verifyToken: tokenMiddleware }));

userRoute.post("/users/:productId/wishlist", addToWishlist);
userRoute.delete("/users/:productId/wishlist", removeFromWishlist);

export default userRoute;
