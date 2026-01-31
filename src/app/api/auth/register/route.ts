import { NextRequest, NextResponse } from "next/server";
import { readUsers, writeUsers } from "@/lib/data";
import type { User, UserRole } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, role } = body;
    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: "Name, email, password and role required" }, { status: 400 });
    }
    const validRoles: UserRole[] = ["student", "landlord"];
    if (!validRoles.includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }
    const users = await readUsers();
    if (users.some((u: User) => u.email === email)) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }
    const newUser: User = {
      id: String(users.length + 1),
      name,
      email,
      password,
      role,
    };
    users.push(newUser);
    await writeUsers(users);
    const { password: _, ...safeUser } = newUser;
    return NextResponse.json({ user: safeUser });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
