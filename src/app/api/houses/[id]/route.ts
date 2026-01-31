import { NextRequest, NextResponse } from "next/server";
import { readHouses, writeHouses } from "@/lib/data";
import type { House } from "@/types";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const houses = await readHouses();
    const house = houses.find((h: House) => h.id === id);
    if (!house) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(house);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const houses = await readHouses();
    const index = houses.findIndex((h: House) => h.id === id);
    if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const h = houses[index];
    if (body.title != null) h.title = body.title;
    if (body.city != null) h.city = body.city;
    if (body.price != null) h.price = Number(body.price);
    if (body.rooms != null) h.rooms = Number(body.rooms);
    if (Array.isArray(body.images)) h.images = body.images;
    if (body.rating != null) h.rating = Number(body.rating);
    if (body.description != null) h.description = body.description;
    if (body.roommateFriendly != null) h.roommateFriendly = Boolean(body.roommateFriendly);
    if (body.type != null) h.type = body.type === "house" ? "house" : "flat";
    if (body.builtType != null) h.builtType = body.builtType === "old" ? "old" : "new";
    if (body.address != null) h.address = body.address;
    if (body.renovated != null) h.renovated = Boolean(body.renovated);
    if (body.area != null) h.area = Number(body.area);
    if (body.floor != null) h.floor = Number(body.floor);
    await writeHouses(houses);
    return NextResponse.json(h);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const houses = await readHouses();
    const filtered = houses.filter((h: House) => h.id !== id);
    if (filtered.length === houses.length) return NextResponse.json({ error: "Not found" }, { status: 404 });
    await writeHouses(filtered);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
