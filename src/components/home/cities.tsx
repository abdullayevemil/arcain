"use client";

import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Baku from "../../assets/cities/baku.webp";
import Ganja from "../../assets/cities/ganja.jpg";
import Sumqait from "../../assets/cities/sumqait.jpg";

const countries = [
  { name: "Azerbaijan", flag: "🇦🇿" },
  { name: "Turkey", flag: "🇹🇷" },
  { name: "Hungary", flag: "🇭🇺" },
  { name: "Russia", flag: "🇷🇺" },
  { name: "United Kingdom", flag: "🇬🇧" },
  { name: "Germany", flag: "🇩🇪" },
];

const citiesByCountry: Record<string, { name: string; image: StaticImageData }[]> = {
  Azerbaijan: [
    { name: "Baku", image: Baku },
    { name: "Ganja", image: Ganja },
    { name: "Sumgait", image: Sumqait },
  ],

  Turkey: [],
  Hungary: [],
  Russia: [],
  "United Kingdom": [],
  Germany: [],
};

export default function PopularCities() {
  const [activeCountry, setActiveCountry] = useState("Azerbaijan");

  const cities = citiesByCountry[activeCountry] || [];

  return (
    <section className="w-full mx-auto p-16">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold tracking-tight text-neutral-900">
          Popular Cities Across The Globe
        </h2>
        <p className="mt-2 text-neutral-500 max-w-2xl">
          Book student accommodations near top cities and universities around
          the world.
        </p>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-4 mb-10 scrollbar-hide">
        {countries.map((country) => (
          <Button
            key={country.name}
            variant="outline"
            onClick={() => setActiveCountry(country.name)}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-medium whitespace-nowrap flex gap-2 items-center border",
              activeCountry === country.name
                ? "border-red-400 text-red-500 bg-red-50"
                : "border-neutral-200 text-neutral-700 hover:bg-neutral-100",
            )}
          >
            <span>{country.flag}</span>
            {country.name}
          </Button>
        ))}
      </div>

      <div className="relative">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {cities.length > 0 ? (
            cities.map((city) => (
              <Link
                href="/"
                key={city.name}
                className="relative h-44 rounded-xl overflow-hidden group cursor-pointer"
              >
                <Image
                  src={city.image}
                  alt={city.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <span className="absolute bottom-3 left-3 text-white font-medium text-sm">
                  {city.name}
                </span>
              </Link>
            ))
          ) : (
            <div>Coming soon</div>
          )}
        </div>

        <button className="absolute right-[-20px] top-1/2 -translate-y-1/2 bg-white border border-neutral-200 shadow-sm rounded-full w-10 h-10 flex items-center justify-center hover:bg-neutral-100">
          <ChevronRight className="w-5 h-5 text-neutral-700" />
        </button>
      </div>
    </section>
  );
}
