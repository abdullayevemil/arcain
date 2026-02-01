import Link from "next/link";
import { Search, MapPin, Users, Home, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { readHouses } from "@/lib/data";

const HERO_IMAGE = "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1920&q=80";

export default async function HomePage() {
  const houses = await readHouses();
  const featured = houses.slice(0, 6);

  return (
    <div className="flex flex-col">
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={HERO_IMAGE} alt="" className="h-full w-full object-cover scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/40" />
          <div className="absolute inset-0 bg-primary/5" />
        </div>
        <div className="relative z-10 w-full page-content flex flex-col items-center justify-center text-center py-20">
          <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl ">
            Find Your Perfect Student Housing
          </h1>
          <p className="mt-6 text-lg text-white/90 drop-shadow-md sm:text-xl max-w-2xl mx-auto">
            Browse rental houses, filter by city, and connect with roommates. Made for students.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="gap-2 shadow-xl shadow-primary/25 hover:shadow-2xl hover:scale-[1.02] transition-all rounded-xl">
              <Link href="/houses">
                <Search className="h-5 w-5" />
                Browse Houses
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="gap-2 bg-white/95 text-foreground hover:bg-white shadow-xl hover:scale-[1.02] transition-all border-0 rounded-xl">
              <Link href="/cities">
                <MapPin className="h-5 w-5" />
                View Cities
              </Link>
            </Button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
      </section>
      <section className="relative -mt-12 z-20 page-content">
        <div className="w-full ">
          <div className="grid gap-6 sm:grid-cols-3">
            <Card className="group relative overflow-hidden border-0 bg-card/95 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardContent className="relative p-6 flex items-start gap-4">
                <div className="rounded-2xl bg-primary/15 p-4 shadow-inner group-hover:scale-110 transition-transform">
                  <Home className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Rental Listings</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Browse verified houses from trusted landlords.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="group relative overflow-hidden border-0 bg-card/95 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardContent className="relative p-6 flex items-start gap-4">
                <div className="rounded-2xl bg-primary/15 p-4 shadow-inner group-hover:scale-110 transition-transform">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">By City</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Filter by your university city and area.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="group relative overflow-hidden border-0 bg-card/95 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardContent className="relative p-6 flex items-start gap-4">
                <div className="rounded-2xl bg-primary/15 p-4 shadow-inner group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Roommate Friendly</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Find listings that welcome roommates.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="border-t bg-muted/30 page-content">
        <div className="w-full ">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">Featured Listings</h2>
              <p className="mt-1 text-muted-foreground">Hand-picked rentals for students</p>
            </div>
            <Button asChild variant="outline" size="sm" className="rounded-lg w-fit gap-2">
              <Link href="/houses">
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((house) => (
              <Link key={house.id} href={`/houses/${house.id}`}>
                <article className="group relative rounded-2xl border bg-card overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:rotate-[0.5deg]">
                  <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                    <img
                      src={house.images[0] || "https://picsum.photos/800/600"}
                      alt={house.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute right-2 top-2 rounded-md bg-black/50 px-2 py-0.5 text-sm font-medium text-white">
                      {house.rating} ★
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <CardContent className="relative p-5">
                    <h3 className="font-semibold line-clamp-1 text-lg">{house.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {house.address ? `${house.address}, ` : ""}{house.city === "baku" ? "Baku" : house.city}
                    </p>
                    <p className="mt-3 text-xl font-semibold text-primary">₼{house.price}/mo</p>
                  </CardContent>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
