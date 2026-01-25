import { prisma } from "../../../lib/db";
import { badRequest, forbidden, json, notFound, unauthorized } from "../../../lib/http";
import { assertRole, requireAuth } from "../../../lib/auth";
import { updateHomeSchema } from "../../../lib/validators";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const home = await prisma.home.findUnique({
    where: { id: params.id },
    include: { landlord: { select: { id: true, email: true, profile: true } } },
  });
  if (!home) return notFound("Home not found");
  return json({ home });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await requireAuth();
  if (!session) return unauthorized();
  if (!assertRole(session, ["LANDLORD"])) return forbidden("Only landlords can update homes");

  const body = await req.json().catch(() => null);
  const parsed = updateHomeSchema.safeParse(body);
  if (!parsed.success) return badRequest("Invalid payload", parsed.error.flatten());

  const existing = await prisma.home.findUnique({ where: { id: params.id } });
  if (!existing) return notFound("Home not found");
  if (existing.landlordId !== session.sub) return forbidden("You can update only your own homes");

  const home = await prisma.home.update({
    where: { id: params.id },
    data: parsed.data,
  });

  return json({ home });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const session = await requireAuth();
  if (!session) return unauthorized();
  if (!assertRole(session, ["LANDLORD"])) return forbidden("Only landlords can delete homes");

  const existing = await prisma.home.findUnique({ where: { id: params.id } });
  if (!existing) return notFound("Home not found");
  if (existing.landlordId !== session.sub) return forbidden("You can delete only your own homes");

  await prisma.home.delete({ where: { id: params.id } });
  return json({ ok: true });
}
