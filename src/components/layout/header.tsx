"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { Globe, PhoneCall, Info, LogIn, LogOut } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import Logo from "../../assets/logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isHome = pathname === "/";

  return (
    <header className="w-full absolute top-0 z-30">
      <div className="px-6 py-3 flex items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Image
              src={Logo}
              alt="Arcain Logo"
              width={110}
              height={36}
              className="select-none"
            />
          </Link>
        </div>

        <div className="flex items-center gap-2 h-full flex-1 justify-end">
          <Button
            variant="ghost"
            className={
              isHome
                ? "rounded-lg px-4 h-full text-sm font-medium border border-white/30 text-white flex items-center gap-2"
                : "rounded-lg px-4 h-full text-sm font-medium border border-white/30 text-white flex items-center gap-2 bg-white border border-red-400 text-red-400 hover:bg-red-50"
            }
          >
            <Link href="/about" className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              About Us
            </Link>
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className={
                  isHome
                    ? "rounded-lg px-4 h-full text-sm font-medium border border-white/30 text-white flex items-center gap-2"
                    : "rounded-lg px-4 h-full text-sm font-medium border border-white/30 text-white flex items-center gap-2 bg-white border border-red-400 text-red-400 hover:bg-red-50"
                }
              >
                <PhoneCall className="h-4 w-4" />
                Contact
              </Button>
            </PopoverTrigger>

            <PopoverContent
              align="end"
              className="w-56 rounded-xl bg-white/80 dark:bg-black/60 backdrop-blur-xl border border-white/20 shadow-lg"
            >
              <div className="flex flex-col gap-1 text-sm">
                <Button variant="ghost" className="justify-start">
                  <Link
                    href="mailto:support@arcain.com"
                    className="block w-full h-full text-left"
                  >
                    WhatsApp Support
                  </Link>
                </Button>
                <Button variant="ghost" className="justify-start">
                  <Link
                    href="mailto:support@arcain.com"
                    className="block w-full h-full text-left"
                  >
                    Email Support
                  </Link>
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className={
                  isHome
                    ? "rounded-lg px-4 h-full text-sm font-medium border border-white/30 text-white flex items-center gap-2"
                    : "rounded-lg px-4 h-full text-sm font-medium border border-white/30 text-white flex items-center gap-2 bg-white border border-red-400 text-red-400 hover:bg-red-50"
                }
              >
                <Globe className="h-4 w-4" />
                EN
              </Button>
            </PopoverTrigger>

            <PopoverContent
              align="end"
              className="w-32 rounded-xl bg-white/80 dark:bg-black/60 backdrop-blur-xl border border-white/20 shadow-lg"
            >
              <div className="flex flex-col gap-1 text-sm">
                <Button variant="ghost" className="justify-start">
                  EN
                </Button>
                <Button variant="ghost" className="justify-start">
                  AZ
                </Button>
                <Button variant="ghost" className="justify-start">
                  RU
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <Button
            variant="ghost"
            className={
              isHome
                ? "rounded-lg px-4 h-full text-sm mix-blend-exclusion font-medium border border-white/30 text-white flex items-center gap-2"
                : "rounded-lg px-4 h-full text-sm font-medium border border-white/30 text-white flex items-center gap-2 bg-white border border-red-400 text-red-400 hover:bg-red-50"
            }
          >
            <Link href="/auth" className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              Login
            </Link>
          </Button>

          {/* <Button
            variant="ghost"
            className={isHome ? "rounded-lg px-4 h-full text-sm font-medium border border-white/30 text-white flex items-center gap-2" : "rounded-lg px-4 h-full text-sm font-medium border border-white/30 text-white flex items-center gap-2 bg-white border border-red-400 text-red-400 hover:bg-red-50"}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button> */}
        </div>
      </div>
    </header>
  );
}
