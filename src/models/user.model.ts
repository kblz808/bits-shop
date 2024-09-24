import { Schema, Model, Document, model} from 'mongoose';

interface IUser  extends Document {
  _id: Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  schoolId: string;
  email: string;
  password: string;
  isAdmin: boolean;
  account_balance: number;
  isBlocked: boolean;
  purchasedProducts: [Schema.Types.ObjectId];
  profileImg: string;
  wishlist: [Schema.Types.ObjectId]; 
}

export const userSchema: Schema<IUser> = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    schoolId: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true
    },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false
    },
    account_balance: { type: Number, default: 0 },
    isBlocked: { type: Boolean, default: false },
    purchasedProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    profileImg: {type: String},
    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product'
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const UserModel: Model<IUser> = model('User', userSchema);
