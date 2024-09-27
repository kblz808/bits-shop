import { Hono } from 'hono';
import { createBid, acceptBid, rejectBid, getBid } from '../controllers/bid.controller'; 
import { bearerAuth } from 'hono/bearer-auth';
import { tokenMiddleware } from '../middlewares/auth.middleware';

const bidRoute =  new Hono();

bidRoute.use('/bid/*', bearerAuth({verifyToken: tokenMiddleware}))

bidRoute.post('/bid/bid-request', createBid);
bidRoute.get('/bid/get-bid/:bidId', getBid);
bidRoute.put('/bid/reject-bid/:bidId', rejectBid);
bidRoute.put('/bid/accept-bid/:bidId', acceptBid);

export default bidRoute;
