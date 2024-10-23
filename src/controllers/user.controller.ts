import type { Context } from "hono";
import { IUser, UserModel } from "../models/user.model.ts";
import {
  compareHash,
  generateHash,
  generateToken,
} from "../utils/jwt.utils.ts";
import mongoose from "npm:mongoose";
import { ProductModel } from "../models/product.model.ts";

export const createUser = async (c: Context) => {
  try {
    const userData: IUser = await c.req.json() as IUser;

    const { username, email, password } = userData;

    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      return c.json({ error: "username or email already exists" });
    }

    const hashedPassword = await generateHash(password);

    const user = new UserModel({
      ...userData,
      password: hashedPassword,
    });

    await user.save();

    let token;
    if (user.is_admin) {
      token = await generateToken(user._id!.toString(), true);
    }
    token = await generateToken(user._id!.toString(), false);

    const userjson = {
      id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      phone_number: user.phone_number,
      school_id: user.school_id,
      email: user.email,
    };

    return c.json({ userjson, token }, 201);
  } catch (error) {
    console.log(error);
    return c.json({ error: "Failed to create user" }, 500);
  }
};

export const loginUser = async (c: Context) => {
  try {
    const { username, password } = await c.req.json();

    const user = await UserModel.findOne({ username });

    if (!user) {
      return c.json({ error: "invalid credentials" }, 401);
    }

    const isValidPassword = compareHash(password, user.password);
    if (!isValidPassword) {
      return c.json({ error: "invalid credentials" }, 401);
    }

    let token;
    if (user.is_admin) {
      token = await generateToken(user._id!.toString(), true);
    }
    token = await generateToken(user._id!.toString(), false);

    const userjson = {
      id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      phone_number: user.phone_number,
      school_id: user.school_id,
      email: user.email,
    };

    return c.json({ userjson, token }, 201);
  } catch (error) {
    console.log(error);
    return c.json({ error: "Failed to login" }, 500);
  }
};

export const addToWishlist = async (c: Context) => {
  try {
    const userId = c.req.param("userId");
    let p_id = c.req.param("productId");
    const productId = new mongoose.Schema.Types.ObjectId(p_id);

    const user = await UserModel.findById(userId);
    if (!user) {
      return c.json({ error: "User not found" });
    }

    const product = await ProductModel.findById(productId);
    if (!product) {
      return c.json({ error: "Product not found" });
    }

    if (user.wishlist.includes(productId)) {
      return c.json({ message: "Product already in wishlist" });
    }

    user.wishlist.push(productId);
    await user?.save();

    return c.json({ message: "Added product to wishlist" }, 201);
  } catch (error) {
    return c.json({ error: "An unknown error occurred" }, 500);
  }
};

export const removeFromWishlist = async (c: Context) => {
  try {
    const userId = c.get("userId");
    let p_id = c.get("productId");
    const productId = new mongoose.Schema.Types.ObjectId(p_id);

    const user = await UserModel.findById(userId);
    if (!user) {
      return c.json({ error: "User not found" });
    }

    const product = await ProductModel.findById(productId);
    if (!product) {
      return c.json({ error: "Product not found" });
    }

    if (!user.wishlist.includes(productId)) {
      return c.json({ message: "Product no in wishlist" });
    }

    user.wishlist = user.wishlist.filter((id: mongoose.Schema.Types.ObjectId) =>
      id != productId
    );
    await user?.save();

    return c.json({ message: "Added product to wishlist" }, 201);
  } catch (error) {
    return c.json({ error: "An unknown error occurred" }, 500);
  }
};

export const getAllUsers = async (c: Context) => {
  try {
    const users = await UserModel.find();
    return c.json(users, 200);
  } catch (_) {
    return c.json({ error: "Failed to get users" }, 500);
  }
};

export const getUser = async (c: Context) => {
  try {
    const userid = c.req.param("userId");

    const user = await UserModel.findById(userid);
    if (!user) {
      return c.json({ message: "user not found" }, 404);
    }

    return c.json(user, 200);
  } catch (_) {
    return c.json({ error: "failed to get user" }, 500);
  }
};

export const updateUser = async (c: Context) => {
  try {
    const id = c.req.param("userId");

    const updatedData = await c.req.json() as IUser;
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      updatedData,
      { new: true },
    );

    if (!updatedUser) {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json(updatedUser, 200);
  } catch (_) {
    return c.json({ error: "Failed to update user" }, 500);
  }
};

export const deleteUser = async (c: Context) => {
  try {
    const id = c.req.param("userId");

    const deletedUser = await UserModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json({ message: "User deleted successfully" }, 200);
  } catch (_) {
    return c.json({ error: "Failed to delete user" }, 500);
  }
};
