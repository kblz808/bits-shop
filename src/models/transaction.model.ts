import { Document, Model, model, Schema } from "npm:mongoose";

export interface ITransaction extends Document {
  buyerId: Schema.Types.ObjectId;
  productId: Schema.Types.ObjectId;
  txRef: string;
  status: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}

const transactionSchema: Schema<ITransaction> = new Schema({
  buyerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  txRef: { type: String, required: true, unique: true },
  status: {
    type: String,
    required: true,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  amount: { type: Number, required: true },
});

export const TransactionModel: Model<ITransaction> = model(
  "Transaction",
  transactionSchema,
);
