import { Hono } from 'hono';
import { createBid, acceptBid, rejectBid, getBid } from '../controllers/bid.controller'; 
import { bearerAuth } from 'hono/bearer-auth';
import { tokenMiddleware } from '../middlewares/auth.middleware';

const bidRoute =  new Hono();

bidRoute.use('/bids/*', bearerAuth({verifyToken: tokenMiddleware}))

bidRoute.post('/bids', createBid);
bidRoute.get('/bids/:bidId', getBid);
bidRoute.put('/bids/:bidId/reject', rejectBid);
bidRoute.put('/bids/:bidId/accept', acceptBid);

export default bidRoute;
