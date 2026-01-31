import { promises as fs } from "fs";
import path from "path";
import type { House, City, User } from "@/types";

const dataDir = path.join(process.cwd(), "src/data");
const usersTmpPath = "/tmp/users.json";

export async function readHouses(): Promise<House[]> {
  const filePath = path.join(dataDir, "houses.json");
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

export async function writeHouses(houses: House[]): Promise<void> {
  const filePath = path.join(dataDir, "houses.json");
  try {
    await fs.writeFile(filePath, JSON.stringify(houses, null, 2), "utf-8");
  } catch {
    // Read-only filesystem (e.g. Vercel): skip persist
  }
}

export async function readCities(): Promise<City[]> {
  const filePath = path.join(dataDir, "cities.json");
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

export async function writeCities(cities: City[]): Promise<void> {
  const filePath = path.join(dataDir, "cities.json");
  try {
    await fs.writeFile(filePath, JSON.stringify(cities, null, 2), "utf-8");
  } catch {
    // Read-only filesystem (e.g. Vercel): skip persist
  }
}

function mergeUsersByEmail(fileUsers: User[], tmpUsers: User[]): User[] {
  const byEmail = new Map<string, User>();
  for (const u of fileUsers) byEmail.set(u.email.toLowerCase(), u);
  for (const u of tmpUsers) byEmail.set(u.email.toLowerCase(), u);
  return Array.from(byEmail.values());
}

export async function readUsers(): Promise<User[]> {
  const filePath = path.join(dataDir, "users.json");
  const data = await fs.readFile(filePath, "utf-8");
  const fileUsers: User[] = JSON.parse(data);
  try {
    const tmpData = await fs.readFile(usersTmpPath, "utf-8");
    const tmpUsers: User[] = JSON.parse(tmpData);
    return mergeUsersByEmail(fileUsers, tmpUsers);
  } catch {
    return fileUsers;
  }
}

export async function writeUsers(users: User[]): Promise<void> {
  const filePath = path.join(dataDir, "users.json");
  let fileUsers: User[];
  try {
    const data = await fs.readFile(filePath, "utf-8");
    fileUsers = JSON.parse(data);
  } catch {
    fileUsers = [];
  }
  const merged = mergeUsersByEmail(fileUsers, users);
  await fs.writeFile(usersTmpPath, JSON.stringify(merged, null, 2), "utf-8");
}
