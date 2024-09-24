import { Schema, Model, Document, model} from 'mongoose';

export interface IUser extends Document {
  first_name: string;
  last_name: string;
  username: string;
  phone_number: string;
  school_id: string;
  email: string;
  password: string;
  is_admin: boolean;
  account_balance: number;
  is_blocked: boolean;
  purchased_products: [Schema.Types.ObjectId];
  profile_img: string;
  wishlist: [Schema.Types.ObjectId]; 
}

export const userSchema: Schema<IUser> = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    username: { type: String, required: true },
    phone_number: { type: String, required: true },
    school_id: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true
    },
    password: { type: String, required: true },
    is_admin: {
      type: Boolean,
      default: false
    },
    account_balance: { type: Number, default: 0 },
    is_blocked: { type: Boolean, default: false },
    purchased_products: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
      default: [],
    },
    profile_img: {type: String},
    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product'
      }
    ]
  },
);

export const UserModel: Model<IUser> = model('User', userSchema);
