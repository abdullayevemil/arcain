import { prisma } from "../../../lib/db";
import { json, unauthorized } from "../../../lib/http";
import { requireAuth } from "../../../lib/auth";

export async function GET() {
  const session = await requireAuth();
  if (!session) return unauthorized();

  const matches = await prisma.match.findMany({
    where: {
      OR: [{ userAId: session.sub }, { userBId: session.sub }],
    },
    orderBy: { createdAt: "desc" },
    include: {
      userA: { select: { id: true, profile: true } },
      userB: { select: { id: true, profile: true } },
      _count: { select: { messages: true } },
    },
  });

  const normalized = matches.map((m) => ({
    id: m.id,
    createdAt: m.createdAt,
    otherUser: m.userAId === session.sub ? m.userB : m.userA,
    messageCount: m._count.messages,
  }));

  return json({ matches: normalized });
}
