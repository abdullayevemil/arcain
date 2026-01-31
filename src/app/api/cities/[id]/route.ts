import { NextRequest, NextResponse } from "next/server";
import { readCities, writeCities } from "@/lib/data";
import type { City } from "@/types";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const cities = await readCities();
    const city = cities.find((c: City) => c.id === id);
    if (!city) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(city);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, slug, image, country } = body;
    const cities = await readCities();
    const index = cities.findIndex((c: City) => c.id === id);
    if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (name != null) cities[index].name = name;
    if (slug != null) cities[index].slug = slug;
    if (image != null) (cities[index] as City).image = image;
    if (country != null) (cities[index] as City).country = country;
    await writeCities(cities);
    return NextResponse.json(cities[index]);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const cities = await readCities();
    const filtered = cities.filter((c: City) => c.id !== id);
    if (filtered.length === cities.length) return NextResponse.json({ error: "Not found" }, { status: 404 });
    await writeCities(filtered);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
