import { readUsers } from "@/lib/data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdminUsersManager } from "@/components/admin/AdminUsersManager";
import { AdminUserRowActions } from "@/components/admin/AdminUserRowActions";

export default async function AdminUsersPage() {
  const users = await readUsers();
  const safe = users.map(({ password: _, ...u }) => u);

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Users</h1>
      <p className="mt-1 text-muted-foreground">Manage user accounts (students and landlords).</p>
      <Card className="mt-6">
        <CardHeader>
          <AdminUsersManager />
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {safe.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell className="text-muted-foreground">{user.email}</TableCell>
                  <TableCell className="capitalize">{user.role}</TableCell>
                  <TableCell className="text-right">
                    <AdminUserRowActions user={user} />
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
