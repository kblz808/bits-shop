// utils/jwt.ts
import {sign, verify} from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs'

const JWT_SECRET = process.env.JWT_SECRET!;

export async function generateHash(password: string){
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword
}

export function generateToken(userId: string): string {
  return sign({ userId }, JWT_SECRET, { expiresIn: '1d' });
}

export function verifyToken(token: string): any {
  return verify(token, JWT_SECRET);
}

export function compareHash(a: string,  b: string): boolean {
  const isValidPassword = bcrypt.compareSync(a, b);
  return isValidPassword
}
