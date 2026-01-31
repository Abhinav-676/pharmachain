# PharmaChain

A robust, multi-tenant inventory management system for pharmacies and warehouses, built with **NestJS**, **Postgres**, and **Kysely**.

## Architecture & Features

### Multi-Tenancy
PharmaChain uses a **Shared Database, Shared Schema** architecture with strict logical and physical isolation:
- **Global Guards**: `AuthGuard`, `RolesGuard`, and `ResourceGuard` are applied globally to ensure every endpoint is protected by default.
- **Row Level Security (RLS)**: Postgres RLS policies enforce tenant isolation at the database level. Even if application logic fails, tenants (Stores/Warehouses) cannot access each other's data.

### Tech Stack
- **Framework**: [NestJS](https://nestjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM/Query Builder**: [Kysely](https://kysely.dev/)
- **Migrations**: `node-pg-migrate`
- **Context Management**: `nestjs-cls` (for propagating transactions/tenant context)

## Project Setup

### Prerequisites
- Node.js (v18+)
- Docker & Docker Compose (for local DB)

### Installation

```bash
$ npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=postgres://postgres:postgres@localhost:5432/pharmachain
JWT_SECRET=your_super_secret_key
PORT=3000
```

### Running Logic Database

```bash
$ docker-compose up -d
```

### Migrations

Run migrations to set up the schema and enable RLS policies:

```bash
$ npm run migrate up
```

### Compiling and Running

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```

## Security Implementation Details
- **Authentication**: JWT-based auth. Login endpoints are explicitly marked `@Public()`.
- **Authorization**: Role-based access control (RBAC) via `RolesGuard`.
- **Isolation**: 
    - `ResourceGuard` checks URL parameters against User ID.
    - `RlsInterceptor` wraps requests in a transaction and sets `app.current_store_id` or `app.current_warehouse_id`.
    - `DbContextService` ensures the active transaction is used for all DB queries within the request scope.

## License

[MIT](LICENSE)
