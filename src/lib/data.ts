import { promises as fs } from "fs";
import path from "path";
import type { House, City, User } from "@/types";

const dataDir = path.join(process.cwd(), "src/data");

export async function readHouses(): Promise<House[]> {
  const filePath = path.join(dataDir, "houses.json");
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

export async function writeHouses(houses: House[]): Promise<void> {
  const filePath = path.join(dataDir, "houses.json");
  await fs.writeFile(filePath, JSON.stringify(houses, null, 2), "utf-8");
}

export async function readCities(): Promise<City[]> {
  const filePath = path.join(dataDir, "cities.json");
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

export async function writeCities(cities: City[]): Promise<void> {
  const filePath = path.join(dataDir, "cities.json");
  await fs.writeFile(filePath, JSON.stringify(cities, null, 2), "utf-8");
}

export async function readUsers(): Promise<User[]> {
  const filePath = path.join(dataDir, "users.json");
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

export async function writeUsers(users: User[]): Promise<void> {
  const filePath = path.join(dataDir, "users.json");
  await fs.writeFile(filePath, JSON.stringify(users, null, 2), "utf-8");
}
