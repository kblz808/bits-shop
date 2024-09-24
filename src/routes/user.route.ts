import { Hono } from 'hono';
import { createUser, loginUser} from '../controllers/user.controller'; 

const userRoute = new Hono();

userRoute.post('/user/register', createUser);
userRoute.post('/user/login', loginUser);

export default userRoute;
