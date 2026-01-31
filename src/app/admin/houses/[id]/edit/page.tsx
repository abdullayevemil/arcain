import Link from "next/link";
import { notFound } from "next/navigation";
import { readHouses, readCities } from "@/lib/data";
import { HouseForm } from "@/components/admin/HouseForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default async function AdminEditHousePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [houses, cities] = await Promise.all([readHouses(), readCities()]);
  const house = houses.find((h) => h.id === id);
  if (!house) notFound();

  return (
    <div>
      <Link href="/admin/houses">
        <Button variant="ghost" size="sm" className="mb-4 gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to houses
        </Button>
      </Link>
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Edit house</h1>
      <p className="mt-1 text-muted-foreground">Update listing and image URLs. Add or remove URLs (one per line).</p>
      <HouseForm cities={cities} house={house} />
    </div>
  );
}
