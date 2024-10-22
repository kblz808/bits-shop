import { Document, Model, model, Schema } from "npm:mongoose";

export interface IProduct extends Document {
  userId: Schema.Types.ObjectId;
  name: string;
  description: string;
  images: string[];
  price: number;
  stock: number;
  isApproved: boolean;
  status: string;
  category: {
    name: string;
    subCategories: string[];
  };
  tag: string;
  createdAt: Date;
  updatedAt: Date;
  bids: Schema.Types.ObjectId[];
}

export interface IExchangeItem extends Document {
  userId: Schema.Types.ObjectId;
  productId: Schema.Types.ObjectId;
  name: string;
  description: string;
  images: string[];
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBid extends Document {
  productId: Schema.Types.ObjectId;
  bidderId: Schema.Types.ObjectId;
  amount: number;
  message: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export const productSchema: Schema<IProduct> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  images: [{ type: String, required: true }],
  category: [{
    name: {
      type: String,
      required: true,
    },
    // description: {type: String, required: true},
    subCategories: [{ type: String, required: true }],
  }],
  tag: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  bids: [{ type: Schema.Types.ObjectId, ref: "Bid" }],
  status: {
    type: String,
    enum: ["available", "sold", "lent", "pending"],
    default: "pending",
  },
  isApproved: { type: Boolean, default: false },
});

export const exchangeItemSchema: Schema<IExchangeItem> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", reqiured: true },
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String, required: true }],
  amount: { type: Number, reqiured: true },
});

export const bidSchema: Schema<IBid> = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  bidderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  message: { type: String },
  createdAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
});

export const ProductModel: Model<IProduct> = model("Product", productSchema);
export const BidModel: Model<IBid> = model("Bid", bidSchema);
export const ExchangeModel: Model<IExchangeItem> = model(
  "Exchange",
  exchangeItemSchema,
);
