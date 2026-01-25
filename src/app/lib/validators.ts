import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(72),
  role: z.enum(["USER", "LANDLORD"]).default("USER"),
  fullName: z.string().min(1).max(120).optional(),
  city: z.string().min(1).max(80).optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(72),
});

export const updateProfileSchema = z.object({
  fullName: z.string().min(1).max(120).optional().nullable(),
  gender: z.string().max(32).optional().nullable(),
  age: z.number().int().min(16).max(99).optional().nullable(),
  city: z.string().max(80).optional().nullable(),
  university: z.string().max(120).optional().nullable(),
  bio: z.string().max(1200).optional().nullable(),
  budgetMin: z.number().int().min(0).max(1_000_000).optional().nullable(),
  budgetMax: z.number().int().min(0).max(1_000_000).optional().nullable(),
  moveInDate: z.string().datetime().optional().nullable(),
  interests: z.string().max(500).optional().nullable(),
  photoUrl: z.string().url().optional().nullable(),
});

export const createHomeSchema = z.object({
  title: z.string().min(3).max(120),
  description: z.string().max(2000).optional().nullable(),
  city: z.string().min(1).max(80),
  address: z.string().max(200).optional().nullable(),
  price: z.number().int().min(0).max(1_000_000),
  rooms: z.number().int().min(0).max(50).optional().nullable(),
  baths: z.number().int().min(0).max(50).optional().nullable(),
  furnished: z.boolean().optional().default(false),
  amenities: z.string().max(500).optional().nullable(),
  photos: z.string().max(2000).optional().nullable(),
});

export const updateHomeSchema = createHomeSchema.partial();

export const feedQuerySchema = z.object({
  city: z.string().max(80).optional(),
  minBudget: z.coerce.number().int().min(0).optional(),
  maxBudget: z.coerce.number().int().min(0).optional(),
  take: z.coerce.number().int().min(1).max(50).optional().default(20),
});

export const swipeSchema = z.object({
  targetUserId: z.string().min(1),
  direction: z.enum(["like", "pass"]),
});

export const sendMessageSchema = z.object({
  text: z.string().min(1).max(2000),
});
