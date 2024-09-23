import { Schema, model } from 'mongoose';

interface ProfileImg {
  public_id: string;
  secure_url: string;
}

const userSchema = new Schema(
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
    profileImg: {type: ProfileImg },
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

export default model('user', userSchema);