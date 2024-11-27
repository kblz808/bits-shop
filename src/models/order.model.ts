import { Document, Model, model, Schema } from "npm:mongoose";

export interface Product {
  product_id: string;
  quantity: number;
}

export interface IOrder extends Document {
  userId: Schema.Types.ObjectId;
  items: Product[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export const orderSchema: Schema<IOrder> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      product_id: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  status: {
    type: String,
    enum: ["pending", "processing", "paid", "denied", "paid"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const OrderModel: Model<IOrder> = model("Order", orderSchema);
