```bash
pnpm i
cp .env.example .env
pnpm prisma:generate
pnpm prisma:migrate
pnpm seed   # optional demo data
pnpm dev
```