import type { Context } from "hono";
import { OrderModel } from "../models/order.model.ts";
import { ProductModel } from "../models/product.model.ts"; // added import statement

export const createOrder = async (c: Context) => {
  try {
    const orderData = await c.req.json();

    const order = new OrderModel(orderData);
    await order.save();

    return c.json(order, 201);
  } catch (error) {
    console.log(error);
    return c.json({ error: "Failed to create an order" }, 500);
  }
};

export const getOrders = async (c: Context) => {
  try {
    const orders = await OrderModel.find().populate({
      path: 'products.product_id',
      model: 'Product'
    });

    return c.json(orders, 200);
  } catch (error) {
    console.log(error);
    return c.json({ error: "Failed to get orders" }, 500);
  }
};


export const getOrder = async (c: Context) => {
  try {
    const orderId = c.req.param("orderId");

    const order = await OrderModel.findById(orderId).populate({
      path: 'products.product_id',
      model: 'Product'
    });

    if (!order) {
      return c.json({ error: "Order not found" }, 404);
    }

    return c.json(order, 200);
  } catch (error) {
    console.log(error);
    return c.json({ error: "Failed to get order data" }, 500);
  }
};

export const payOrder = async (c: Context) => {
  try {
    const orderId = c.req.param("orderId");

    const order = await OrderModel.findById(orderId).populate('products');

    if (!order) {
      return c.json({ error: "Order not found" }, 404);
    }

    if(order.status === 'paid') {
      return c.json({error: "Order already paid"}, 400);
    }

    const productUpdate = order.products.map(async (productId) => {
      const product = await ProductModel.findById(productId);

      if(!product) {
        return c.json({error: "Product not found"}, 404);
      }

      if(product.stock < 1) {
        return c.json({error: `Product ${product.name} is out of stock`}, 400);
      }

      product.status = "sold";
      product.stock -= 1;

      return product.save();
    })

    await Promise.all(productUpdate);

    order.status = "paid";
    await order.save();

    return c.json({message: 'Order paid successfully'}, 200);
  } catch (error) {
    console.log(error);
    return c.json({ error: "Failed to update the order" }, 500);
  }
};
