import Link from "next/link";
import { notFound } from "next/navigation";
import { readHouses } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MapPin, BedDouble, Star, ArrowLeft, Mail, Home, Building2, Ruler, Layers } from "lucide-react";

export default async function HouseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const houses = await readHouses();
  const house = houses.find((h) => h.id === id);
  if (!house) notFound();

  return (
    <div className="page-content">
      <div className="w-full ">
        <Link href="/houses" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to houses
        </Link>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <div className="aspect-video w-full overflow-hidden rounded-2xl bg-muted">
              <img
                src={house.images[0] || "https://picsum.photos/1200/600"}
                alt={house.title}
                className="h-full w-full object-cover"
              />
            </div>
            {house.images.length > 1 && (
              <div className="grid grid-cols-3 gap-3">
                {house.images.slice(1, 4).map((img, i) => (
                  <div key={i} className="aspect-video overflow-hidden rounded-xl bg-muted">
                    <img src={img} alt={`${house.title} ${i + 2}`} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            )}
            <div className="rounded-2xl border bg-card p-6">
              <h2 className="font-semibold text-lg mb-2">About this listing</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{house.description}</p>
            </div>
          </div>
          <div>
            <Card className="sticky top-24 border-0 shadow-xl rounded-2xl overflow-hidden">
              <CardHeader>
                <h1 className="text-2xl font-bold tracking-tight">{house.title}</h1>
                <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
                  {house.address && (
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      <span>{house.address}, </span>
                      <span className="capitalize">{house.city}</span>
                    </span>
                  )}
                  {!house.address && (
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      <span className="capitalize">{house.city}</span>
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    {house.rating}
                  </span>
                  {house.roommateFriendly && <Badge variant="secondary" className="rounded-lg">Roommate friendly</Badge>}
                  {house.renovated && <Badge variant="secondary" className="rounded-lg">Renovated</Badge>}
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex flex-wrap items-center gap-4 text-lg">
                  <span className="font-semibold text-primary text-2xl">£{house.price}</span>
                  <span className="text-muted-foreground">/ month</span>
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <BedDouble className="h-4 w-4" />
                    {house.rooms} {house.rooms === 1 ? "room" : "rooms"}
                  </span>
                  {house.area != null && house.area > 0 && (
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <Ruler className="h-4 w-4" />
                      {house.area} m²
                    </span>
                  )}
                  {house.floor != null && house.floor > 0 && (
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <Layers className="h-4 w-4" />
                      Floor {house.floor}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Home className="h-4 w-4" />
                    {house.type === "house" ? "House" : "Flat"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    {house.builtType === "new" ? "New built" : "Old built"}
                  </span>
                </div>
                <Button asChild className="w-full rounded-xl gap-2" size="lg">
                  <Link href="/contact">
                    <Mail className="h-4 w-4" />
                    Contact landlord
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
