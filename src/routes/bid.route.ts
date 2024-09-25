import { Hono } from 'hono';
import { createBid, acceptBid, rejectBid, getBid } from '../controllers/bid.controller'; 
const bidRoute =  new Hono();

bidRoute.post('/bid/bid-request', createBid);
bidRoute.get('/bid/get-bid/:bidId', getBid);
bidRoute.put('/bid/reject-bid/:bidId', rejectBid);
bidRoute.put('/bid/accept-bid/:bidId', acceptBid);

export default bidRoute;
