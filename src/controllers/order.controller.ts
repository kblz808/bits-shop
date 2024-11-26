import type { Context } from "hono";
import { OrderModel } from "../models/order.model.ts";

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

export const getOrder = async (c: Context) => {
  try {
    const orderId = c.req.param("orderId");

    const order = await OrderModel.findById(orderId);

    if (!order) {
      return c.json({ error: "Order not found" }, 404);
    }

    return c.json(order, 200);
  } catch (error) {
    console.log(error);
    return c.json({ error: "Failed to get order data" }, 500);
  }
};
