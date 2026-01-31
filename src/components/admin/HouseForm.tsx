"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { City } from "@/types";
import type { House } from "@/types";

const PLACEHOLDER_IMAGES = [
  "https://picsum.photos/800/600?random=a",
  "https://picsum.photos/800/600?random=b",
  "https://picsum.photos/800/600?random=c",
  "https://picsum.photos/800/600?random=d",
  "https://picsum.photos/800/600?random=e",
];

export function HouseForm({ cities, house }: { cities: City[]; house?: House }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState(house?.title ?? "");
  const [city, setCity] = useState(house?.city ?? "");
  const [price, setPrice] = useState(house?.price?.toString() ?? "");
  const [rooms, setRooms] = useState(house?.rooms?.toString() ?? "1");
  const [rating, setRating] = useState(house?.rating?.toString() ?? "0");
  const [description, setDescription] = useState(house?.description ?? "");
  const [roommateFriendly, setRoommateFriendly] = useState(house?.roommateFriendly ?? false);
  const [imagesText, setImagesText] = useState(house?.images?.join("\n") ?? "");
  const [type, setType] = useState<"flat" | "house">(house?.type ?? "flat");
  const [builtType, setBuiltType] = useState<"new" | "old">(house?.builtType ?? "new");
  const [address, setAddress] = useState(house?.address ?? "");
  const [renovated, setRenovated] = useState(house?.renovated ?? false);
  const [area, setArea] = useState(house?.area?.toString() ?? "");
  const [floor, setFloor] = useState(house?.floor?.toString() ?? "");

  const images = imagesText
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  function addPlaceholder(url: string) {
    setImagesText((prev) => (prev ? `${prev}\n${url}` : url));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const payload = {
        title,
        city,
        price: Number(price),
        rooms: Number(rooms),
        rating: Number(rating),
        description,
        roommateFriendly,
        images,
        type,
        builtType,
        address,
        renovated,
        area: area ? Number(area) : 0,
        floor: floor ? Number(floor) : 0,
      };
      const url = house ? `/api/houses/${house.id}` : "/api/houses";
      const method = house ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to save");
        setLoading(false);
        return;
      }
      router.push("/admin/houses");
      router.refresh();
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Image URLs (simulated upload)</CardTitle>
        <p className="text-sm text-muted-foreground">
          Paste image URLs below or add from the placeholder list. Stored as JSON.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-muted-foreground">Quick add placeholder images</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {PLACEHOLDER_IMAGES.map((url) => (
              <Button
                key={url}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addPlaceholder(url)}
              >
                Add image
              </Button>
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1" />
          </div>
          <div>
            <Label>City</Label>
            <Select value={city} onValueChange={setCity} required>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((c) => (
                  <SelectItem key={c.id} value={c.slug}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="address">Region (address)</Label>
            <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="e.g. Narimanov" className="mt-1" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Type</Label>
              <Select value={type} onValueChange={(v: "flat" | "house") => setType(v)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flat">Flat</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Built</Label>
              <Select value={builtType} onValueChange={(v: "new" | "old") => setBuiltType(v)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New built</SelectItem>
                  <SelectItem value="old">Old built</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="price">Price (£/mo)</Label>
              <Input id="price" type="number" min={0} value={price} onChange={(e) => setPrice(e.target.value)} required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="rooms">Rooms</Label>
              <Input id="rooms" type="number" min={1} value={rooms} onChange={(e) => setRooms(e.target.value)} className="mt-1" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="area">Area (m²)</Label>
              <Input id="area" type="number" min={0} value={area} onChange={(e) => setArea(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="floor">Floor</Label>
              <Input id="floor" type="number" min={0} value={floor} onChange={(e) => setFloor(e.target.value)} className="mt-1" />
            </div>
          </div>
          <div>
            <Label htmlFor="rating">Rating (0–5)</Label>
            <Input id="rating" type="number" min={0} max={5} step={0.1} value={rating} onChange={(e) => setRating(e.target.value)} className="mt-1" />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="roommateFriendly"
              checked={roommateFriendly}
              onChange={(e) => setRoommateFriendly(e.target.checked)}
              className="rounded border-input"
            />
            <Label htmlFor="roommateFriendly">Roommate friendly</Label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="renovated"
              checked={renovated}
              onChange={(e) => setRenovated(e.target.checked)}
              className="rounded border-input"
            />
            <Label htmlFor="renovated">Renovated (remont)</Label>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="mt-1" />
          </div>
          <div>
            <Label htmlFor="images">Image URLs (one per line or comma-separated)</Label>
            <Textarea
              id="images"
              value={imagesText}
              onChange={(e) => setImagesText(e.target.value)}
              placeholder="https://example.com/image1.jpg"
              rows={4}
              className="mt-1 font-mono text-sm"
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving…" : house ? "Update" : "Create"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
