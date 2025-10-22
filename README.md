# Sales Service 

This is a Sales service like OLX clone made to learn Angular and Express.js

## Structure
- [docker-compose.yml](docker-compose.yml) — compose for db, backend, frontend
- [backend/](backend/) — Express + Postgres API ([backend/server.js](backend/server.js), [backend/database.js](backend/database.js))
- [frontend/](frontend/) — Angular app ([frontend/package.json](frontend/package.json), [frontend/angular.json](frontend/angular.json))
- `dump.sql` — initial DB dump to seed Postgres

## Quick start (Docker)
1. Build & run:
   ```sh
   docker-compose up --build
   ```
2. Services:
   - Backend: http://localhost:3000 (see [backend/server.js](backend/server.js))
   - Frontend: http://localhost:4200 (served by nginx container; config in [frontend/angular.json](frontend/angular.json))
   - Postgres: localhost:5432

## Run locally (no Docker)
- Backend:
  ```sh
  cd backend
  npm install
  npm start
  ```
  The backend uses the `start` script in [backend/package.json](backend/package.json).

- Frontend (dev server):
  ```sh
  cd frontend
  npm install
  npm start
  ```
  Dev server proxies `/api` to the backend using [frontend/src/proxy.conf.json](frontend/src/proxy.conf.json).

## Environment
- When using Docker Compose the backend receives `DATABASE_URL` from [docker-compose.yml](docker-compose.yml).
- Recommended env vars:
  - DATABASE_URL (example set in [docker-compose.yml](docker-compose.yml))
  - JWT_SECRET (used by [backend/server.js](backend/server.js))
Create a `.env` (not committed) for local runs.

## Database
- The project ships with `dump.sql` to seed the DB on first start (used by the `db` service in [docker-compose.yml](docker-compose.yml)).
- Connection code: [backend/database.js](backend/database.js)

## Useful files
- API server: [backend/server.js](backend/server.js)
- DB connection: [backend/database.js](backend/database.js)
- Frontend dev/proxy: [frontend/src/proxy.conf.json](frontend/src/proxy.conf.json)
- Frontend build config: [frontend/angular.json](frontend/angular.json)

## Tests
- Frontend unit tests: `cd frontend && npm test` (Karma setup in [frontend/package.json](frontend/package.json))
