import { Hono } from 'hono';
import { bearerAuth } from 'hono/bearer-auth';
import { tokenMiddleware } from '../middlewares/auth.middleware';
import { pay, verifyPayment } from '../controllers/payment.controller';

const paymentRoute =  new Hono();

paymentRoute.post('/payment/pay', pay);
paymentRoute.post('/payment/verify/:ref', verifyPayment);

export default paymentRoute;
