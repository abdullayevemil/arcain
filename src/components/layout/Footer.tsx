import Link from "next/link";
import Image from "next/image";
import { Mail, ArrowRight } from "lucide-react";
import logoImage from "@/assets/LOGO 2.png";

const explore = [
  { href: "/houses", label: "Houses" },
  { href: "/cities", label: "Cities" },
  { href: "/about", label: "About" },
];
const support = [
  { href: "/contact", label: "Contact" },
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-muted/20">
      <div className="page-content">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 font-semibold text-foreground">
              <Image src={logoImage} alt="Student Housing" className="h-8 w-auto" height={32} />
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground leading-relaxed">
              Find rental housing and roommates near your university. Verified listings and trusted landlords.
            </p>
          </div>
          <div className="flex gap-12 sm:gap-16">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Explore</h3>
              <ul className="space-y-3">
                {explore.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="group text-sm text-foreground/90 hover:text-primary inline-flex items-center gap-1.5 transition-colors">
                      {item.label}
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Support</h3>
              <ul className="space-y-3">
                {support.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-foreground/90 hover:text-primary transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border/40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Student Housing. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="mailto:support@studenthousing.example" className="hover:text-foreground inline-flex items-center gap-1.5 transition-colors">
              <Mail className="h-4 w-4" />
              support@studenthousing.example
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
