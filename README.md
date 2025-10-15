# Open Digital Society

Open Digital Society is a non-profit digital marketplace platform dedicated to facilitating secure, transparent, and accessible global transactions of digital products between buyers and sellers. Our mission is to empower creators, entrepreneurs, and innovators worldwide by providing a trusted space to list, sell, and acquire digital goods—regardless of geography or background.

We make online business acquisitions fast, safe, and easy for everyone. Sellers can maximize their reach and impact, while buyers discover vetted digital products from around the world. By removing barriers and prioritizing community-driven values, Open Digital Society helps foster economic opportunity and digital inclusion on a global scale.

## Frontend: React Application

The frontend of this project is built entirely with **React** using Vite for fast development and modern tooling. All user-facing pages, components, and UI logic are implemented in React (TypeScript) and located in the `client/` directory.

- **React** powers the UI and interactive features
- **Vite** provides fast dev server and build tools
- **TypeScript** ensures type safety and maintainability

To start developing the React frontend:

```powershell
cd client
npm install
npm run dev
```

This will launch the React app locally. You can edit files in `client/src/` and see changes instantly.

## Backend: Express + TypeScript

The backend is an Express server written in TypeScript, located in the `server/` directory. It serves the API and, in development, also proxies the React frontend.

---

# Project Details

Open Digital Society is a marketplace for digital products. Project owners can create accounts, list their digital products (such as e-books, software, designs, media, etc.), set prices, and manage their sales. Buyers can browse the marketplace, search for products, view details, purchase, and download digital goods securely.

## Key features
- Seller accounts for listing and managing digital products
- Buyer accounts for purchasing and downloading products
- Product catalog with search, categories, and tags
- Secure payment integration for digital transactions
- Product detail pages with descriptions, previews, and reviews
- Order history and digital delivery for buyers
- Dashboard for sellers to track sales and manage listings
- Responsive UI and theme toggle

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
- `GET /api/products` - list digital products (query: `limit`, `offset`, `category`, `search`)
- `GET /api/products/:id` - fetch a single product
- `POST /api/orders` - create a new order (purchase)
- `GET /api/orders/:id` - get order details and download link
- `POST /api/products` - seller creates a new product listing

## Development notes
- Database schema is in `shared/schema.ts`. Use `drizzle-kit` to manage migrations.
- The server uses `dotenv` to load `.env`. If you prefer another secrets management system, update `server/db.ts` and any files that call `process.env`.

## Contributing
Contributions are welcome. Open a PR against `main`. Add tests for new server logic and run TypeScript checks with `npm run check`.

---
README generated for a digital marketplace platform. If you'd like more details, want badges/CI instructions, or need specific sections expanded, let me know!
