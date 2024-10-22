import { Hono } from "hono";
import {
  acceptBid,
  createBid,
  getBid,
  rejectBid,
} from "../controllers/bid.controller.ts";
import { bearerAuth } from "hono/bearer-auth";
import { userMiddleware } from "../middlewares/auth.middleware.ts";

const bidRouter = new Hono();

bidRouter.use("/bids/*", bearerAuth({ verifyToken: userMiddleware }));

bidRouter.post("/bids", createBid);
bidRouter.get("/bids/:bidId", getBid);
bidRouter.put("/bids/:bidId/reject", rejectBid);
bidRouter.put("/bids/:bidId/accept", acceptBid);

export default bidRouter;
