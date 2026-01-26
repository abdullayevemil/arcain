"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { Globe, PhoneCall, Info, LogIn, Menu } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import Logo from "../../assets/logo.png";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const baseBtn =
    "rounded-lg px-4 h-10 text-sm font-medium flex items-center gap-2";

  const homeStyle = "border border-white/30 text-white";

  const pageStyle =
    "bg-white border border-red-400 text-red-400 hover:bg-red-50";

  return (
    <header className="w-full absolute top-0 z-30">
      <div className="px-4 py-3 flex items-center justify-between">
        <Link href="/">
          <Image
            src={Logo}
            alt="Arcain Logo"
            width={100}
            height={34}
            className="select-none"
          />
        </Link>

        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="ghost"
            className={`${baseBtn} ${isHome ? homeStyle : pageStyle}`}
            asChild
          >
            <Link href="/about">
              <Info className="h-4 w-4" />
              About Us
            </Link>
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className={`${baseBtn} ${isHome ? homeStyle : pageStyle}`}
              >
                <PhoneCall className="h-4 w-4" />
                Contact
              </Button>
            </PopoverTrigger>

            <PopoverContent
              align="end"
              className="w-56 rounded-xl bg-white/80 dark:bg-black/60 backdrop-blur-xl border border-white/20 shadow-lg"
            >
              <div className="flex flex-col gap-1">
                <Button variant="ghost" asChild>
                  <Link href="mailto:support@arcain.com">WhatsApp Support</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="mailto:support@arcain.com">Email Support</Link>
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className={`${baseBtn} ${isHome ? homeStyle : pageStyle}`}
              >
                <Globe className="h-4 w-4" />
                EN
              </Button>
            </PopoverTrigger>

            <PopoverContent
              align="end"
              className="w-32 rounded-xl bg-white/80 dark:bg-black/60 backdrop-blur-xl border border-white/20 shadow-lg"
            >
              <div className="flex flex-col gap-1">
                <Button variant="ghost">EN</Button>
                <Button variant="ghost">AZ</Button>
                <Button variant="ghost">RU</Button>
              </div>
            </PopoverContent>
          </Popover>

          <Button
            variant="ghost"
            className={`${baseBtn} ${isHome ? homeStyle : pageStyle}`}
            asChild
          >
            <Link href="/auth">
              <LogIn className="h-4 w-4" />
              Login
            </Link>
          </Button>
        </div>

        <div className="md:hidden">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="h-10 w-10 p-0">
                <Menu className="h-5 w-5 text-white" />
              </Button>
            </PopoverTrigger>

            <PopoverContent
              align="end"
              className="w-64 rounded-xl bg-white/90 backdrop-blur-xl border border-white/20 shadow-lg"
            >
              <div className="flex flex-col gap-2">
                <Button variant="ghost" asChild>
                  <Link href="/about" className="justify-start gap-2">
                    <Info className="h-4 w-4" />
                    About Us
                  </Link>
                </Button>

                <Button variant="ghost" asChild>
                  <Link
                    href="mailto:support@arcain.com"
                    className="justify-start gap-2"
                  >
                    <PhoneCall className="h-4 w-4" />
                    Contact
                  </Link>
                </Button>

                <Button variant="ghost" className="justify-start gap-2">
                  <Globe className="h-4 w-4" />
                  Language
                </Button>

                <Button variant="ghost" asChild>
                  <Link href="/auth" className="justify-start gap-2">
                    <LogIn className="h-4 w-4" />
                    Login
                  </Link>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}
