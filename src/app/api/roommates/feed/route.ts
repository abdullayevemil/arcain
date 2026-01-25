import { prisma } from "../../../lib/db";
import { json, unauthorized } from "../../../lib/http";
import { requireAuth } from "../../../lib/auth";
import { feedQuerySchema } from "../../../lib/validators";

/**
 * Returns a feed of roommate candidates (USERS only) similar to Tinder:
 * - excludes yourself
 * - excludes people you've already swiped on
 * - excludes people you're already matched with
 * - optional filters by city and budget overlap
 */
export async function GET(req: Request) {
  const session = await requireAuth();
  if (!session) return unauthorized();

  const { searchParams } = new URL(req.url);
  const parsed = feedQuerySchema.safeParse({
    city: searchParams.get("city") ?? undefined,
    minBudget: searchParams.get("minBudget") ?? undefined,
    maxBudget: searchParams.get("maxBudget") ?? undefined,
    take: searchParams.get("take") ?? undefined,
  });
  if (!parsed.success) {
    // keep it simple; return empty feed on invalid filters
    return json({ users: [] });
  }

  const { city, minBudget, maxBudget, take } = parsed.data;

  const mySwipes = await prisma.swipe.findMany({
    where: { swiperId: session.sub },
    select: { targetUserId: true },
  });
  const swipedIds = new Set(mySwipes.map((s) => s.targetUserId));

  const myMatches = await prisma.match.findMany({
    where: {
      OR: [{ userAId: session.sub }, { userBId: session.sub }],
    },
    select: { userAId: true, userBId: true },
  });
  const matchedIds = new Set<string>();
  for (const m of myMatches) {
    matchedIds.add(m.userAId === session.sub ? m.userBId : m.userAId);
  }

  // Candidates are USERS with profiles (optional), excluding swiped+matched+self.
  // Budget filter: overlap with candidate's [budgetMin,budgetMax]
  const users = await prisma.user.findMany({
    where: {
      id: {
        notIn: [session.sub, ...Array.from(swipedIds), ...Array.from(matchedIds)],
      },
      role: "USER",
      profile: city || minBudget != null || maxBudget != null ? {
        is: {
          ...(city ? { city } : {}),
          ...(minBudget != null ? { budgetMax: { gte: minBudget } } : {}),
          ...(maxBudget != null ? { budgetMin: { lte: maxBudget } } : {}),
        },
      } : undefined,
    },
    take,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      email: true,
      profile: true,
    },
  });

  return json({ users });
}
