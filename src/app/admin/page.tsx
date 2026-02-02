import Link from "next/link";
import { readHouses, readCities, readUsers } from "@/lib/data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BadgeCheck, Building2, Car, MapPin, Users } from "lucide-react";

export default async function AdminDashboardPage() {
  const [houses, cities, users] = await Promise.all([
    readHouses(),
    readCities(),
    readUsers(),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Admin Dashboard
      </h1>
      <p className="mt-1 mb-6 text-muted-foreground">
        Manage houses, cities, and users.
      </p>
      <Card>
        <CardContent>
          <CardHeader className="flex flex-row items-center justify-between pb-2"></CardHeader>
          <CardContent>
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <BadgeCheck className="h-5 w-5 text-primary" />
                Upgrade your subscription
              </h3>
              <p className="text-sm text-muted-foreground">
                Get verified, boost listings, and unlock advanced statistics
              </p>
            </div>

            <Link href="/subscription" className="bg-white text-primary">
              Buy subscription
            </Link>
          </CardContent>
        </CardContent>
      </Card>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Houses
            </span>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{houses.length}</p>
            <Button asChild variant="link" className="p-0 h-auto mt-2">
              <Link href="/admin/houses">Manage houses</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Cities
            </span>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{cities.length}</p>
            <Button asChild variant="link" className="p-0 h-auto mt-2">
              <Link href="/admin/cities">Manage cities</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Users
            </span>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{users.length}</p>
            <Button asChild variant="link" className="p-0 h-auto mt-2">
              <Link href="/admin/users">Manage users</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
