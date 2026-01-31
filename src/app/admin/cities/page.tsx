import { readCities } from "@/lib/data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdminCitiesManager } from "@/components/admin/AdminCitiesManager";
import { AdminCityRowActions } from "@/components/admin/AdminCityRowActions";

export default async function AdminCitiesPage() {
  const cities = await readCities();

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Cities</h1>
      <p className="mt-1 text-muted-foreground">Manage cities available for house listings.</p>
      <Card className="mt-6">
        <CardHeader>
          <AdminCitiesManager />
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cities.map((city) => (
                <TableRow key={city.id}>
                  <TableCell className="font-medium">{city.name}</TableCell>
                  <TableCell className="text-muted-foreground">{city.slug}</TableCell>
                  <TableCell className="text-right">
                    <AdminCityRowActions city={city} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
