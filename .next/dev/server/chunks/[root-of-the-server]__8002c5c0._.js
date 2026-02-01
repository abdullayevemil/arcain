module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/Desktop/arcain/new/src/lib/data.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "readCities",
    ()=>readCities,
    "readHouses",
    ()=>readHouses,
    "readUsers",
    ()=>readUsers,
    "writeCities",
    ()=>writeCities,
    "writeHouses",
    ()=>writeHouses,
    "writeUsers",
    ()=>writeUsers
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
const dataDir = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), "src/data");
const usersTmpPath = "/tmp/users.json";
async function readHouses() {
    const filePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(dataDir, "houses.json");
    const data = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].readFile(filePath, "utf-8");
    return JSON.parse(data);
}
async function writeHouses(houses) {
    const filePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(dataDir, "houses.json");
    try {
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].writeFile(filePath, JSON.stringify(houses, null, 2), "utf-8");
    } catch  {
    // Read-only filesystem (e.g. Vercel): skip persist
    }
}
async function readCities() {
    const filePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(dataDir, "cities.json");
    const data = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].readFile(filePath, "utf-8");
    return JSON.parse(data);
}
async function writeCities(cities) {
    const filePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(dataDir, "cities.json");
    try {
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].writeFile(filePath, JSON.stringify(cities, null, 2), "utf-8");
    } catch  {
    // Read-only filesystem (e.g. Vercel): skip persist
    }
}
function mergeUsersByEmail(fileUsers, tmpUsers) {
    const byEmail = new Map();
    for (const u of fileUsers)byEmail.set(u.email.toLowerCase(), u);
    for (const u of tmpUsers)byEmail.set(u.email.toLowerCase(), u);
    return Array.from(byEmail.values());
}
async function readUsers() {
    const filePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(dataDir, "users.json");
    const data = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].readFile(filePath, "utf-8");
    const fileUsers = JSON.parse(data);
    try {
        const tmpData = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].readFile(usersTmpPath, "utf-8");
        const tmpUsers = JSON.parse(tmpData);
        return mergeUsersByEmail(fileUsers, tmpUsers);
    } catch  {
        return fileUsers;
    }
}
async function writeUsers(users) {
    const filePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(dataDir, "users.json");
    let fileUsers;
    try {
        const data = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].readFile(filePath, "utf-8");
        fileUsers = JSON.parse(data);
    } catch  {
        fileUsers = [];
    }
    const merged = mergeUsersByEmail(fileUsers, users);
    await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].writeFile(usersTmpPath, JSON.stringify(merged, null, 2), "utf-8");
}
}),
"[project]/Desktop/arcain/new/src/app/api/houses/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$arcain$2f$new$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/arcain/new/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$arcain$2f$new$2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/arcain/new/src/lib/data.ts [app-route] (ecmascript)");
;
;
async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const city = searchParams.get("city");
        const search = searchParams.get("search")?.toLowerCase() || "";
        const sort = searchParams.get("sort") || "price_asc";
        const roommateFriendly = searchParams.get("roommateFriendly");
        const type = searchParams.get("type");
        const builtType = searchParams.get("builtType");
        const priceMin = searchParams.get("priceMin");
        const priceMax = searchParams.get("priceMax");
        const region = searchParams.get("region");
        const renovated = searchParams.get("renovated");
        const areaMin = searchParams.get("areaMin");
        const areaMax = searchParams.get("areaMax");
        const floorMin = searchParams.get("floorMin");
        const floorMax = searchParams.get("floorMax");
        const rooms = searchParams.get("rooms");
        const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
        const limit = Math.min(20, Math.max(1, parseInt(searchParams.get("limit") || "10", 10)));
        let houses = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$arcain$2f$new$2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["readHouses"])();
        if (city) houses = houses.filter((h)=>h.city === city);
        if (roommateFriendly === "true") houses = houses.filter((h)=>h.roommateFriendly);
        if (type) houses = houses.filter((h)=>h.type === type);
        if (builtType) houses = houses.filter((h)=>h.builtType === builtType);
        if (priceMin != null && priceMin !== "") houses = houses.filter((h)=>h.price >= Number(priceMin));
        if (priceMax != null && priceMax !== "") houses = houses.filter((h)=>h.price <= Number(priceMax));
        if (region) houses = houses.filter((h)=>h.address?.toLowerCase() === region.toLowerCase());
        if (renovated === "true") houses = houses.filter((h)=>h.renovated);
        if (renovated === "false") houses = houses.filter((h)=>!h.renovated);
        if (areaMin != null && areaMin !== "") houses = houses.filter((h)=>(h.area ?? 0) >= Number(areaMin));
        if (areaMax != null && areaMax !== "") houses = houses.filter((h)=>(h.area ?? 0) <= Number(areaMax));
        if (floorMin != null && floorMin !== "") houses = houses.filter((h)=>(h.floor ?? 0) >= Number(floorMin));
        if (floorMax != null && floorMax !== "") houses = houses.filter((h)=>(h.floor ?? 0) <= Number(floorMax));
        if (rooms != null && rooms !== "") {
            const r = Number(rooms);
            if (r === 4) houses = houses.filter((h)=>h.rooms >= 4);
            else houses = houses.filter((h)=>h.rooms === r);
        }
        if (search) {
            houses = houses.filter((h)=>h.title.toLowerCase().includes(search) || h.description && h.description.toLowerCase().includes(search) || h.city.toLowerCase().includes(search) || h.address && h.address.toLowerCase().includes(search));
        }
        if (sort === "price_asc") houses.sort((a, b)=>a.price - b.price);
        else if (sort === "price_desc") houses.sort((a, b)=>b.price - a.price);
        else if (sort === "rating_desc") houses.sort((a, b)=>b.rating - a.rating);
        else if (sort === "rating_asc") houses.sort((a, b)=>a.rating - b.rating);
        const total = houses.length;
        const start = (page - 1) * limit;
        const items = houses.slice(start, start + limit);
        const regions = [
            ...new Set((await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$arcain$2f$new$2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["readHouses"])()).map((h)=>h.address).filter(Boolean))
        ].sort();
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$arcain$2f$new$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            regions
        });
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$arcain$2f$new$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to load houses"
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const body = await request.json();
        const { title, city, price, rooms, images, rating, description, roommateFriendly, type, builtType, address, renovated, area, floor } = body;
        if (!title || !city || price == null) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$arcain$2f$new$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Title, city and price required"
            }, {
                status: 400
            });
        }
        const houses = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$arcain$2f$new$2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["readHouses"])();
        const newHouse = {
            id: String(houses.length + 1),
            title: title || "",
            city: city || "",
            price: Number(price) || 0,
            rooms: Number(rooms) || 1,
            images: Array.isArray(images) ? images : [],
            rating: Number(rating) || 0,
            description: description || "",
            roommateFriendly: Boolean(roommateFriendly),
            type: type === "house" ? "house" : "flat",
            builtType: builtType === "old" ? "old" : "new",
            address: address ?? "",
            renovated: Boolean(renovated),
            area: Number(area) || 0,
            floor: Number(floor) || 0
        };
        houses.push(newHouse);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$arcain$2f$new$2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["writeHouses"])(houses);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$arcain$2f$new$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(newHouse);
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$arcain$2f$new$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Server error"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__8002c5c0._.js.map