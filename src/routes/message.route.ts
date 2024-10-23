import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import { userMiddleware } from "../middlewares/auth.middleware.ts";
import {
  getChat,
  getMessage,
  newChat,
  newMessage,
} from "../controllers/message.controller.ts";

const messageRouter = new Hono();

messageRouter.use("/messages/*", bearerAuth({ verifyToken: userMiddleware }));

messageRouter.post("/messages/new", newChat);
messageRouter.post("/messages/send", newMessage);
messageRouter.get("/messages/chat/:chatId", getChat);
messageRouter.get("/messages/message/:messageId", getMessage);

export default messageRouter;
