import { NextRequest, NextResponse } from "next/server";
import { readUsers } from "@/lib/data";
import type { User } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }
    const users = await readUsers();
    const user = users.find((u: User) => u.email === email && u.password === password);
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    const { password: _, ...safeUser } = user;
    return NextResponse.json({ user: safeUser });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
