import type { Context } from "hono";
import { BidModel, IProduct, ProductModel } from "../models/product.model.ts";
// import {Readable} from 'stream'

export const createProduct = async (c: Context) => {
  try {
    const productData = await c.req.json();

    // imageBucket(productData);

    const product = new ProductModel(productData);
    await product.save();
    return c.json(product, 201);
  } catch (error) {
    console.log(error);
    return c.json({ error: "Failed to create product" }, 500);
  }
};

export const updateProduct = async (c: Context) => {
  try {
    const id = c.req.param("productId");

    const updatedData = await c.req.json() as IProduct;
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      updatedData,
      { new: true },
    );

    if (!updatedProduct) {
      return c.json({ error: "Product not found" }, 404);
    }

    return c.json(updatedProduct, 200);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    }
    return c.json({ error: "Unknown error occurred" }, 500);
  }
};

export const deleteProduct = async (c: Context) => {
  try {
    const id = c.req.param("productId");

    const deletedProduct = await ProductModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return c.json({ error: "Product not found" }, 404);
    }

    return c.json({ message: "Product deleted successfully" }, 200);
  } catch (error) {
    return c.json({ error: "An unknown error occurred" }, 500);
  }
};

export const getAllProducts = async (c: Context) => {
  try {
    const products = await ProductModel.find();

    return c.json(products, 200);

    // for streaaming data (future)
    // const cursor = Product.find().select('name price description').lean().cursor();

    // const readable = new Readable({
    //   objectMode: true,
    //   read() {}
    // });

    // cursor.on('data', (doc) => {
    //   readable.push(JSON.stringify(doc));
    // });

    // cursor.on('end', () => {
    //   readable.push(null);
    // });
    // c.header('Content-Type', 'application/json');
    // c.header('Transfer-Encoding', 'chunked');

    // readable.pipe(c.res);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    }
    return c.json({ error: "An unknown error occurred" }, 500);
  }
};

export const getProduct = async (c: Context) => {
  try {
    const productId = c.req.param("productId");

    const product = await ProductModel.findById(productId);

    if (!product) {
      return c.json({ error: "Product not found" }, 404);
    }

    return c.json(product, 200);
  } catch (error) {
    return c.json({ error: "An unknown error occured" }, 500);
  }
};

export const getBidRequests = async (c: Context) => {
  try {
    const productId = c.req.param("productId");

    const product = await ProductModel.findById(productId);
    if (!product) {
      return c.json({ error: "Product not found" }, 404);
    }

    const bids = await BidModel.find({ productId });

    return c.json(bids);
  } catch (error) {
    return c.json({ error: "An unknown erro  occurred" }, 500);
  }
};
