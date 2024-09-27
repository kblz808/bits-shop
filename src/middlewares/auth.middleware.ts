import { Context } from 'hono';
import { createMiddleware } from 'hono/factory';
import { verifyToken } from '../utils/jwt.utils';

export const tokenMiddleware = async (token: string, c: Context) => {
  const userId = verifyToken(token)
  if (userId) {
    c.set('userId', userId);
    return true;
  }

  return false
}
