import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const hash = async (pw) => bcrypt.hash(pw, 10);

async function main() {
  // Create demo users if DB is empty
  const existing = await prisma.user.findFirst();
  if (existing) {
    console.log("DB already has data; skipping seed.");
    return;
  }

  const landlord = await prisma.user.create({
    data: {
      email: "landlord@example.com",
      passwordHash: await hash("Password123!"),
      role: "LANDLORD",
      profile: { create: { fullName: "Demo Landlord", city: "Baku", bio: "I list homes." } },
      homes: {
        create: [
          { title: "Cozy 2-room near metro", city: "Baku", price: 450, rooms: 2, furnished: true, amenities: "wifi,heating", photos: "" }
        ]
      }
    }
  });

  const students = [
    { email: "user1@example.com", fullName: "Aylin", city: "Baku", university: "BHOS", budgetMin: 200, budgetMax: 350, interests: "gym,reading" },
    { email: "user2@example.com", fullName: "Murad", city: "Baku", university: "ADA", budgetMin: 250, budgetMax: 400, interests: "football,coffee" },
    { email: "user3@example.com", fullName: "Leyla", city: "Ganja", university: "ASOIU", budgetMin: 150, budgetMax: 300, interests: "music,travel" }
  ];

  for (const s of students) {
    await prisma.user.create({
      data: {
        email: s.email,
        passwordHash: await hash("Password123!"),
        role: "USER",
        profile: { create: { ...s } }
      }
    });
  }

  console.log("Seed complete:", { landlordId: landlord.id });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
