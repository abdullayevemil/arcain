import { prisma } from "../../../lib/db";
import { badRequest, forbidden, json, notFound, unauthorized } from "../../../lib/http";
import { requireAuth } from "../../../lib/auth";
import { swipeSchema } from "../../../lib/validators";

/**
 * POST { targetUserId, direction: 'like' | 'pass' }
 * - Creates/updates swipe
 * - If LIKE and the other user previously LIKED you => create match
 */
export async function POST(req: Request) {
  const session = await requireAuth();
  if (!session) return unauthorized();

  const body = await req.json().catch(() => null);
  const parsed = swipeSchema.safeParse(body);
  if (!parsed.success) return badRequest("Invalid payload", parsed.error.flatten());

  const { targetUserId, direction } = parsed.data;

  if (targetUserId === session.sub) return badRequest("You cannot swipe yourself");

  const target = await prisma.user.findUnique({
    where: { id: targetUserId },
    select: { id: true, role: true },
  });
  if (!target) return notFound("Target user not found");
  if (target.role !== "USER") return forbidden("Roommate matchmaking is for USERS only");

  const dir = direction === "like" ? "LIKE" : "PASS";

  const swipe = await prisma.swipe.upsert({
    where: { swiperId_targetUserId: { swiperId: session.sub, targetUserId } },
    create: { swiperId: session.sub, targetUserId, direction: dir },
    update: { direction: dir },
    select: { id: true, direction: true, targetUserId: true, createdAt: true },
  });

  // Only attempt match on LIKE
  if (dir !== "LIKE") {
    return json({ swipe, matched: false });
  }

  // Check if target previously liked me
  const reciprocal = await prisma.swipe.findUnique({
    where: { swiperId_targetUserId: { swiperId: targetUserId, targetUserId: session.sub } },
    select: { direction: true },
  });

  if (!reciprocal || reciprocal.direction !== "LIKE") {
    return json({ swipe, matched: false });
  }

  // Create match with stable ordering to satisfy @@unique([userAId,userBId])
  const [userAId, userBId] = session.sub < targetUserId ? [session.sub, targetUserId] : [targetUserId, session.sub];

  const match = await prisma.match.upsert({
    where: { userAId_userBId: { userAId, userBId } },
    create: { userAId, userBId },
    update: {},
    include: {
      userA: { select: { id: true, profile: true } },
      userB: { select: { id: true, profile: true } },
    },
  });

  return json({ swipe, matched: true, match });
}
