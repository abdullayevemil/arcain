import { prisma } from "../../lib/db";
import { badRequest, json, unauthorized } from "../../lib/http";
import { requireAuth } from "../../lib/auth";
import { updateProfileSchema } from "../../lib/validators";

export async function GET() {
  const session = await requireAuth();
  if (!session) return unauthorized();

  const profile = await prisma.profile.findUnique({
    where: { userId: session.sub },
  });

  return json({ profile });
}

export async function PUT(req: Request) {
  const session = await requireAuth();
  if (!session) return unauthorized();

  const body = await req.json().catch(() => null);
  const parsed = updateProfileSchema.safeParse(body);
  if (!parsed.success) return badRequest("Invalid payload", parsed.error.flatten());

  const data = parsed.data;

  const updated = await prisma.profile.upsert({
    where: { userId: session.sub },
    create: {
      userId: session.sub,
      ...data,
      moveInDate: data.moveInDate ? new Date(data.moveInDate) : undefined,
    },
    update: {
      ...data,
      moveInDate: data.moveInDate ? new Date(data.moveInDate) : data.moveInDate,
    },
  });

  return json({ profile: updated });
}
