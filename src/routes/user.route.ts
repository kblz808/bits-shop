import { Hono } from "hono";
import {
  addToWishlist,
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  loginUser,
  removeFromWishlist,
  updateUser,
} from "../controllers/user.controller.ts";

import { bearerAuth } from "hono/bearer-auth";
import { adminMiddleware } from "../middlewares/auth.middleware.ts";

const userRouter = new Hono();

userRouter.post("/users/register", createUser);
userRouter.post("/users/login", loginUser);
userRouter.post("/users/:productId/wishlist", addToWishlist);
userRouter.delete("/users/:productId/wishlist", removeFromWishlist);
// userRouter.post("/users/loan-request/:userId")

userRouter.use("/admin/*", bearerAuth({ verifyToken: adminMiddleware }));
userRouter.get("/admin/users", getAllUsers);
userRouter.get("/admin/users/:userId", getUser);
userRouter.put("/admin/users/:userId", updateUser);
userRouter.delete("/admin/users/:userId", deleteUser);

export default userRouter;
