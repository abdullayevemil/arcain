"use client";

import { AdminUsersManager } from "./AdminUsersManager";
import type { UserRole } from "@/types";

export function AdminUserRowActions({ user }: { user: { id: string; name: string; email: string; role: UserRole } }) {
  return (
    <AdminUsersManager
      userId={user.id}
      initialName={user.name}
      initialEmail={user.email}
      initialRole={user.role}
      mode="edit"
    />
  );
}
