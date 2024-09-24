import { Hono } from 'hono';
import { createProduct } from '../controllers/product.controller';

const productRoute = new Hono();

productRoute.post('/products', createProduct);

export default productRoute;
