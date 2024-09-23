import mongoose, { Schema, Model, Document } from 'mongoose';

interface IProduct {
  _id: string;
  userId: string;
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

export interface IBid {
  _id: string;
  userId: string;
  amount: number;
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

export const ProductModel = mongoose.model('Product', productSchema);
