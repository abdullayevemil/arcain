"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Mail,
  Phone,
  MessageCircle,
  Instagram,
  Youtube,
  Linkedin,
  Facebook,
  Twitter,
  Star,
} from "lucide-react";

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Refer a Friend", href: "/refer" },
];

const discoverLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Podcast", href: "/podcast" },
  { label: "Newsroom", href: "/newsroom" },
  { label: "Arcain Plus", href: "/plus" },
  { label: "Media Mention", href: "/media" },
  { label: "Ambassador", href: "/ambassador" },
];

const supportLinks = [
  { label: "Help Center", href: "/help" },
  { label: "Contact", href: "/contact" },
  { label: "T&C", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Sitemap", href: "/sitemap" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t bg-white">
      <div className="mx-auto p-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="md:col-span-2 flex flex-col gap-6">
            <h2 className="text-2xl font-bold">Arcain</h2>

            <p className="text-sm text-muted-foreground">
              Arcain © 2026. All rights reserved.
            </p>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Star className="h-6 w-6 fill-green-500 text-green-500" />
                <span className="text-lg font-semibold">Trustpilot</span>
              </div>

              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-8 w-8 bg-green-500 flex items-center justify-center"
                  >
                    <Star className="h-5 w-5 fill-white text-white" />
                  </div>
                ))}
              </div>

              <p className="text-sm">
                <span className="font-medium">TrustScore 4.8</span> |{" "}
                <span className="underline">9,014 reviews</span>
              </p>
            </div>
          </div>

          <div className="hidden md:flex flex-col gap-3">
            <h3 className="font-semibold">Company</h3>

            {companyLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-muted-foreground"
              >
                {link.label}
              </Link>
            ))}

            <div className="flex items-center gap-2">
              <Link href="/group-bookings" className="text-muted-foreground">
                Group Bookings
              </Link>
              <Badge variant="secondary">New</Badge>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/list-with-us" className="text-muted-foreground">
                List with us
              </Link>
              <Badge variant="secondary">New</Badge>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/partner" className="text-muted-foreground">
                Partner with us
              </Link>
              <Badge variant="secondary">New</Badge>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/universities" className="text-muted-foreground">
                Universities
              </Link>
              <Badge variant="secondary">New</Badge>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/careers" className="text-muted-foreground">
                Careers
              </Link>
              <Badge className="bg-red-100 text-red-600">We are hiring!</Badge>
            </div>
          </div>

          <div className="hidden md:flex flex-col gap-3">
            <h3 className="font-semibold">Discover</h3>

            {discoverLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-muted-foreground"
              >
                {link.label}
              </Link>
            ))}

            <div className="flex items-center gap-2">
              <Link href="/scholarships" className="text-muted-foreground">
                Scholarships
              </Link>
              <Badge className="bg-red-100 text-red-600">Apply Now</Badge>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/exams" className="text-muted-foreground">
                Exams
              </Link>
              <Badge variant="secondary">New</Badge>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-semibold">Contact us</h3>

            <Button variant="outline" className="justify-start gap-2">
              <Link href="mailto:contact@arcain.com" className="justify-start flex gap-2 items-center">
                <Mail className="h-4 w-4" />
                contact@arcain.com
              </Link>
            </Button>

            <Button variant="outline" className="justify-start gap-2">
              <Link href="callto:+994507774402" className="justify-start flex gap-2 items-center">
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </Link>
            </Button>

            <Button variant="outline" className="justify-start gap-2">
              <Link href="callto:+994507774402" className="justify-start flex gap-2 items-center">
                <Phone className="h-4 w-4" />
                +994 50 777 44 02
              </Link>
            </Button>

            <div className="flex flex-col gap-2 pt-4">
              <span className="font-medium">Follow us on:</span>

              <div className="flex gap-3">
                <Instagram className="h-5 w-5" />
                <Youtube className="h-5 w-5" />
                <Twitter className="h-5 w-5" />
                <Linkedin className="h-5 w-5" />
                <Facebook className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>

        <div className="md:hidden mt-10">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="company">
              <AccordionTrigger>Company</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2">
                {companyLinks.map((link) => (
                  <Link key={link.label} href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="discover">
              <AccordionTrigger>Discover</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2">
                {discoverLinks.map((link) => (
                  <Link key={link.label} href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="support">
              <AccordionTrigger>Support</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2">
                {supportLinks.map((link) => (
                  <Link key={link.label} href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </footer>
  );
}
