import type { Context } from "hono";
import {
  ChatModel,
  type IChat,
  type IMessage,
  MessageModel,
} from "../models/message.model.ts";
import { UserModel } from "../models/user.model.ts";

export const newChat = async (c: Context) => {
  try {
    const chatData: IChat = await c.req.json() as IChat;

    const chat = new ChatModel(chatData);
    await chat.save();

    return c.json({ chat_id: chat._id }, 200);
  } catch (_) {
    return c.json({ error: "Failed to create new chat" }, 500);
  }
};

export const newMessage = async (c: Context) => {
  try {
    const messageData: IMessage = await c.req.json() as IMessage;

    const message = new MessageModel(messageData);
    await message.save();

    await ChatModel.findByIdAndUpdate(
      message.chatId,
      { $push: { messages: message._id } },
      { new: true },
    );

    return c.json({ message_id: message._id }, 200);
  } catch (error) {
    return c.json({ error: "Faile to send message" }, 500);
  }
};

export const getChat = async (c: Context) => {
  try {
    const chatId = c.req.param("chatId");
    const chat = await UserModel.findById(chatId);

    if (!chat) {
      return c.json({ message: "chat not found" }, 404);
    }

    return c.json(chat, 200);
  } catch (error) {
    return c.json({ error: "Unable to get chat" }, 500);
  }
};

export const getMessage = async (c: Context) => {
  try {
    const messageId = c.req.param("messageId");
    const message = await MessageModel.findById(messageId);

    if (!message) {
      return c.json({ message: "message not found" }, 404);
    }

    return c.json(message, 200);
  } catch (error) {
    return c.json({ error: "Unable to get message" }, 500);
  }
};
