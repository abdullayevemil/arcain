import bcrypt from "bcryptjs";
import { prisma } from "../../../lib/db";
import { badRequest, json, unauthorized } from "../../../lib/http";
import { createSessionCookie } from "../../../lib/auth";
import { loginSchema } from "../../../lib/validators";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) return badRequest("Invalid payload", parsed.error.flatten());

  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, role: true, passwordHash: true },
  });

  if (!user) return unauthorized("Invalid email or password");

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return unauthorized("Invalid email or password");

  await createSessionCookie({ sub: user.id, role: user.role, email: user.email });

  return json({ user: { id: user.id, email: user.email, role: user.role } });
}
