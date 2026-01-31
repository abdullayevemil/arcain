import Link from "next/link";
import { HouseForm } from "@/components/admin/HouseForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { readCities } from "@/lib/data";

export default async function AdminNewHousePage() {
  const cities = await readCities();
  return (
    <div>
      <Link href="/admin/houses">
        <Button variant="ghost" size="sm" className="mb-4 gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to houses
        </Button>
      </Link>
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Add house</h1>
      <p className="mt-1 text-muted-foreground">Create a new listing. Add image URLs below (one per line or comma-separated).</p>
      <HouseForm cities={cities} />
    </div>
  );
}
