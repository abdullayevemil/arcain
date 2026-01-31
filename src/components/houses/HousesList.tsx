"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import type { City } from "@/types";
import type { House } from "@/types";

interface HousesListProps {
  cities: City[];
}

interface HousesResponse {
  items: House[];
  total: number;
  totalPages: number;
  regions?: string[];
}

export function HousesList({ cities }: HousesListProps) {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState<string>("all");
  const [sort, setSort] = useState("price_asc");
  const [roommateFriendly, setRoommateFriendly] = useState<string>("all");
  const [type, setType] = useState<string>("all");
  const [builtType, setBuiltType] = useState<string>("all");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [region, setRegion] = useState<string>("all");
  const [renovated, setRenovated] = useState<string>("all");
  const [areaMin, setAreaMin] = useState("");
  const [areaMax, setAreaMax] = useState("");
  const [floorMin, setFloorMin] = useState("");
  const [floorMax, setFloorMax] = useState("");
  const [rooms, setRooms] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<HousesResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (city && city !== "all") params.set("city", city);
    if (search) params.set("search", search);
    params.set("sort", sort);
    if (roommateFriendly === "true") params.set("roommateFriendly", "true");
    if (type && type !== "all") params.set("type", type);
    if (builtType && builtType !== "all") params.set("builtType", builtType);
    if (priceMin !== "") params.set("priceMin", priceMin);
    if (priceMax !== "") params.set("priceMax", priceMax);
    if (region && region !== "all") params.set("region", region);
    if (renovated === "true") params.set("renovated", "true");
    if (renovated === "false") params.set("renovated", "false");
    if (areaMin !== "") params.set("areaMin", areaMin);
    if (areaMax !== "") params.set("areaMax", areaMax);
    if (floorMin !== "") params.set("floorMin", floorMin);
    if (floorMax !== "") params.set("floorMax", floorMax);
    if (rooms && rooms !== "all") params.set("rooms", rooms);
    params.set("page", String(page));
    params.set("limit", "9");
    setLoading(true);
    fetch(`/api/houses?${params}`)
      .then((res) => res.json())
      .then((d) => {
        setData(
          d.items
            ? {
                items: d.items,
                total: d.total ?? 0,
                totalPages: d.totalPages ?? 0,
                regions: d.regions ?? [],
              }
            : { items: [], total: 0, totalPages: 0, regions: [] }
        );
      })
      .finally(() => setLoading(false));
  }, [
    city,
    search,
    sort,
    roommateFriendly,
    type,
    builtType,
    priceMin,
    priceMax,
    region,
    renovated,
    areaMin,
    areaMax,
    floorMin,
    floorMax,
    rooms,
    page,
  ]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setSearch((e.currentTarget as HTMLFormElement).search?.value || "");
  };

  const resetFilters = () => {
    setType("all");
    setBuiltType("all");
    setPriceMin("");
    setPriceMax("");
    setRegion("all");
    setRenovated("all");
    setAreaMin("");
    setAreaMax("");
    setFloorMin("");
    setFloorMax("");
    setRooms("all");
    setPage(1);
  };

  const regions = data?.regions ?? [];

  return (
    <div className="mt-6 space-y-6">
      <form onSubmit={handleSearch} className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            name="search"
            placeholder="Search by title, description, region..."
            defaultValue={search}
            className="pl-9"
          />
        </div>
        <Select value={city} onValueChange={(v) => { setCity(v); setPage(1); }}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="All cities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All cities</SelectItem>
            {cities.map((c) => (
              <SelectItem key={c.id} value={c.slug}>{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-full sm:w-[160px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price_asc">Price: low to high</SelectItem>
            <SelectItem value="price_desc">Price: high to low</SelectItem>
            <SelectItem value="rating_desc">Rating: high first</SelectItem>
            <SelectItem value="rating_asc">Rating: low first</SelectItem>
          </SelectContent>
        </Select>
        <Select value={roommateFriendly} onValueChange={setRoommateFriendly}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Roommate" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="true">Roommate friendly only</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit">Search</Button>
      </form>
      <div className="rounded-xl border bg-card p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">Filters</span>
          <Button type="button" variant="ghost" size="sm" onClick={resetFilters}>
            Reset
          </Button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Type</label>
            <Select value={type} onValueChange={(v) => { setType(v); setPage(1); }}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="flat">Flat</SelectItem>
                <SelectItem value="house">House</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Built</label>
            <Select value={builtType} onValueChange={(v) => { setBuiltType(v); setPage(1); }}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Built" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="new">New built</SelectItem>
                <SelectItem value="old">Old built</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Rooms</label>
            <Select value={rooms} onValueChange={(v) => { setRooms(v); setPage(1); }}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Rooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Price min</label>
            <Input
              type="number"
              min={0}
              placeholder="Min"
              value={priceMin}
              onChange={(e) => { setPriceMin(e.target.value); setPage(1); }}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Price max</label>
            <Input
              type="number"
              min={0}
              placeholder="Max"
              value={priceMax}
              onChange={(e) => { setPriceMax(e.target.value); setPage(1); }}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Region</label>
            <Select value={region} onValueChange={(v) => { setRegion(v); setPage(1); }}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {regions.map((r) => (
                  <SelectItem key={r} value={r}>{r}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Renovated</label>
            <Select value={renovated} onValueChange={(v) => { setRenovated(v); setPage(1); }}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Remont" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="true">Yes</SelectItem>
                <SelectItem value="false">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Area m² min</label>
            <Input
              type="number"
              min={0}
              placeholder="Min"
              value={areaMin}
              onChange={(e) => { setAreaMin(e.target.value); setPage(1); }}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Area m² max</label>
            <Input
              type="number"
              min={0}
              placeholder="Max"
              value={areaMax}
              onChange={(e) => { setAreaMax(e.target.value); setPage(1); }}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Floor min</label>
            <Input
              type="number"
              min={0}
              placeholder="Min"
              value={floorMin}
              onChange={(e) => { setFloorMin(e.target.value); setPage(1); }}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Floor max</label>
            <Input
              type="number"
              min={0}
              placeholder="Max"
              value={floorMax}
              onChange={(e) => { setFloorMax(e.target.value); setPage(1); }}
            />
          </div>
        </div>
      </div>
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <div className="aspect-[4/3] bg-muted animate-pulse" />
              <CardContent className="p-4">
                <div className="h-5 w-3/4 rounded bg-muted animate-pulse" />
                <div className="mt-2 h-4 w-1/2 rounded bg-muted animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : data && data.items.length > 0 ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.items.map((house) => (
              <Link key={house.id} href={`/houses/${house.id}`}>
                <Card className="group overflow-hidden transition-shadow hover:shadow-md">
                  <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                    <img
                      src={house.images[0] || "https://picsum.photos/800/600"}
                      alt={house.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute right-2 top-2">
                      <Badge variant="secondary">{house.rating} ★</Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold line-clamp-1">{house.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {house.address ? `${house.address}, ` : ""}{house.city}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-primary">£{house.price}/mo</span>
                      {house.roommateFriendly && (
                        <Badge variant="outline" className="text-xs">Roommate OK</Badge>
                      )}
                      {house.renovated && (
                        <Badge variant="secondary" className="text-xs">Renovated</Badge>
                      )}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <span>{house.type === "house" ? "House" : "Flat"}</span>
                      <span>·</span>
                      <span>{house.rooms} rooms</span>
                      {house.area != null && house.area > 0 && (
                        <>
                          <span>·</span>
                          <span>{house.area} m²</span>
                        </>
                      )}
                      {house.floor != null && house.floor > 0 && (
                        <>
                          <span>·</span>
                          <span>Floor {house.floor}</span>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          {data.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {page} of {data.totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                disabled={page >= data.totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      ) : (
        <p className="py-12 text-center text-muted-foreground">No houses match your filters.</p>
      )}
    </div>
  );
}
