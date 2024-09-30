import { Hono } from 'hono'
import { cors } from 'hono/cors';

import productRoute from './routes/product.route'
import userRoute from './routes/user.route'; 
import bidRoute from './routes/bid.route'; 

import paymentRoute from './routes/payment.route';

import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!);
    console.log(`connected ${conn.connection.host}`)
  } catch (error) {
    console.log(error)
    process.exit(0)
  }
}

const app = new Hono()

app.use(cors({
 origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization'],
  maxAge: 600,
  credentials: true,
}));

app.get('/', (c) => {
  return c.json({
    ok: true,
    message: "hello there",
  })
})

app.route('/api', userRoute)
app.route('/api', productRoute)
app.route('/api', bidRoute)
app.route('/api', paymentRoute)

connectDB();

export default {
  port: 3000,
  fetch: app.fetch,
};
