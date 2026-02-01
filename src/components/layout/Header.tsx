"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Home, Building2, MapPin, Mail, LogIn, UserPlus, LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImage from "@/assets/LOGO 2.png";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserSession {
  id: string;
  name: string;
  email: string;
  role: string;
}

const nav = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: Building2 },
  { href: "/cities", label: "Cities", icon: MapPin },
  { href: "/houses", label: "Houses", icon: Home },
  { href: "/contact", label: "Contact", icon: Mail },
];

export function Header() {
  const pathname = usePathname();
  const [user, setUser] = useState<UserSession | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const raw = document.cookie.match(/user=([^;]+)/);
    if (raw) {
      try {
        setUser(JSON.parse(decodeURIComponent(raw[1])));
      } catch {
        setUser(null);
      }
    }
  }, [pathname]);

  const logout = () => {
    document.cookie = "user=; path=/; max-age=0";
    setUser(null);
    setDropdownOpen(false);
    setMobileOpen(false);
    if (pathname.startsWith("/admin")) window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-xl border-b border-border/40">
      <div className="page-content flex h-12 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5 font-semibold text-foreground shrink-0">
          <Image src={logoImage} alt="Student Housing" className="h-full w-auto" height={36} />
        </Link>
        <nav className="hidden md:flex items-center gap-0.5">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 shrink-0">
          {user ? (
            <>
              {user.role === "landlord" && (
                <Link href="/admin" className="hidden sm:inline-flex">
                  <Button variant="outline" size="sm" className="rounded-lg border-border/60">
                    <LayoutDashboard className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Admin</span>
                  </Button>
                </Link>
              )}
              <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="rounded-lg font-medium">
                    {user.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52 rounded-xl border-border/60 shadow-lg">
                  <DropdownMenuItem asChild>
                    <Link href={user.role === "landlord" ? "/admin" : "/houses"}>Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm" className="rounded-lg text-muted-foreground hover:text-foreground">
                  <LogIn className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Login</span>
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="rounded-lg shadow-sm">
                  <UserPlus className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Register</span>
                </Button>
              </Link>
            </>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-lg"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden border-t border-border/40 bg-muted/30 px-4 py-4 space-y-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                pathname === item.href ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
              )}
            >
              {item.label}
            </Link>
          ))}
          {user?.role === "landlord" && (
            <Link href="/admin" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted">
              Admin
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
