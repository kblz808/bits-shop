import { Document, Model, model, Schema } from "npm:mongoose";

export interface IOrder extends Document {
  userId: Schema.Types.ObjectId;
  products: Schema.Types.ObjectId[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export const orderSchema: Schema<IOrder> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  products: [{ type: Schema.Types.ObjectId, ref: "Product", required: true }],
  status: {
    type: String,
    enum: ["pending", "processing", "paid", "denied", "paid"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const OrderModel: Model<IOrder> = model("Order", orderSchema);
