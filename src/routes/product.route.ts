import { Hono } from 'hono';
import { createProduct } from '../controllers/product.controller';

const api = new Hono();

api.post('/products', createProduct);

export default api;
