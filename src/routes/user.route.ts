import { Hono } from 'hono';
import { createUser, loginUser} from '../controllers/user.controller';
import { bearerAuth } from 'hono/bearer-auth'
import { tokenMiddleware } from '../middlewares/auth.middleware';

const userRoute = new Hono();

userRoute.post('/user/register', createUser);
userRoute.post('/user/login', loginUser);
userRoute.use('/admin/*', bearerAuth({verifyToken: tokenMiddleware}))

export default userRoute;
