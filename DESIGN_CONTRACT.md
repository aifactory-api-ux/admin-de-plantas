# Frontend Development Plan

## ⚠️ FRONTEND-ONLY PHASE
The **backend is already fully implemented and tested**.
Your ONLY task is to implement the frontend based on the approved UI/UX design contract.
- DO NOT modify any backend files (Python, Go, Node.js service files)
- DO NOT recreate backend logic, routes, or models
- ONLY create frontend files: pages, components, hooks, styles, config

## 🔗 API INTEGRATION — READ BEFORE IMPLEMENTING ANY PAGE
The backend exposes REST endpoints defined in `api_contract.yaml` (available in the workspace).
**ALL data must come from the backend API — no mock data, no hardcoded arrays, no placeholder values.**

### Required setup
1. Create `frontend/.env.example` with `NEXT_PUBLIC_API_URL=http://localhost:8000`
   (use `VITE_API_URL` if the stack is Vite/React without Next.js).
2. Create `frontend/src/lib/api.ts` (or `frontend/src/services/api.ts`) as the HTTP base client:
   - Reads the base URL from the environment variable
   - Attaches `Authorization: Bearer <token>` if the user is authenticated
   - Throws on HTTP 4xx/5xx so callers can handle errors
3. For **each endpoint group** in `api_contract.yaml`: create one hook file under
   `frontend/src/hooks/use<Resource>.ts` (e.g., `useProducts.ts`, `useOrders.ts`, `useAuth.ts`).
4. Pages and components **must call these hooks** — never call `fetch`/`axios` directly from JSX.

### Authentication
- If the contract has `/auth/login` or `/token` endpoints: store the JWT in `localStorage` or
  an httpOnly cookie and send it as `Authorization: Bearer <token>` on every protected request.
- Implement a React context or Zustand store for the auth state (user, token, isAuthenticated).

### Error handling
- Every data-fetching hook must expose a loading state and an error state.
- Pages must render a visible error message when an API call fails — no silent catches.

### API Contract summary (from api_contract.yaml)
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

## Visual Direction
Interfaz limpia y funcional con paleta de verdes y neutros que refleje el entorno agrícola, tipografía sans-serif legible, iconografía simple y plana, y énfasis en la usabilidad para tablets en campo.

## Figma Source
File: https://www.figma.com/design/CuYdG7rOg6blcpNrAPyDp9

## Design Tokens
```json
{
  "colors": {
    "primary": "#2E7D32",
    "primary_light": "#4CAF50",
    "primary_dark": "#1B5E20",
    "secondary": "#FF8F00",
    "secondary_light": "#FFB300",
    "background": "#F5F5F5",
    "surface": "#FFFFFF",
    "text_primary": "#212121",
    "text_secondary": "#757575",
    "text_on_primary": "#FFFFFF",
    "error": "#D32F2F",
    "success": "#388E3C",
    "warning": "#F57C00"
  },
  "typography": {
    "font_family": "Inter, sans-serif",
    "headings": {
      "h1": {
        "size": 24,
        "weight": 700,
        "line_height": 1.3
      },
      "h2": {
        "size": 20,
        "weight": 600,
        "line_height": 1.4
      },
      "h3": {
        "size": 18,
        "weight": 600,
        "line_height": 1.4
      }
    },
    "body": {
      "body1": {
        "size": 16,
        "weight": 400,
        "line_height": 1.5
      },
      "body2": {
        "size": 14,
        "weight": 400,
        "line_height": 1.5
      }
    },
    "caption": {
      "size": 12,
      "weight": 400,
      "line_height": 1.4
    },
    "button": {
      "size": 16,
      "weight": 600,
      "line_height": 1.2
    }
  },
  "spacing": {
    "xs": 4,
    "sm": 8,
    "md": 16,
    "lg": 24,
    "xl": 32,
    "xxl": 48
  },
  "border_radius": {
    "sm": 4,
    "md": 8,
    "lg": 12,
    "full": 9999
  },
  "shadows": {
    "sm": "0 1px 3px rgba(0,0,0,0.12)",
    "md": "0 4px 6px rgba(0,0,0,0.1)",
    "lg": "0 10px 15px rgba(0,0,0,0.1)"
  },
  "icon_style": "Line icons, 24x24, stroke width 2, rounded caps",
  "image_style": "Fotograf\u00edas reales de plantas con iluminaci\u00f3n natural, recortes limpios",
  "motion": "Transiciones suaves de 200-300ms, easing ease-in-out"
}
```

## Base Components (use exact names from Figma)
- **Primary Navigation**: Barra de navegación inferior fija con iconos y etiquetas para las secciones principales: Dashboard, Registro, Monitoreo, Reportes, Usuarios (admin).
- **CTA Button**: Botón primario con fondo verde, texto blanco, esquinas redondeadas (8px), padding 12px 24px, sombra suave. Estados: normal, hover, pressed, disabled.
- **Card**: Contenedor rectangular con fondo blanco, borde redondeado (8px), sombra media, padding 16px. Puede contener imagen, título, subtítulo, etiquetas de estado y acciones.
- **Input Field**: Campo de texto con etiqueta flotante, borde de 1px, radio 4px, padding 12px, color de borde gris claro, foco verde primario.
- **Status Badge**: Etiqueta pequeña con color de fondo según estado (verde para saludable, amarillo para atención, rojo para problema), texto blanco, radio 12px, padding 4px 8px.
- **Data Table**: Tabla con filas alternadas, cabecera fija, celdas con padding 12px, ordenable por columnas, con paginación.
- **Modal**: Ventana emergente centrada con overlay semitransparente, fondo blanco, radio 12px, padding 24px, botón de cerrar.

## Figma Frames — Pages to Implement
- **Login**: 
- **Dashboard**: 
- **Registro de Planta**: 
- **Detalle de Planta**: 

## Implementation Items

### Item 31: Design Tokens Implementation
**Goal:** Implement all design tokens as per UI/UX contract in a single file.
**Wave:** 2
**Files:**
  - `frontend/src/styles/tokens.ts` (create): Contains color palette, typography, spacing, border radius, and shadows as exported constants.
**Dependencies:** None
**Validation:** All tokens match the Figma contract and are importable in other files.

### Item 32: Primary Navigation Component
**Goal:** Implement the "Primary Navigation" component from Figma.
**Wave:** 3
**Files:**
  - `frontend/src/components/ui/PrimaryNavigation.tsx` (create): Fixed bottom navigation bar with icons and labels for Dashboard, Registro, Monitoreo, Reportes, Usuarios.
**Dependencies:** Item 31
**Validation:** Matches Figma layout, icons, and navigation logic; responsive for tablets.

### Item 33: CTA Button Component
**Goal:** Implement the "CTA Button" component from Figma.
**Wave:** 3
**Files:**
  - `frontend/src/components/ui/CTAButton.tsx` (create): Primary action button with all states (normal, hover, pressed, disabled).
**Dependencies:** Item 31
**Validation:** Visual states and interaction match Figma; uses tokens for color, radius, shadow.

### Item 34: Card Component
**Goal:** Implement the "Card" component from Figma.
**Wave:** 3
**Files:**
  - `frontend/src/components/ui/Card.tsx` (create): Rectangular container with optional image, title, subtitle, status badges, and actions.
**Dependencies:** Item 31
**Validation:** Visual style, padding, and shadow match Figma; flexible content slots.

### Item 35: Input Field Component
**Goal:** Implement the "Input Field" component from Figma.
**Wave:** 3
**Files:**
  - `frontend/src/components/ui/InputField.tsx` (create): Text input with floating label, focus/blur states, and error handling.
**Dependencies:** Item 31
**Validation:** Label floats on focus/input, border and focus color match tokens, error state visible.

### Item 36: Status Badge Component
**Goal:** Implement the "Status Badge" component from Figma.
**Wave:** 3
**Files:**
  - `frontend/src/components/ui/StatusBadge.tsx` (create): Small badge with color and text based on status (saludable, atención, problema).
**Dependencies:** Item 31
**Validation:** Badge color and text match status and Figma; uses tokens for color and radius.

### Item 37: Data Table Component
**Goal:** Implement the "Data Table" component from Figma.
**Wave:** 3
**Files:**
  - `frontend/src/components/ui/DataTable.tsx` (create): Table with sortable columns, fixed header, alternating rows, and pagination.
**Dependencies:** Item 31
**Validation:** Table matches Figma style; columns sortable; pagination functional.

### Item 38: Modal Component
**Goal:** Implement the "Modal" component from Figma.
**Wave:** 3
**Files:**
  - `frontend/src/components/ui/Modal.tsx` (create): Centered overlay modal with close button, padding, and rounded corners.
**Dependencies:** Item 31
**Validation:** Modal overlays content, matches Figma style, closes on button or overlay click.

### Item 39: API Hooks and Services
**Goal:** Implement all useXxx hooks for API endpoints as per SPEC.md.
**Wave:** 2
**Files:**
  - `frontend/src/hooks/useAuth.ts` (create): Auth API hooks (login, register, me)
  - `frontend/src/hooks/usePlants.ts` (create): Plant CRUD API hooks
  - `frontend/src/hooks/useNotifications.ts` (create): Notification API hooks
  - `frontend/src/hooks/useReports.ts` (create): Report API hooks
**Dependencies:** None
**Validation:** Each hook provides typed methods for API endpoints, handles loading/error states, and uses correct DTOs.

### Item 40: Login Page
**Goal:** Implement the "Login" page from Figma as a standalone page.
**Wave:** 2
**Files:**
  - `frontend/src/pages/Login.tsx` (create): Login form using Input Field and CTA Button components, handles authentication.
**Dependencies:** Items 33, 35, 39
**Validation:** Page matches Figma layout; login flow works with backend; error states visible.

### Item 41: Dashboard Page
**Goal:** Implement the "Dashboard" page from Figma as a standalone page.
**Wave:** 2
**Files:**
  - `frontend/src/pages/Dashboard.tsx` (create): Dashboard layout using Card, Data Table, Status Badge, and Primary Navigation components.
**Dependencies:** Items 32, 34, 36, 37, 39
**Validation:** Page matches Figma; plant data loads from API; navigation functional.

### Item 42: Registro de Planta Page
**Goal:** Implement the "Registro de Planta" page from Figma as a standalone page.
**Wave:** 2
**Files:**
  - `frontend/src/pages/RegistroDePlanta.tsx` (create): Plant registration form using Input Field, CTA Button, Modal, and Primary Navigation components.
**Dependencies:** Items 32, 33, 35, 38, 39
**Validation:** Page matches Figma; form submits to API; success/error modals display.

### Item 43: Detalle de Planta Page
**Goal:** Implement the "Detalle de Planta" page from Figma as a standalone page.
**Wave:** 2
**Files:**
  - `frontend/src/pages/DetalleDePlanta.tsx` (create): Plant detail view using Card, Status Badge, Data Table, Modal, and Primary Navigation components.
**Dependencies:** Items 32, 34, 36, 37, 38, 39
**Validation:** Page matches Figma; plant details load from API; edit/delete actions functional.
