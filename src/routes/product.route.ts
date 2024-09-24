import { Hono } from 'hono';
import { createProduct, updateProduct, deleteProduct, getAllProducts, getProduct} from '../controllers/product.controller';

const productRoute = new Hono();

productRoute.post('/product/create-product', createProduct);
productRoute.put('/product/update-product/:id', updateProduct);
productRoute.delete('/product/delete-product/:id', deleteProduct)
productRoute.get('/product/get-all-products', getAllProducts);
productRoute.get('/product/get-product/:id', getProduct)

export default productRoute;
