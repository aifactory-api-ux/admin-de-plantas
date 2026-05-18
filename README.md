# Plant Management System

A NestJS-based microservice architecture for managing plants, notifications, and reports.

## Architecture

- **Auth Service** (Port 23001) - User authentication and JWT management
- **Plant Service** (Port 23002) - Plant CRUD operations
- **Notification Service** (Port 23003) - Notification management with Redis caching
- **Report Service** (Port 23004) - Report generation

## Tech Stack

- Node.js 20.10.0
- NestJS 10.2.7
- TypeScript 5.2.2
- PostgreSQL 15.4
- Redis 7.2.1
- Docker & Docker Compose

## Getting Started

### Prerequisites

- Node.js 20.10.0
- Docker and Docker Compose
- PostgreSQL 15.4
- Redis 7.2.1

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

### Running with Docker Compose

```bash
./run.sh
```

### Running Services Locally

```bash
cd backend/auth-service && npm install && npm run start:dev
cd backend/plant-service && npm install && npm run start:dev
cd backend/notification-service && npm install && npm run start:dev
cd backend/report-service && npm install && npm run start:dev
```

## API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

### Plants
- GET /api/plants
- POST /api/plants
- GET /api/plants/:id
- PATCH /api/plants/:id
- DELETE /api/plants/:id

### Notifications
- GET /api/notifications
- POST /api/notifications/mark-read

### Reports
- GET /api/reports
- POST /api/reports/generate

## Running Tests

```bash
./backend/auth-service/run_tests.sh
./backend/plant-service/run_tests.sh
./backend/notification-service/run_tests.sh
./backend/report-service/run_tests.sh
./backend/shared/run_tests.sh
```