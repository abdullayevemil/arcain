import { NextRequest, NextResponse } from "next/server";
import { readHouses, writeHouses } from "@/lib/data";
import type { House } from "@/types";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city");
    const search = searchParams.get("search")?.toLowerCase() || "";
    const sort = searchParams.get("sort") || "price_asc";
    const roommateFriendly = searchParams.get("roommateFriendly");
    const type = searchParams.get("type");
    const builtType = searchParams.get("builtType");
    const priceMin = searchParams.get("priceMin");
    const priceMax = searchParams.get("priceMax");
    const region = searchParams.get("region");
    const renovated = searchParams.get("renovated");
    const areaMin = searchParams.get("areaMin");
    const areaMax = searchParams.get("areaMax");
    const floorMin = searchParams.get("floorMin");
    const floorMax = searchParams.get("floorMax");
    const rooms = searchParams.get("rooms");
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(20, Math.max(1, parseInt(searchParams.get("limit") || "10", 10)));
    let houses = await readHouses();
    if (city) houses = houses.filter((h: House) => h.city === city);
    if (roommateFriendly === "true") houses = houses.filter((h: House) => h.roommateFriendly);
    if (type) houses = houses.filter((h: House) => h.type === type);
    if (builtType) houses = houses.filter((h: House) => h.builtType === builtType);
    if (priceMin != null && priceMin !== "") houses = houses.filter((h: House) => h.price >= Number(priceMin));
    if (priceMax != null && priceMax !== "") houses = houses.filter((h: House) => h.price <= Number(priceMax));
    if (region) houses = houses.filter((h: House) => h.address?.toLowerCase() === region.toLowerCase());
    if (renovated === "true") houses = houses.filter((h: House) => h.renovated);
    if (renovated === "false") houses = houses.filter((h: House) => !h.renovated);
    if (areaMin != null && areaMin !== "") houses = houses.filter((h: House) => (h.area ?? 0) >= Number(areaMin));
    if (areaMax != null && areaMax !== "") houses = houses.filter((h: House) => (h.area ?? 0) <= Number(areaMax));
    if (floorMin != null && floorMin !== "") houses = houses.filter((h: House) => (h.floor ?? 0) >= Number(floorMin));
    if (floorMax != null && floorMax !== "") houses = houses.filter((h: House) => (h.floor ?? 0) <= Number(floorMax));
    if (rooms != null && rooms !== "") {
      const r = Number(rooms);
      if (r === 4) houses = houses.filter((h: House) => h.rooms >= 4);
      else houses = houses.filter((h: House) => h.rooms === r);
    }
    if (search) {
      houses = houses.filter(
        (h: House) =>
          h.title.toLowerCase().includes(search) ||
          (h.description && h.description.toLowerCase().includes(search)) ||
          h.city.toLowerCase().includes(search) ||
          (h.address && h.address.toLowerCase().includes(search))
      );
    }
    if (sort === "price_asc") houses.sort((a: House, b: House) => a.price - b.price);
    else if (sort === "price_desc") houses.sort((a: House, b: House) => b.price - a.price);
    else if (sort === "rating_desc") houses.sort((a: House, b: House) => b.rating - a.rating);
    else if (sort === "rating_asc") houses.sort((a: House, b: House) => a.rating - b.rating);
    const total = houses.length;
    const start = (page - 1) * limit;
    const items = houses.slice(start, start + limit);
    const regions = [...new Set((await readHouses()).map((h: House) => h.address).filter(Boolean))].sort();
    return NextResponse.json({
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      regions,
    });
  } catch {
    return NextResponse.json({ error: "Failed to load houses" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      city,
      price,
      rooms,
      images,
      rating,
      description,
      roommateFriendly,
      type,
      builtType,
      address,
      renovated,
      area,
      floor,
    } = body;
    if (!title || !city || price == null) {
      return NextResponse.json({ error: "Title, city and price required" }, { status: 400 });
    }
    const houses = await readHouses();
    const newHouse: House = {
      id: String(houses.length + 1),
      title: title || "",
      city: city || "",
      price: Number(price) || 0,
      rooms: Number(rooms) || 1,
      images: Array.isArray(images) ? images : [],
      rating: Number(rating) || 0,
      description: description || "",
      roommateFriendly: Boolean(roommateFriendly),
      type: type === "house" ? "house" : "flat",
      builtType: builtType === "old" ? "old" : "new",
      address: address ?? "",
      renovated: Boolean(renovated),
      area: Number(area) || 0,
      floor: Number(floor) || 0,
    };
    houses.push(newHouse);
    await writeHouses(houses);
    return NextResponse.json(newHouse);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
