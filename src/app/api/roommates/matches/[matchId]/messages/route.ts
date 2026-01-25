import { prisma } from "../../../../../lib/db";
import { badRequest, forbidden, json, notFound, unauthorized } from "../../../../../lib/http";
import { requireAuth } from "../../../../../lib/auth";
import { sendMessageSchema } from "../../../../../lib/validators";

async function assertParticipant(matchId: string, userId: string) {
  const match = await prisma.match.findUnique({
    where: { id: matchId },
    select: { id: true, userAId: true, userBId: true },
  });
  if (!match) return { ok: false as const, status: 404 as const };
  if (match.userAId !== userId && match.userBId !== userId) return { ok: false as const, status: 403 as const };
  return { ok: true as const };
}

export async function GET(req: Request, { params }: { params: { matchId: string } }) {
  const session = await requireAuth();
  if (!session) return unauthorized();

  const check = await assertParticipant(params.matchId, session.sub);
  if (!check.ok) return check.status === 404 ? notFound("Match not found") : forbidden("Not a participant");

  const { searchParams } = new URL(req.url);
  const take = Math.min(Number(searchParams.get("take") || 50), 200);

  const messages = await prisma.message.findMany({
    where: { matchId: params.matchId },
    orderBy: { createdAt: "desc" },
    take,
    include: { sender: { select: { id: true, profile: true } } },
  });

  return json({ messages: messages.reverse() });
}

export async function POST(req: Request, { params }: { params: { matchId: string } }) {
  const session = await requireAuth();
  if (!session) return unauthorized();

  const check = await assertParticipant(params.matchId, session.sub);
  if (!check.ok) return check.status === 404 ? notFound("Match not found") : forbidden("Not a participant");

  const body = await req.json().catch(() => null);
  const parsed = sendMessageSchema.safeParse(body);
  if (!parsed.success) return badRequest("Invalid payload", parsed.error.flatten());

  const msg = await prisma.message.create({
    data: {
      matchId: params.matchId,
      senderId: session.sub,
      text: parsed.data.text,
    },
    include: { sender: { select: { id: true, profile: true } } },
  });

  return json({ message: msg }, { status: 201 });
}
