# Open Digital Society

Open Digital Society is a non-profit, Medium-style publishing platform for writers and readers. It provides an open-access place to publish, discover, and engage with long-form content. The repository contains a Vite + React frontend (in `client/`) and an Express + TypeScript backend (in `server/`) using Postgres via Drizzle ORM.

## Key features

- Public article listing and detail pages
- Search and tagging for content discovery
- Author profiles and basic user data model
- Comments with threading and claps for engagement
- Bookmarks and basic follow/clap operations in storage
- Donation call-to-action component and donation flows placeholder
- Theme toggle, responsive UI, and editor/write actions (UI only)

## Project layout

- `client/` - Vite + React app
  - `src/` - frontend source (pages, components, hooks)
  - `index.html` - app entry
- `server/` - Express + TypeScript backend
  - `index.ts` - server bootstrap and Vite integration
  - `routes.ts` - API route registration
  - `db.ts` - database connection (uses `DATABASE_URL`)
  - `storage.ts` - database storage implementation (Drizzle ORM)
- `shared/` - shared Drizzle schema and Zod validation
- `drizzle.config.ts` - Drizzle Kit configuration for migrations

## Environment variables

The server reads runtime configuration from environment variables. For local development you can create a `.env` file at the project root.

Required/used variables:

- `DATABASE_URL` - Postgres connection string used by Drizzle/Neon client.
- `PORT` - (optional) Port the server listens on (default 5000).
- `NODE_ENV` - `development` or `production` (scripts set this with `cross-env`).

Notes:
- Replit-specific variables and code were removed from the project (`REPLIT_DOMAINS`, `REPL_ID`, Replit auth). If you previously relied on Replit OIDC, the integration lives in `server/replitAuth.ts` (removed) and can be restored manually.

## Getting started (Windows)

1. Install dependencies

```powershell
npm install
```

2. Create a `.env` file in the project root (a dummy value is fine for now):

```
DATABASE_URL=dummy_connection_string
```

3. Start the backend (development)

```powershell
npm run dev
```

Notes for Windows
- The project uses `cross-env` for cross-platform environment variables in `package.json` scripts. The `dev` script runs the TypeScript server with `tsx`.
- If you want to run frontend-only during development you can cd into `client/` and use `vite` directly, but the repo is configured to serve the client from the backend in development.

## Running in production (build)

1. Build the frontend and compile the server bundle

```powershell
npm run build
```

2. Start the production server (ensure `DATABASE_URL` and any production secrets are set)

```powershell
npm start
```

## API endpoints (subset)

- `GET /api/articles` - list published articles (query: `limit`, `offset`)
- `GET /api/articles/:id` - fetch a single article
- `GET /api/articles/:id/comments` - comments for an article
- `GET /api/search?q=...` - search published articles

Note: endpoints for creating articles/comments/claps were previously protected by Replit OIDC auth and now return 501 placeholders. See `server/routes.ts`.

## Development notes

- Database schema is in `shared/schema.ts`. Use `drizzle-kit` to manage migrations.
- The server uses `dotenv` to load `.env`. If you prefer another secrets management system, update `server/db.ts` and any files that call `process.env`.
- Replit integration: Replit-specific Vite plugins and auth checks are gated on `process.env.REPL_ID` in `vite.config.ts`. Those checks were left but will no-op without `REPL_ID`.

## How to re-enable OAuth/Replit auth

If you want to restore Replit OIDC auth (or add another OIDC provider):

1. Restore or review `server/replitAuth.ts` (the file was removed to simplify the app). You can reintroduce it and update `routes.ts` to call `setupAuth(app)` and use the `isAuthenticated` middleware on protected routes.
2. Set the required environment variables (provider issuer, client id, domains, session secret).

## Troubleshooting

- "DATABASE_URL must be set": create a `.env` file with `DATABASE_URL`.
- Socket/listen errors on Windows: ensure the `PORT` is reachable; the server binds to `0.0.0.0` by default. Use `PORT=5000` or another free port.
- If vite plugins reference `REPL_ID` (cartographer), they will not load without that env var — this is expected.

## Contributing

Contributions are welcome. Open a PR against `main`. Add tests for new server logic and run TypeScript checks with `npm run check`.

---

README generated from repository files and client HTML/UI. If you'd like a shorter or longer README, or want badges/CI instructions added, tell me which sections to expand and I'll update it.
