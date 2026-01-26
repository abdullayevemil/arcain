"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";

const countries = [
  { name: "United Kingdom", flag: "🇬🇧" },
  { name: "Australia", flag: "🇦🇺" },
  { name: "Ireland", flag: "🇮🇪" },
];

const citiesByCountry: Record<string, string[]> = {
  "United Kingdom": [
    "London",
    "Birmingham",
    "Leicester",
    "Nottingham",
    "Liverpool",
    "Coventry",
    "Sheffield",
    "Leeds",
    "Newcastle Upon Tyne",
    "Manchester",
  ],
  Australia: ["Sydney", "Melbourne"],
  Ireland: ["Dublin"],
};

type Home = {
  id: string;
  name: string;
  city: string;
  country: string;
  pricePerWeek: number;
  rating: number;
  reviews: number;
  image: string;
  discount?: string;
};

export default function Homes() {
  const [activeCountry, setActiveCountry] = useState("United Kingdom");
  const [activeCity, setActiveCity] = useState("London");
  const [homes, setHomes] = useState<Home[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setActiveCity(citiesByCountry[activeCountry][0]);
  }, [activeCountry]);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/homes?city=${encodeURIComponent(activeCity)}`)
      .then((res) => res.json())
      .then((data) => setHomes(data))
      .finally(() => setLoading(false));
  }, [activeCity]);

  const country = countries.find((c) => c.name === activeCountry);

  return (
    <section className="w-full mx-auto p-16">
      <h2 className="text-2xl font-semibold text-neutral-900">
        Thousands Of Properties Globally
      </h2>

      <p className="mt-2 text-neutral-500">
        From studios to private rooms to shared apartments, we’ve got it all.
      </p>

      <div className="mt-8 flex items-center gap-4 overflow-x-auto scrollbar-hide">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="rounded-full px-6 py-2 border-red-500 text-red-500 gap-2"
            >
              <span>{country?.flag}</span>
              {activeCountry}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-56 p-1">
            {countries.map((c) => (
              <button
                key={c.name}
                onClick={() => {
                  setActiveCountry(c.name);
                  setOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-neutral-100",
                  c.name === activeCountry && "bg-neutral-100 font-medium",
                )}
              >
                <span>{c.flag}</span>
                {c.name}
              </button>
            ))}
          </PopoverContent>
        </Popover>

        <div className="h-6 w-px bg-neutral-200 shrink-0" />

        {citiesByCountry[activeCountry].map((city) => (
          <Button
            key={city}
            variant="outline"
            onClick={() => setActiveCity(city)}
            className={cn(
              "rounded-full px-5 py-2 text-sm whitespace-nowrap",
              activeCity === city
                ? "border-red-500 text-red-500"
                : "border-neutral-200 text-neutral-600",
            )}
          >
            {city}
          </Button>
        ))}
      </div>

      <div className="relative mt-10">
        <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-2">
          {loading &&
            Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="w-[260px] h-[360px] rounded-xl bg-neutral-100 animate-pulse"
              />
            ))}

          {!loading &&
            homes.map((home) => (
              <div
                key={home.id}
                className="w-[260px] min-w-[260px] rounded-xl border border-neutral-200 overflow-hidden"
              >
                <div className="relative h-40">
                  <Image
                    src={home.image}
                    alt={home.name}
                    fill
                    className="object-cover"
                  />

                  {home.discount && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                      {home.discount}
                    </span>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-medium text-sm text-neutral-900 line-clamp-1">
                    {home.name}
                  </h3>

                  <p className="text-xs text-neutral-500 mt-1">
                    {home.city}, {home.country}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-sm">
                      From{" "}
                      <span className="font-semibold">
                        £{home.pricePerWeek}
                      </span>
                      /week
                    </p>

                    <span className="text-sm text-green-600">
                      ★ {home.rating} ({home.reviews})
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <button className="absolute right-[-18px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border bg-white flex items-center justify-center shadow-sm hover:bg-neutral-100">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
