import { Context } from 'hono';
import {  IBid, BidModel, ProductModel } from '../models/product.model';
import { ObjectId } from 'mongoose';

export const createBid = async (c: Context) => {
  try {
    const { productId, bidderId, amount, message } = await c.req.json() as IBid;

    const product = await ProductModel.findById(productId);
    if (!product) {
      return c.json({error: 'Product not found'}, 404);
    }

    const bid = new BidModel({
      productId,
      bidderId,
      amount,
      message,
      status: 'pending',
    })

    await bid.save();

    product.bids.push(bid._id as ObjectId);

    await product.save();

    return c.json({message: 'Bid created successfully'}, 200);
  } catch (error) {
    return c.json({error: 'An unknown error occurred'})
  }
}

export const acceptBid = async (c: Context) => {
  try {
    const bidId = c.req.param('bidId');

    const bid = await BidModel.findById(bidId);
    if (!bid) {
      return c.json({error: 'Bid not found'},  404);
    }

    bid.status = 'accepted';
    await bid.save();

    return c.json({message: 'Bid accepted successfully'}, 200);
  } catch (error) {
    return c.json({error: 'An unknown error occured'}, 500);
  }
}

export const rejectBid = async (c: Context) => {
  try {
    const bidId = c.req.param('bidId');

    const bid = await BidModel.findById(bidId);
    if (!bid) {
      return c.json({error: 'Bid not found'},  404);
    }

    bid.status = 'rejected';
    await bid.save();

    return c.json({message: 'Bid rejected successfully'}, 200);
  } catch (error) {
    return c.json({error: 'An unknown error occured'}, 500);
  }
}

export const getBid = async (c: Context) => {
  try {
    const bidId = c.req.param('bidId');

    const bid = await BidModel.findById(bidId);
    if (!bid) {
      return c.json({error: 'Bid not found'}, 404);
    }

    return c.json(bid);
  } catch (error) {
    return c.json({error: 'An unknown error occurred'});
  }
}
