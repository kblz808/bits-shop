import { Hono } from 'hono'
import api from './routes/product.route'


import mongoose from 'mongoose';
import {config} from 'dotenv';

config();

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

app.get('/', (c) => {
  return c.json({
    ok: true,
    message: "hello there",
  })
})

app.route('/api', api)

connectDB();

export default {
  port: 3000,
  fetch: app.fetch,
};
