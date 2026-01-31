import { NextRequest, NextResponse } from "next/server";
import { readCities, writeCities } from "@/lib/data";
import type { City } from "@/types";

export async function GET() {
  try {
    const cities = await readCities();
    return NextResponse.json(cities);
  } catch {
    return NextResponse.json({ error: "Failed to load cities" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, image, country } = body;
    if (!name || !slug) {
      return NextResponse.json({ error: "Name and slug required" }, { status: 400 });
    }
    const cities = await readCities();
    const newCity: City = {
      id: String(cities.length + 1),
      name,
      slug,
      ...(image != null && { image }),
      ...(country != null && { country }),
    };
    cities.push(newCity);
    await writeCities(cities);
    return NextResponse.json(newCity);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
