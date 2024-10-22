import { Document, Model, model, Schema } from "npm:mongoose";

export interface IChat extends Document {
  participants: Schema.Types.ObjectId[];
  messages: Schema.Types.ObjectId[];
}

export interface IMessage extends Document {
  chatId: Schema.Types.ObjectId;
  text: string;
  sender: Schema.Types.ObjectId;
  receiver: Schema.Types.ObjectId;
  timestamp: Date;
}

const chatSchema: Schema<IChat> = new Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: "User", required: true}],
  messages: [{type: Schema.Types.ObjectId, ref: "Message", default: []}],
});

const messageSchema: Schema<IMessage> = new Schema({
  chatId: {type: Schema.Types.ObjectId, ref: "Chat", required: true},
  text: {type: String, required: true},
  sender: {type: Schema.Types.ObjectId, ref: "User", required: true},
  receiver: {type: Schema.Types.ObjectId, ref: "User", required: true},
  timestamp: {type: Date, default: Date.now},
})

export const ChatModel: Model<IChat> = model("Chat", chatSchema);
export const MessageModel: Model<IMessage> = model("Message", messageSchema);
