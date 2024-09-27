import { Hono } from 'hono';
import { createProduct, updateProduct, deleteProduct, getAllProducts, getProduct, getBidRequests, addToWishlist} from '../controllers/product.controller';
import { bearerAuth } from 'hono/bearer-auth';
import { tokenMiddleware } from '../middlewares/auth.middleware';


const productRoute = new Hono();

productRoute.use('/product/*', bearerAuth({verifyToken: tokenMiddleware}))

productRoute.post('/product/create-product', createProduct);
productRoute.put('/product/update-product/:productId', updateProduct);
productRoute.delete('/product/delete-product/:productId', deleteProduct);
productRoute.get('/product/get-all-products', getAllProducts);
productRoute.get('/product/get-product/:productId', getProduct);
productRoute.get('/product/get-bid-requests/:productId', getBidRequests);
productRoute.post('/product/add-to-wishlist/:productId', addToWishlist);


export default productRoute;
