import {
  compareSync,
  genSalt,
  hash,
} from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { sign, verify } from "hono/jwt";

export async function generateHash(password: string) {
  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
}

export function generateToken(
  userId: string,
  isAdmin: boolean,
): Promise<string> {
  const JWT_USER_SECRET = Deno.env.get("JWT_USER_SECRET")!;
  const JWT_ADMIN_SECRET = Deno.env.get("JWT_ADMIN_SECRET")!;

  const payload = {
    sub: userId,
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7),
  };

  if (isAdmin) {
    return sign(payload, JWT_ADMIN_SECRET);
  }
  return sign(payload, JWT_USER_SECRET);
}

export function verifyToken(token: string, isAdmin: boolean): Promise<any> {
  const JWT_USER_SECRET = Deno.env.get("JWT_USER_SECRET")!;
  const JWT_ADMIN_SECRET = Deno.env.get("JWT_ADMIN_SECRET")!;

  if (isAdmin) {
    return verify(token, JWT_ADMIN_SECRET);
  }
  return verify(token, JWT_USER_SECRET);
}

export function compareHash(a: string, b: string): boolean {
  const isValidPassword = compareSync(a, b);
  return isValidPassword;
}
