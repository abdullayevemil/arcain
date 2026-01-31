import { NextRequest, NextResponse } from "next/server";
import { readUsers, writeUsers } from "@/lib/data";
import type { User } from "@/types";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const users = await readUsers();
    const user = users.find((u: User) => u.id === id);
    if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const { password: _, ...safe } = user;
    return NextResponse.json(safe);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const users = await readUsers();
    const index = users.findIndex((u: User) => u.id === id);
    if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (body.name) users[index].name = body.name;
    if (body.email) users[index].email = body.email;
    if (body.password) users[index].password = body.password;
    if (body.role) users[index].role = body.role;
    await writeUsers(users);
    const { password: _, ...safe } = users[index];
    return NextResponse.json(safe);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const users = await readUsers();
    const filtered = users.filter((u: User) => u.id !== id);
    if (filtered.length === users.length) return NextResponse.json({ error: "Not found" }, { status: 404 });
    await writeUsers(filtered);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
