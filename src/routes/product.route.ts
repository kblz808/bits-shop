import { Hono } from 'hono';
import { createProduct, updateProduct, deleteProduct} from '../controllers/product.controller';

const productRoute = new Hono();

productRoute.post('/product/create-product', createProduct);
productRoute.put('/product/update-product/:id', updateProduct);
productRoute.delete('/product/delete-product/:id', deleteProduct)
// productRoute.post('/product/get-all-products', createProduct);
// productRoute.get('/product/get-product/:id')

export default productRoute;
