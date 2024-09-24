import { Hono } from 'hono';
import { createUser, loginUser} from '../controllers/user.controller'; 

const api = new Hono();

api.post('/user/register', createUser);
api.post('/user/login', loginUser);

export default api;
