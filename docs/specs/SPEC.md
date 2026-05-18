# SPEC.md

## 1. TECHNOLOGY STACK

- **Frontend**
  - React 18.2.0
  - TypeScript 5.2.2
  - Tailwind CSS 3.3.2
  - Vite 4.4.9
  - PWA: @vite-pwa/plugin 0.16.4

- **Backend**
  - Node.js 20.10.0
  - NestJS 10.2.7
  - TypeScript 5.2.2
  - JWT Auth: @nestjs/jwt 10.1.0
  - PostgreSQL 15.4
  - TypeORM 0.3.17
  - Redis 7.2.1 (for notifications and caching)

- **Infrastructure**
  - Docker 24.0.7
  - docker-compose 2.24.6
  - Kubernetes 1.28.2
  - Nginx 1.25.2

## 2. DATA CONTRACTS

### Plant Model

#### TypeScript (frontend & backend)
```typescript
export interface Plant {
  id: number;
  name: string;
  species: string;
  datePlanted: string; // ISO 8601 date string
  germinationStatus: 'pending' | 'germinated' | 'failed';
  notes: string | null;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}
```

### PlantCreate DTO

```typescript
export interface PlantCreate {
  name: string;
  species: string;
  datePlanted: string; // ISO 8601
  notes?: string | null;
}
```

### PlantUpdate DTO

```typescript
export interface PlantUpdate {
  name?: string;
  species?: string;
  datePlanted?: string;
  germinationStatus?: 'pending' | 'germinated' | 'failed';
  notes?: string | null;
}
```

### User Model

```typescript
export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
  updatedAt: string;
}
```

### UserCreate DTO

```typescript
export interface UserCreate {
  username: string;
  email: string;
  password: string;
  role?: 'admin' | 'user';
}
```

### AuthToken

```typescript
export interface AuthToken {
  accessToken: string;
  expiresIn: number; // seconds
}
```

### Notification Model

```typescript
export interface Notification {
  id: number;
  type: 'info' | 'warning' | 'success' | 'error';
  message: string;
  read: boolean;
  createdAt: string;
}
```

### Report Model

```typescript
export interface Report {
  id: number;
  title: string;
  generatedAt: string;
  url: string;
}
```

## 3. API ENDPOINTS

### Auth

- **POST /api/auth/register**
  - Request: `UserCreate`
  - Response: `User`

- **POST /api/auth/login**
  - Request:
    ```typescript
    { username: string; password: string; }
    ```
  - Response: `AuthToken`

- **GET /api/auth/me**
  - Auth: Bearer JWT
  - Response: `User`

### Plantas

- **GET /api/plants**
  - Auth: Bearer JWT
  - Response: `Plant[]`

- **POST /api/plants**
  - Auth: Bearer JWT
  - Request: `PlantCreate`
  - Response: `Plant`

- **GET /api/plants/:id**
  - Auth: Bearer JWT
  - Response: `Plant`

- **PATCH /api/plants/:id**
  - Auth: Bearer JWT
  - Request: `PlantUpdate`
  - Response: `Plant`

- **DELETE /api/plants/:id**
  - Auth: Bearer JWT
  - Response:
    ```typescript
    { success: boolean }
    ```

### Notificaciones

- **GET /api/notifications**
  - Auth: Bearer JWT
  - Response: `Notification[]`

- **POST /api/notifications/mark-read**
  - Auth: Bearer JWT
  - Request:
    ```typescript
    { ids: number[] }
    ```
  - Response:
    ```typescript
    { success: boolean }
    ```

### Reportes

- **GET /api/reports**
  - Auth: Bearer JWT
  - Response: `Report[]`

- **POST /api/reports/generate**
  - Auth: Bearer JWT
  - Request:
    ```typescript
    { type: 'germination-summary' | 'plant-status' }
    ```
  - Response: `Report`

## 4. FILE STRUCTURE

### PORT TABLE

| Service                | Listening Port | Path                        |
|------------------------|---------------|-----------------------------|
| auth-service           | 23001         | backend/auth-service/       |
| plant-service          | 23002         | backend/plant-service/      |
| notification-service   | 23003         | backend/notification-service/ |
| report-service         | 23004         | backend/report-service/     |

### SHARED MODULES

| Shared path         | Imported by services                                 |
|---------------------|-----------------------------------------------------|
| backend/shared/     | auth-service, plant-service, notification-service, report-service |

### FILE TREE

```
.
├── docker-compose.yml                # Multi-service orchestration
├── .env.example                     # Environment variables template
├── .gitignore                       # Git ignore rules
├── README.md                        # Project documentation
├── run.sh                           # Root startup script
├── backend/
│   ├── shared/                      # Shared modules (DTOs, utils, constants)
│   │   ├── dtos/                    # Shared DTOs/interfaces
│   │   ├── entities/                # Shared TypeORM entities
│   │   ├── utils/                   # Shared utility functions
│   │   └── constants.ts             # Shared constants
│   ├── auth-service/
│   │   ├── src/
│   │   │   ├── main.ts              # NestJS entrypoint
│   │   │   ├── app.module.ts        # Root module
│   │   │   ├── auth/                # Auth module
│   │   │   ├── users/               # User module
│   │   │   └── config/              # Config module
│   │   ├── Dockerfile               # Auth service Dockerfile
│   │   └── start.sh                 # Service startup script
│   ├── plant-service/
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── app.module.ts
│   │   │   ├── plants/              # Plants module
│   │   │   └── config/
│   │   ├── Dockerfile
│   │   └── start.sh
│   ├── notification-service/
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── app.module.ts
│   │   │   ├── notifications/       # Notifications module
│   │   │   └── config/
│   │   ├── Dockerfile
│   │   └── start.sh
│   ├── report-service/
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── app.module.ts
│   │   │   ├── reports/             # Reports module
│   │   │   └── config/
│   │   ├── Dockerfile
│   │   └── start.sh
├── frontend/
│   ├── public/
│   │   ├── index.html               # HTML entrypoint
│   │   └── manifest.json            # PWA manifest
│   ├── src/
│   │   ├── main.tsx                 # React entrypoint
│   │   ├── App.tsx                  # Root component
│   │   ├── api/                     # API clients
│   │   ├── hooks/                   # React hooks (state)
│   │   ├── components/              # Reusable components
│   │   ├── pages/                   # Page components
│   │   ├── stores/                  # Zustand stores
│   │   ├── styles/
│   │   │   ├── tokens.ts            # Design tokens
│   │   │   └── tailwind.css         # Tailwind entry
│   │   └── types/                   # Shared TypeScript types
│   ├── Dockerfile                   # Frontend Dockerfile
│   └── start.sh                     # Frontend startup script
├── k8s/
│   ├── auth-deployment.yaml         # K8s deployment for auth
│   ├── plant-deployment.yaml        # K8s deployment for plants
│   ├── notification-deployment.yaml # K8s deployment for notifications
│   ├── report-deployment.yaml       # K8s deployment for reports
│   ├── frontend-deployment.yaml     # K8s deployment for frontend
│   ├── postgres-deployment.yaml     # K8s deployment for PostgreSQL
│   ├── redis-deployment.yaml        # K8s deployment for Redis
│   └── nginx-deployment.yaml        # K8s deployment for Nginx
```

## 5. ENVIRONMENT VARIABLES

| Name                       | Type    | Description                                         | Example Value                |
|----------------------------|---------|-----------------------------------------------------|-----------------------------|
| NODE_ENV                   | string  | Node environment                                    | production                  |
| JWT_SECRET                 | string  | JWT signing secret                                  | supersecretjwtkey           |
| JWT_EXPIRES_IN             | string  | JWT expiration (e.g., 3600s, 1d)                    | 3600s                       |
| POSTGRES_HOST              | string  | PostgreSQL host                                     | postgres                    |
| POSTGRES_PORT              | number  | PostgreSQL port (internal)                          | 5432                        |
| POSTGRES_USER              | string  | PostgreSQL username                                 | admin                       |
| POSTGRES_PASSWORD          | string  | PostgreSQL password                                 | adminpw                     |
| POSTGRES_DB                | string  | PostgreSQL database name                            | plantas                     |
| REDIS_HOST                 | string  | Redis host                                          | redis                       |
| REDIS_PORT                 | number  | Redis port (internal)                               | 6379                        |
| FRONTEND_URL               | string  | Public URL for frontend                             | http://localhost:3000       |
| BACKEND_AUTH_URL           | string  | Auth service URL                                    | http://localhost:23001      |
| BACKEND_PLANT_URL          | string  | Plant service URL                                   | http://localhost:23002      |
| BACKEND_NOTIFICATION_URL   | string  | Notification service URL                            | http://localhost:23003      |
| BACKEND_REPORT_URL         | string  | Report service URL                                  | http://localhost:23004      |
| PORT                       | number  | Service listening port (per service)                | 23001, 23002, 23003, 23004  |

## 6. IMPORT CONTRACTS

### backend/shared/dtos/plant.dto.ts
```typescript
export { Plant, PlantCreate, PlantUpdate } // interfaces
```

### backend/shared/dtos/user.dto.ts
```typescript
export { User, UserCreate } // interfaces
```

### backend/shared/dtos/auth-token.dto.ts
```typescript
export { AuthToken } // interface
```

### backend/shared/dtos/notification.dto.ts
```typescript
export { Notification } // interface
```

### backend/shared/dtos/report.dto.ts
```typescript
export { Report } // interface
```

### backend/shared/constants.ts
```typescript
export const GERMINATION_STATUSES = ['pending', 'germinated', 'failed'] as const;
```

### frontend/src/types/plant.ts
```typescript
export type { Plant, PlantCreate, PlantUpdate }
```

### frontend/src/types/user.ts
```typescript
export type { User, UserCreate }
```

### frontend/src/types/auth.ts
```typescript
export type { AuthToken }
```

### frontend/src/types/notification.ts
```typescript
export type { Notification }
```

### frontend/src/types/report.ts
```typescript
export type { Report }
```

### frontend/src/styles/tokens.ts
```typescript
export { tokens }
```

## 7. FRONTEND STATE & COMPONENT CONTRACTS

### Zustand Stores / React Hooks

#### useAuth()
```typescript
useAuth() → {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: UserCreate) => Promise<void>;
}
```

#### usePlants()
```typescript
usePlants() → {
  plants: Plant[];
  loading: boolean;
  error: string | null;
  fetchPlants: () => Promise<void>;
  createPlant: (data: PlantCreate) => Promise<void>;
  updatePlant: (id: number, data: PlantUpdate) => Promise<void>;
  deletePlant: (id: number) => Promise<void>;
}
```

#### useNotifications()
```typescript
useNotifications() → {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
  markRead: (ids: number[]) => Promise<void>;
  fetchNotifications: () => Promise<void>;
}
```

#### useReports()
```typescript
useReports() → {
  reports: Report[];
  loading: boolean;
  error: string | null;
  fetchReports: () => Promise<void>;
  generateReport: (type: 'germination-summary' | 'plant-status') => Promise<void>;
}
```

### Reusable Components

#### PlantList
```typescript
PlantList props: {
  plants: Plant[];
  onEdit: (plant: Plant) => void;
  onDelete: (id: number) => void;
  loading: boolean;
}
```

#### PlantForm
```typescript
PlantForm props: {
  initialValues?: PlantCreate | Plant;
  onSubmit: (data: PlantCreate | PlantUpdate) => void;
  loading: boolean;
}
```

#### NotificationList
```typescript
NotificationList props: {
  notifications: Notification[];
  onMarkRead: (ids: number[]) => void;
  loading: boolean;
}
```

#### ReportList
```typescript
ReportList props: {
  reports: Report[];
  onDownload: (report: Report) => void;
  loading: boolean;
}
```

#### AuthForm
```typescript
AuthForm props: {
  mode: 'login' | 'register';
  onSubmit: (data: { username: string; password: string; email?: string }) => void;
  loading: boolean;
}
```

## 8. FILE EXTENSION CONVENTION

- All frontend files use `.tsx` (TypeScript React).
- The project is TypeScript throughout (frontend and backend).
- Entry point: `/src/main.tsx` (as referenced in `public/index.html`).

## 9. DESIGN TOKENS

```typescript
export const tokens = {
  colors: {
    primary: '#38bdf8',
    secondary: '#fbbf24',
    accent: '#22d3ee',
    background: '#f9fafb',
    surface: '#ffffff',
    error: '#ef4444',
    success: '#22c55e',
    warning: '#f59e42',
    textPrimary: '#1e293b',
    textSecondary: '#64748b'
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    fontSizeBase: '1rem',
    fontWeightRegular: 400,
    fontWeightBold: 700,
    lineHeightBase: 1.5
  },
  spacing: {
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    6: '1.5rem',
    8: '2rem'
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0,0,0,0.05)',
    md: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
    lg: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)'
  }
};
```