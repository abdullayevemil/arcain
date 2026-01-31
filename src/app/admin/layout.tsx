import Link from "next/link";
import { Home, Building2, MapPin, Users } from "lucide-react";

const adminNav = [
  { href: "/admin", label: "Dashboard", icon: Home },
  { href: "/admin/houses", label: "Houses", icon: Building2 },
  { href: "/admin/cities", label: "Cities", icon: MapPin },
  { href: "/admin/users", label: "Users", icon: Users },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-3.5rem)]">
      <aside className="w-full md:w-56 border-b md:border-b-0 md:border-r bg-muted/30 p-4">
        <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-visible">
          {adminNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="flex-1 p-4 sm:p-6">{children}</div>
    </div>
  );
}
