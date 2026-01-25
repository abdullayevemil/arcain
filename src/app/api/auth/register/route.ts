import bcrypt from "bcryptjs";
import { prisma } from "../../../lib/db";
import { badRequest, json } from "../../../lib/http";
import { createSessionCookie } from "../../../lib/auth";
import { registerSchema } from "../../../lib/validators";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return badRequest("Invalid payload", parsed.error.flatten());
  }

  const { email, password, role, fullName, city } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return badRequest("Email already in use");

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      role,
      profile: {
        create: {
          fullName: fullName ?? null,
          city: city ?? null,
        },
      },
    },
    select: { id: true, email: true, role: true },
  });

  await createSessionCookie({ sub: user.id, role: user.role, email: user.email });

  return json({ user });
}
