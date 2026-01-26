"use client";

import Image from "next/image";
import { Separator } from "@/src/components/ui/separator";
import Hero from "../assets/hero.png";
import { Banknote, CircleCheckBig, Headset } from "lucide-react";
import PopularCities from "../components/home/cities";
import Homes from "../components/home/homes";
import Features from "../components/home/features";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white font-sans text-gray-700 relative">
      <section
        className="
    relative
    w-full
    h-[420px]
    sm:h-[450px]
    md:h-[480px]
    lg:h-[520px]
    overflow-hidden
  "
      >
        <Image
          src={Hero}
          alt="Student Accommodation"
          fill
          priority
          sizes="100vw"
          className="
      absolute inset-0 z-0
      object-cover
      object-right
    "
        />

        <div className="absolute inset-0 z-10 bg-black/50" />

        <div className="pt-16 md:p-0 absolute inset-0 flex flex-col items-center justify-center text-center text-white z-20 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover the Best Student Accommodation
          </h1>

          <p className="text-lg md:text-xl mb-6">
            Book student accommodations near top universities and cities across
            the globe
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center w-full max-w-3xl">
            <div className="justify-center w-full flex items-center flex-row gap-2 py-2 px-3 bg-black/30 rounded-lg text-white">
              <CircleCheckBig className="h-4 w-4" />

              <p>Verified Listings</p>
            </div>

            <div className="justify-center w-full flex items-center flex-row gap-2 py-2 px-3 bg-black/30 rounded-lg text-white">
              <Headset className="h-4 w-4" />

              <p>24x7 Assistance</p>
            </div>

            <div className="justify-center w-full flex items-center flex-row gap-2 py-2 px-3 bg-black/30 rounded-lg text-white">
              <Banknote className="h-4 w-4" />

              <p>Lowest Price Guarantee</p>
            </div>
          </div>
        </div>
      </section>

      <PopularCities />

      <Separator className="my-6" />

      <Homes />

      <Separator className="my-6" />

      <Features />
    </main>
  );
}
