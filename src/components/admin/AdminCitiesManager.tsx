"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AdminCitiesManagerProps {
  cityId?: string;
  initialName?: string;
  initialSlug?: string;
  mode?: "add" | "edit";
}

export function AdminCitiesManager({
  cityId,
  initialName = "",
  initialSlug = "",
  mode = "add",
}: AdminCitiesManagerProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(initialName);
  const [slug, setSlug] = useState(initialSlug);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (open) {
      setName(initialName);
      setSlug(initialSlug);
      setError("");
    }
  }, [open, initialName, initialSlug]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const url = mode === "edit" && cityId ? `/api/cities/${cityId}` : "/api/cities";
      const method = mode === "edit" && cityId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, slug }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Failed");
        setLoading(false);
        return;
      }
      setOpen(false);
      router.refresh();
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!cityId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/cities/${cityId}`, { method: "DELETE" });
      if (res.ok) {
        setOpen(false);
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Failed to delete");
      }
    } finally {
      setLoading(false);
    }
  }

  const trigger =
    mode === "add" ? (
      <Button>Add city</Button>
    ) : (
      <Button variant="ghost" size="sm">Edit</Button>
    );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add city" : "Edit city"}</DialogTitle>
          <DialogDescription>
            {mode === "add" ? "Create a new city for listings." : "Update city name and slug."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div>
            <Label htmlFor="city-name">Name</Label>
            <Input id="city-name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1" />
          </div>
          <div>
            <Label htmlFor="city-slug">Slug</Label>
            <Input id="city-slug" value={slug} onChange={(e) => setSlug(e.target.value)} required className="mt-1" placeholder="e.g. london" />
          </div>
          <DialogFooter>
            {mode === "edit" && cityId && (
              <Button type="button" variant="destructive" onClick={handleDelete} disabled={loading}>
                Delete
              </Button>
            )}
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving…" : mode === "add" ? "Create" : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
