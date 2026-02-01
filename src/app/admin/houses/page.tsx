import Link from "next/link";
import { readHouses } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { AdminHouseActions } from "@/components/admin/AdminHouseActions";

export default async function AdminHousesPage() {
  const houses = await readHouses();

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Houses</h1>
        <Button asChild>
          <Link href="/admin/houses/new">
            <Plus className="h-4 w-4 mr-2" />
            Add house
          </Link>
        </Button>
      </div>
      <Card className="mt-6 overflow-hidden">
        <CardHeader className="py-4">
          <p className="text-sm text-muted-foreground">Manage rental listings. Add or edit image URLs in the edit form.</p>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Rooms</TableHead>
                <TableHead>Area</TableHead>
                <TableHead>Floor</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {houses.map((house) => (
                <TableRow key={house.id}>
                  <TableCell>
                    <div className="h-10 w-10 rounded overflow-hidden bg-muted">
                      {house.images[0] ? (
                        <img src={house.images[0]} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-muted-foreground text-xs">—</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{house.title}</TableCell>
                  <TableCell className="capitalize">{house.city}</TableCell>
                  <TableCell>{house.address || "—"}</TableCell>
                  <TableCell>{house.type === "house" ? "House" : "Flat"}</TableCell>
                  <TableCell>₼{house.price}</TableCell>
                  <TableCell>{house.rooms}</TableCell>
                  <TableCell>{house.area ? `${house.area} m²` : "—"}</TableCell>
                  <TableCell>{house.floor ?? "—"}</TableCell>
                  <TableCell>{house.rating} ★</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button asChild variant="ghost" size="icon">
                        <Link href={`/admin/houses/${house.id}/edit`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <AdminHouseActions houseId={house.id} houseTitle={house.title} />
                    </div>
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
