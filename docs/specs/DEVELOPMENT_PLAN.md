# MASTER DEVELOPMENT PLAN

> Fuente de verdad única. Los nombres de clases, fields, rutas y variables
> definidos en §1 son los ÚNICOS válidos — el coder no puede inventar nombres.

> ⚠️ **ORDEN DE IMPLEMENTACIÓN GLOBAL — NO NEGOCIABLE:**
> 1. Implementa **TODOS** los ítems marcados 🔴 TEST (de todos los waves) antes de escribir cualquier ítem 🟢 PROD.
> 2. Una vez escritos todos los tests, implementa los ítems 🟢 PROD.
> 3. Si no hay ítems 🔴 TEST, implementa los 🟢 PROD directamente.
> Razón: el código de producción debe ser escrito sabiendo qué contratos deben satisfacer los tests.

---

# §1 Contratos Globales

## §1.1 Especificación Técnica — Stack, Modelos, Estructura, Env Vars

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

## §1.2 Contrato API (OpenAPI 3.1)
> Ref obligatoria para tests de endpoints: usa los paths, schemas y status codes exactos de aquí.

```yaml
openapi: 3.1.0
info:
  title: Derived API Contract
  version: 1.0.0
paths:
  /api/auth/login:
    post:
      operationId: post_api_auth_login
      responses:
        '201':
          description: Derived from SPEC.md
          content:
            application/json:
              schema:
                type: object
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
  /api/auth/me:
    get:
      operationId: get_api_auth_me
      responses:
        '200':
          description: Derived from SPEC.md
          content:
            application/json:
              schema:
                type: object
  /api/auth/register:
    post:
      operationId: post_api_auth_register
      responses:
        '201':
          description: Derived from SPEC.md
          content:
            application/json:
              schema:
                type: object
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
  /api/notifications:
    get:
      operationId: get_api_notifications
      responses:
        '200':
          description: Derived from SPEC.md
          content:
            application/json:
              schema:
                type: object
  /api/notifications/mark-read:
    post:
      operationId: post_api_notifications_mark_read
      responses:
        '201':
          description: Derived from SPEC.md
          content:
            application/json:
              schema:
                type: object
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
  /api/plants:
    get:
      operationId: get_api_plants
      responses:
        '200':
          description: Derived from SPEC.md
          content:
            application/json:
              schema:
                type: object
    post:
      operationId: post_api_plants
      responses:
        '201':
          description: Derived from SPEC.md
          content:
            application/json:
              schema:
                type: object
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
  /api/plants/:id:
    delete:
      operationId: delete_api_plants_id
      responses:
        '204':
          description: Derived from SPEC.md
    get:
      operationId: get_api_plants_id
      responses:
        '200':
          description: Derived from SPEC.md
          content:
            application/json:
              schema:
                type: object
    patch:
      operationId: patch_api_plants_id
      responses:
        '200':
          description: Derived from SPEC.md
          content:
            application/json:
              schema:
                type: object
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
  /api/reports:
    get:
      operationId: get_api_reports
      responses:
        '200':
          description: Derived from SPEC.md
          content:
            application/json:
              schema:
                type: object
  /api/reports/generate:
    post:
      operationId: post_api_reports_generate
      responses:
        '201':
          description: Derived from SPEC.md
          content:
            application/json:
              schema:
                type: object
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
```

---

# §2 Plan de Implementación

> **REGLA TDD OBLIGATORIA**
> 1. Escribe el ítem 🔴 TEST completo antes de tocar el ítem 🟢 PROD.
> 2. Corre los tests: deben fallar (RED). Si pasan sin código de producción, el test está mal.
> 3. Escribe el código de producción mínimo para que pasen (GREEN).
> 4. Si los tests fallan después del paso 3, corrige SOLO producción — nunca los tests.

## Wave 2

### 🟢 PROD — Design Tokens Implementation
> Implement all design tokens as per UI/UX contract in a single file.
**Archivos:**
  - `frontend/src/styles/tokens.ts`


### 🟢 PROD — API Hooks and Services
> Implement all useXxx hooks for API endpoints as per SPEC.md.
**Archivos:**
  - `frontend/src/hooks/useAuth.ts`  
  - `frontend/src/hooks/usePlants.ts`  
  - `frontend/src/hooks/useNotifications.ts`  
  - `frontend/src/hooks/useReports.ts`


### 🟢 PROD — Login Page
> Implement the "Login" page from Figma as a standalone page.
**Archivos:**
  - `frontend/src/pages/Login.tsx`


### 🟢 PROD — Dashboard Page
> Implement the "Dashboard" page from Figma as a standalone page.
**Archivos:**
  - `frontend/src/pages/Dashboard.tsx`


### 🟢 PROD — Registro de Planta Page
> Implement the "Registro de Planta" page from Figma as a standalone page.
**Archivos:**
  - `frontend/src/pages/RegistroDePlanta.tsx`


### 🟢 PROD — Detalle de Planta Page
> Implement the "Detalle de Planta" page from Figma as a standalone page.
**Archivos:**
  - `frontend/src/pages/DetalleDePlanta.tsx`


## Wave 3

### 🟢 PROD — Primary Navigation Component
> Implement the "Primary Navigation" component from Figma.
**Archivos:**
  - `frontend/src/components/ui/PrimaryNavigation.tsx`


### 🟢 PROD — CTA Button Component
> Implement the "CTA Button" component from Figma.
**Archivos:**
  - `frontend/src/components/ui/CTAButton.tsx`


### 🟢 PROD — Card Component
> Implement the "Card" component from Figma.
**Archivos:**
  - `frontend/src/components/ui/Card.tsx`


### 🟢 PROD — Input Field Component
> Implement the "Input Field" component from Figma.
**Archivos:**
  - `frontend/src/components/ui/InputField.tsx`


### 🟢 PROD — Status Badge Component
> Implement the "Status Badge" component from Figma.
**Archivos:**
  - `frontend/src/components/ui/StatusBadge.tsx`


### 🟢 PROD — Data Table Component
> Implement the "Data Table" component from Figma.
**Archivos:**
  - `frontend/src/components/ui/DataTable.tsx`


### 🟢 PROD — Modal Component
> Implement the "Modal" component from Figma.
**Archivos:**
  - `frontend/src/components/ui/Modal.tsx`


---

# §3 Reglas de Infraestructura (obligatorias)

## §3.1 Dockerfiles y docker-compose.yml — OBLIGATORIOS
⚠️ **Estos archivos son MANDATORIOS independientemente del plan de ítems. OpenCode DEBE crearlos.**

**Para cada servicio del proyecto (backend, frontend, workers):**
- Crea `<servicio>/Dockerfile` con `WORKDIR /app` (NUNCA rutas absolutas con UUID)
- El `docker build` debe funcionar en cualquier máquina sin modificaciones
- Multi-stage build si aplica (builder + runner para minimizar imagen final)

**docker-compose.yml en la raíz del proyecto (SIEMPRE crear o actualizar):**
- Un servicio por cada componente del sistema (backend, frontend, db, redis, etc.)
- `build: context: ./<servicio>` apuntando al directorio con su Dockerfile
- Puertos del host: SIEMPRE en el rango **21000–65000** (§3.3)
- Variables de entorno via `env_file` o `environment:` (nunca hardcodeadas)
- Dependencias entre servicios via `depends_on`
- Volumen para la base de datos si aplica

## §3.2 Base de Datos — Auto-Init Obligatorio
Si el proyecto usa base de datos relacional (PostgreSQL, MySQL, SQLite, MariaDB, etc.),
el backend DEBE ejecutar esta secuencia automáticamente al arrancar el contenedor:

1. **Esperar a que la DB esté lista** — retry loop o wait-for-it, nunca asumir que está disponible
2. **Correr migraciones** — `alembic upgrade head` / `prisma migrate deploy` / `knex migrate:latest` / etc.
3. **Seed de datos de ejemplo** — solo si la tabla principal está vacía (idempotente, nunca duplica al reiniciar)
   - Insertar **3–5 registros realistas** por entidad principal
   - El seed usa los mismos modelos/schemas del proyecto — nunca SQL crudo hardcodeado
   - Patrón Python: `if db.query(Model).count() == 0: db.add_all([...]); db.commit()`
   - Patrón Node: `const count = await prisma.model.count(); if (count === 0) { await prisma.model.createMany({...}) }`

Resultado: después de `./run.sh` la app tiene datos de ejemplo listos, sin pasos manuales.

## §3.3 Puertos de Servicio
- Rango obligatorio para **todos** los puertos del host en docker-compose.yml: **21000–65000**.
- Aplica a TODOS los servicios: backends, frontends Y bases de datos / infraestructura.
- El puerto interno del contenedor se mantiene en el default de la tecnología:
  | Tecnología | Puerto interno | Ejemplo host mapping |
  |-----------|---------------|----------------------|
  | PostgreSQL | 5432 | `'25432:5432'` |
  | MySQL      | 3306 | `'23306:3306'` |
  | Redis      | 6379 | `'26379:6379'` |
  | MongoDB    | 27017 | `'37017:27017'` |
  | Backend API | (PORT TABLE §1.1) | `'23001:23001'` |
- NUNCA exponer 3000, 5000, 5432, 6379, 8000, 8080, 8443 en el lado del host.
- El Tech Lead remapeará automáticamente cualquier puerto fuera del rango 21000–65000.

## §3.4 Frontend con Vite / React / Vue
- `index.html` en la RAÍZ del proyecto (mismo nivel que `package.json` y `vite.config.js`)
- NUNCA solo en `public/` — Vite requiere el entry point en la raíz
- Entry point: `<script type='module' src='/src/main.jsx'></script>`

## §3.5 Variables de Entorno
- Vite: `import.meta.env.VITE_NOMBRE` con fallback → `|| 'http://localhost:PUERTO'` (PUERTO del PORT TABLE §1.1)
- Nunca hardcodear URLs, tokens ni secrets en código fuente

## §3.6 Criterios de Finalización
- Todos los archivos listados en §2 deben existir en disco
- Código completo y funcional — sin TODOs ni stubs
- Tests corriendo y pasando antes del commit final
- `git add -A && git commit -m 'feat: implement project'`