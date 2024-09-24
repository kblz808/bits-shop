import { Context } from 'hono';
import { ProductModel } from '../models/product.model';

export const createProduct = async (c: Context) => {
  try {
    const productData = await c.req.json();
    console.log(productData);
    const product = new ProductModel(productData);
    await product.save();
    return c.json(product, 201);
  } catch (error) {
    console.log(error)
    return c.json({error: 'Failed to create product'}, 500);
  }
};
