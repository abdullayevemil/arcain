import Link from "next/link";
import { Building2, Target, Heart, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const whatWeDo = [
  {
    icon: Building2,
    title: "Rental listings",
    description: "We connect students with rental housing in university cities. Browse verified listings, filter by city and price, and find a place that fits.",
  },
  {
    icon: Target,
    title: "Our mission",
    description: "We make finding student accommodation simple and transparent. We verify listings and support both students and landlords with a trusted platform.",
  },
  {
    icon: Heart,
    title: "For everyone",
    description: "Students can save favourites and contact landlords. Landlords can list properties, manage images, and reach students looking for housing.",
  },
];

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description: "To make finding student accommodation simple, transparent, and stress-free. We verify listings and support both students and landlords with a trusted platform.",
  },
  {
    icon: Building2,
    title: "For Students",
    description: "Browse houses by city, filter by price and roommate-friendly options, read detailed descriptions and view verified images. Create an account to save favourites and contact landlords directly.",
  },
  {
    icon: Heart,
    title: "For Landlords",
    description: "List your properties, manage images, and reach students looking for housing. Use the admin panel to update listings, verify your portfolio, and grow your tenant base.",
  },
];

const perks = [
  "Verified listings and landlord profiles",
  "Filter by city, price, and roommate preference",
  "Secure messaging and contact forms",
  "Mobile-first design for on-the-go browsing",
];

export default function AboutPage() {
  return (
    <div className="page-content">
      <div className="w-full  text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">About Us</h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Student Housing connects students with rental housing and roommates across the UK. We help landlords reach students and students find a place to call home.
        </p>
        <div className="mt-12 grid sm:grid-cols-3 gap-6">
          {whatWeDo.map((item) => (
            <Card key={item.title} className="border-0 shadow-md rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h2 className="font-semibold text-lg">{item.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="w-full  mt-16 space-y-8">
        {values.map((item) => (
          <Card key={item.title} className="overflow-hidden border-0 shadow-lg rounded-2xl">
            <CardContent className="p-8 flex flex-col sm:flex-row gap-6 items-start">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                <item.icon className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="w-full  mt-16">
        <h2 className="text-2xl font-bold text-center mb-8">Why choose us</h2>
        <ul className="grid sm:grid-cols-2 gap-4">
          {perks.map((perk) => (
            <li key={perk} className="flex items-center gap-3 rounded-xl bg-muted/40 px-4 py-3">
              <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
              <span className="text-sm font-medium">{perk}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full  mt-16 text-center">
        <Button asChild size="lg" className="rounded-xl gap-2">
          <Link href="/houses">
            Browse houses
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
