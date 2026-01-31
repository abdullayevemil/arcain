"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "";
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<"student" | "landlord">("student");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Registration failed");
        setLoading(false);
        return;
      }
      const user = data.user;
      const cookie = encodeURIComponent(JSON.stringify({ id: user.id, name: user.name, email: user.email, role: user.role }));
      document.cookie = `user=${cookie}; path=/; max-age=86400`;
      const target = redirect || (user.role === "landlord" ? "/admin" : "/");
      router.push(target);
      router.refresh();
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-content flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Create an account</h1>
          <p className="mt-2 text-muted-foreground">Join as a student or landlord to get started.</p>
        </div>
        <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg">Register</CardTitle>
            <CardDescription>Choose your role and fill in your details.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && <p className="text-sm text-destructive rounded-lg bg-destructive/10 p-3">{error}</p>}
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" required className="mt-2 rounded-lg" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required className="mt-2 rounded-lg" />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required className="mt-2 rounded-lg" />
              </div>
              <div>
                <Label>I am a</Label>
                <Select value={role} onValueChange={(v) => setRole(v as "student" | "landlord")}>
                  <SelectTrigger className="mt-2 rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student looking for housing</SelectItem>
                    <SelectItem value="landlord">Landlord listing properties</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full rounded-lg" disabled={loading}>
                {loading ? "Creating account…" : "Create account"}
              </Button>
            </form>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href={`/login${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ""}`} className="text-primary font-medium hover:underline">
                Log in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="page-content flex min-h-[70vh] items-center justify-center"><div className="animate-pulse text-muted-foreground">Loading…</div></div>}>
      <RegisterForm />
    </Suspense>
  );
}
