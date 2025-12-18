# OnePets – Infrastructure Setup

## 1. Overview

Esta sección documenta la **infraestructura base** del proyecto OnePets para el MVP.

**Objetivo:** tener un stack mínimo pero sólido para:
- Autenticación de usuarios
- Persistencia de datos (dueños, mascotas, vacunas, citas)
- Despliegue del frontend
- Integración futura con pruebas automatizadas y observabilidad

## 2. Stack de Infraestructura

### 2.1. Base de Datos + Auth

- **Proveedor:** Supabase (PostgreSQL + Auth + Storage)
- **Proyecto:** `onepets-mvp`
- **Usos principales:**
  - Autenticación por email/password (Supabase Auth)
  - Tablas principales: `users`, `profiles`, `pets`, `appointments`, `vaccinations`
  - Policies de Row Level Security (RLS) por `user_id`

### 2.2. Hosting Frontend

- **Proveedor:** Vercel
- **Aplicación:** `onepets-web`
- **Tecnología:** Next.js (App Router)
- **Conexión a Supabase:**
  - Variables de entorno configuradas en Vercel (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
  - Uso de SDK oficial de Supabase en frontend y en Route Handlers (server components)

### 2.3. Entornos

| Entorno   | URL Frontend                        | Supabase Project             | Comentario                          |
|----------|--------------------------------------|------------------------------|-------------------------------------|
| local    | http://localhost:3000               | `onepets-mvp` (misma DB)     | Desarrollo local                    |
| staging  | https://staging.onepets.vercel.app  | `onepets-mvp-staging`        | Pruebas internas / QA              |
| prod     | https://onepets.vercel.app          | `onepets-mvp-prod`           | Producción                          |

> Nota: para el MVP se puede usar **un solo proyecto de Supabase** con schemas separados o solo entornos `local + prod`. Staging se añadirá cuando el flujo de CI/CD esté definido.

---

## 3. Variables de Entorno

### 3.1. Variables mínimas

Archivo `.env.local` (no commitear):

```bash
NEXT_PUBLIC_SUPABASE_URL="https://<your-project>.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="<anon-key>"

SUPABASE_SERVICE_ROLE_KEY="<service-role-key>"
SUPABASE_JWT_SECRET="<jwt-secret>"

NEXTAUTH_SECRET="<random-generated-secret>"
NEXTAUTH_URL="http://localhost:3000"
