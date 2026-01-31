import Link from "next/link";
import { readCities } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, ArrowRight } from "lucide-react";

export default async function CitiesPage() {
  const cities = await readCities();

  return (
    <div className="page-content">
      <div className="w-full  text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Cities</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Select a city to browse available rental housing in Baku, Azerbaijan.
        </p>
      </div>
      <div className="w-full  mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cities.map((city) => (
          <Link key={city.id} href={`/houses?city=${city.slug}`}>
            <Card className="group h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 rounded-2xl border-border/60 overflow-hidden">
              <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                {city.image ? (
                  <img
                    src={city.image}
                    alt={city.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-muted">
                    <MapPin className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h2 className="font-semibold text-lg">{city.name}{city.country ? `, ${city.country}` : ""}</h2>
                  <p className="text-sm text-white/90 flex items-center gap-1 mt-1">
                    View listings
                    <ArrowRight className="h-4 w-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
