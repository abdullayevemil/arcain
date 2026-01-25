import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import type { Role } from "@prisma/client";

const COOKIE_NAME = "session";
const ALG = "HS256";

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("JWT_SECRET is missing or too short (>= 32 chars).");
  }
  return new TextEncoder().encode(secret);
}

export type SessionPayload = {
  sub: string; // userId
  role: Role;
  email: string;
};

export async function createSessionCookie(payload: SessionPayload) {
  const token = await new SignJWT({ role: payload.role, email: payload.email })
    .setProtectedHeader({ alg: ALG })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime("14d")
    .sign(getSecret());

  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
}

export function clearSessionCookie() {
  cookies().set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
}

export async function getSession(): Promise<SessionPayload | null> {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecret());
    const sub = payload.sub;
    const role = payload.role as Role | undefined;
    const email = payload.email as string | undefined;

    if (!sub || !role || !email) return null;

    return { sub, role, email };
  } catch {
    return null;
  }
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) return null;
  return session;
}

export function assertRole(session: SessionPayload, allowed: Role[]) {
  if (!allowed.includes(session.role)) {
    return false;
  }
  return true;
}
