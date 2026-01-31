"use client";

import { AdminCitiesManager } from "./AdminCitiesManager";

export function AdminCityRowActions({ city }: { city: { id: string; name: string; slug: string } }) {
  return (
    <AdminCitiesManager
      cityId={city.id}
      initialName={city.name}
      initialSlug={city.slug}
      mode="edit"
    />
  );
}
