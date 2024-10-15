import { Hono } from 'hono';
import { createUser, loginUser, addToWishlist, removeFromWishlist} from '../controllers/user.controller';
import { bearerAuth } from 'hono/bearer-auth'
import { tokenMiddleware } from '../middlewares/auth.middleware';

const userRoute = new Hono();
userRoute.post('/users/register', createUser);
userRoute.post('/users/login', loginUser);
userRoute.use('/admin/*', bearerAuth({verifyToken: tokenMiddleware}))

userRoute.post('/users/:productId/wishlist', addToWishlist);
userRoute.delete('/users/:productId/wishlist', removeFromWishlist);

export default userRoute;
