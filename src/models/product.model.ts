import { Schema, Model, Document, model } from 'mongoose';

interface IProduct extends Document{
  _id: string;
  userId: Schema.Types.ObjectId;
  name: string;
  description: string;
  images: string[];
  price: number;
  stock: number;
  isApproved: boolean;
  status: string;
  categories: string[];
  createdAt: Date;
  updatedAt: Date;
  bids: IBid[],
}

export interface IBid extends Document {
  _id: string;
  bidderId: Schema.Types.ObjectId;
  amount: number;
  message: string;
  status: string;
  createdAt: Date;
}

export const productSchema: Schema<IProduct> = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    images: [{ type: String, required: true }],
    categories: [{ type: String, required: true }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    bids: [{ type: Schema.Types.ObjectId, ref: 'Bid' }],
    status: { type: String, enum: ['available', 'sold', 'lent', 'pending'], default: 'pending' },
    isApproved: { type: Boolean, default: false },
});

export const bidSchema: Schema<IBid> = new Schema({
  bidderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  message: {type: String},
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
});

export const ProductModel: Model<IProduct> = model('Product', productSchema);
export const BidModel: Model<IBid> = model('Bid', bidSchema);
