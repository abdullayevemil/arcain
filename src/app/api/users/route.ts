import { NextRequest, NextResponse } from "next/server";
import { readUsers, writeUsers } from "@/lib/data";
import type { User } from "@/types";

export async function GET() {
  try {
    const users = await readUsers();
    const safe = users.map(({ password: _, ...u }) => u);
    return NextResponse.json(safe);
  } catch {
    return NextResponse.json({ error: "Failed to load users" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, role } = body;
    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: "Name, email, password and role required" }, { status: 400 });
    }
    const users = await readUsers();
    if (users.some((u: User) => u.email === email)) {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 });
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
    const { password: _, ...safe } = newUser;
    return NextResponse.json(safe);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
