import { Context } from 'hono';
import { UserModel, IUser  } from '../models/user.model';
import { generateToken, generateHash, compareHash} from '../utils/jwt.utils';
import mongoose from 'mongoose';
import { ProductModel } from '../models/product.model';

export const createUser = async (c: Context) => {
  try {
    const userData: IUser = await c.req.json() as IUser;

    const {username, email, password} = userData;

    const existingUser = await UserModel.findOne({ $or: [{username}, {email}]});
    if (existingUser) {
      return c.json({error: 'username or email already exists'})
    }

    const hashedPassword = await generateHash(password);
    
    const user = new UserModel({
      ...userData,
      password: hashedPassword
    });

    await user.save();

    const token = generateToken(user._id!.toString());

    return c.json({user, token}, 201);
    
  } catch (error) {
    console.log(error)
    return c.json({error: 'Failed to create user'}, 500);
  }
};

export const loginUser = async (c: Context) => {
  try {
    const {username, password} = await c.req.json();

    const user = await UserModel.findOne({username});

    if(!user){
      return c.json({error: 'invalid credentials'}, 401)
    }

    const isValidPassword = compareHash(password, user.password);
    if (!isValidPassword) {
      return c.json({error: 'invalid credentials'}, 401);
    }

    const token = generateToken(user._id!.toString());

    return c.json({user, token})
  } catch (error) {
    console.log(error)
    return c.json({error: 'Failed to login'}, 500)
  }
}

export const addToWishlist = async (c: Context) => {
  try {
    const userId = c.get('userId');
    let p_id = c.get('productId');
    const productId = new mongoose.Schema.Types.ObjectId(p_id);

    const user = await UserModel.findById(userId);
    if (!user) {
      return c.json({error: 'User not found'});
    }

    const product = await ProductModel.findById(productId);
    if (!product) {
      return c.json({error: 'Product not found'})
    }

    if (user.wishlist.includes(productId)) {
      return c.json({message: 'Product already in wishlist'})
    }

    user.wishlist.push(productId);
    await user?.save();

    return c.json({message: 'Added product to wishlist'}, 201)

  } catch (error) {
    return c.json({error: 'An unknown error occurred'}, 500);
  }
}

export const removeFromWishlist = async (c: Context) => {
  try {
    const userId = c.get('userId');
    let p_id = c.get('productId');
    const productId = new mongoose.Schema.Types.ObjectId(p_id);

    const user = await UserModel.findById(userId);
    if (!user) {
      return c.json({error: 'User not found'});
    }

    const product = await ProductModel.findById(productId);
    if (!product) {
      return c.json({error: 'Product not found'})
    }

    if (!user.wishlist.includes(productId)) {
      return c.json({message: 'Product no in wishlist'})
    }

    user.wishlist = user.wishlist.filter((id: mongoose.Schema.Types.ObjectId) => id != productId);
    await user?.save();

    return c.json({message: 'Added product to wishlist'}, 201)

  } catch (error) {
    return c.json({error: 'An unknown error occurred'}, 500);
  }
}
