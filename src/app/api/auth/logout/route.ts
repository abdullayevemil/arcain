import { json } from "../../../lib/http";
import { clearSessionCookie } from "../../../lib/auth";

export async function POST() {
  clearSessionCookie();
  return json({ ok: true });
}
