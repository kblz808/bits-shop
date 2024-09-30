import { Context } from 'hono';

const Chapa = require('chapa');

const chapa = new Chapa(process.env.CHAPA_TEST_KEY);

export const pay = async (c: Context) => {
  try {

    const customerInfo = await c.req.json();
    
    let res = await chapa.initialize(customerInfo, {autoRef: true})

    return c.json(res);
  } catch (error) {
    return c.json({error: 'An unknown error occurred'})
  }
}

export const verifyPayment = async (c: Context) => {
  try {
    const tx_ref = c.req.param('ref');

    let res = await chapa.verify(tx_ref);

    return c.json(res);
  } catch (error) {
    return c.json({error: 'An unknown error occurred'})
  }
}
