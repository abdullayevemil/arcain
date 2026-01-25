import { prisma } from "../../lib/db";
import { json, unauthorized } from "../../lib/http";
import { requireAuth } from "../../lib/auth";

export async function GET() {
  const session = await requireAuth();
  if (!session) return unauthorized();

  const me = await prisma.user.findUnique({
    where: { id: session.sub },
    select: {
      id: true,
      email: true,
      role: true,
      profile: true,
    },
  });

  return json({ user: me });
}
