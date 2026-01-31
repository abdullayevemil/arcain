"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "";
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
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
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Welcome back</h1>
          <p className="mt-2 text-muted-foreground">Sign in to access your account and listings.</p>
        </div>
        <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg">Log in</CardTitle>
            <CardDescription>Enter your email and password to continue.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && <p className="text-sm text-destructive rounded-lg bg-destructive/10 p-3">{error}</p>}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required className="mt-2 rounded-lg" />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required className="mt-2 rounded-lg" />
              </div>
              <Button type="submit" className="w-full rounded-lg" disabled={loading}>
                {loading ? "Signing in…" : "Sign in"}
              </Button>
            </form>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href={`/register${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ""}`} className="text-primary font-medium hover:underline">
                Register
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="page-content flex min-h-[70vh] items-center justify-center"><div className="animate-pulse text-muted-foreground">Loading…</div></div>}>
      <LoginForm />
    </Suspense>
  );
}
