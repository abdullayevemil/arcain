import { prisma } from "../../lib/db";
import { badRequest, forbidden, json, unauthorized } from "../../lib/http";
import { assertRole, requireAuth } from "../../lib/auth";
import { createHomeSchema } from "../../lib/validators";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city") || undefined;
  const take = Math.min(Number(searchParams.get("take") || 30), 100);

  const homes = await prisma.home.findMany({
    where: city ? { city } : undefined,
    orderBy: { createdAt: "desc" },
    take,
    include: {
      landlord: { select: { id: true, email: true, profile: true } },
    },
  });

  return json({ homes });
}

export async function POST(req: Request) {
  const session = await requireAuth();
  if (!session) return unauthorized();
  if (!assertRole(session, ["LANDLORD"])) return forbidden("Only landlords can create homes");

  const body = await req.json().catch(() => null);
  const parsed = createHomeSchema.safeParse(body);
  if (!parsed.success) return badRequest("Invalid payload", parsed.error.flatten());

  const home = await prisma.home.create({
    data: {
      landlordId: session.sub,
      ...parsed.data,
    },
  });

  return json({ home }, { status: 201 });
}
