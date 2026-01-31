import { HousesList } from "@/components/houses/HousesList";
import { readCities } from "@/lib/data";

export default async function HousesPage() {
  const cities = await readCities();
  return (
    <div className="page-content">
      <div className="w-full  text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Houses</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Browse rental listings. Filter by city, search by keyword, and sort by price or rating to find your fit.
        </p>
      </div>
      <div className="w-full ">
        <HousesList cities={cities} />
      </div>
    </div>
  );
}
