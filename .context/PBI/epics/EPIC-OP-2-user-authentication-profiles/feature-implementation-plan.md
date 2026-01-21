# Feature Implementation Plan: EPIC-OP-2 - User Accounts & Pet Profiles

## Overview

Esta feature implementa el núcleo de identidad y perfilado del usuario. Permite el registro, autenticación segura y gestión de datos personales, direcciones y perfiles de mascotas. Es el cimiento sobre el cual se construyen las funcionalidades de comercio y personalización.

**Alcance:**

- STORY-OP-14: User Signup with Email (Formerly OP-3)
- STORY-OP-4: User Login and Logout
- STORY-OP-5: Pet Profile Management
- STORY-OP-6: Profile and Address Update

**Stack técnico:**

- Frontend: Next.js 15 (App Router), React, Tailwind CSS
- Backend: Next.js Server Actions / API Routes
- Database: Supabase (PostgreSQL)
- Auth: Supabase Auth (SSR)
- Deployment: Vercel
- Testing: Playwright

---

## Technical Decisions

### Decision 1: Authentication State Management

**Options considered:**
- A) Client-side only (SPA style)
- B) Server-side only (Cookies)
- C) Hybrid (Next.js Middleware + Supabase SSR Helpers)

**Chosen:** C) Hybrid (Supabase SSR)

**Reasoning:**
- ✅ Seguridad robusta con cookies HttpOnly.
- ✅ Soporte nativo para Server Components (RSC).
- ✅ Middleware permite protección de rutas eficiente.
- ❌ Trade-off: Mayor complejidad inicial de configuración que client-only.

**Implementation notes:**
- Usar `@supabase/ssr` package.
- Middleware para refrescar sesiones y proteger rutas `/profile/*`.

### Decision 2: Form Handling & Validation

**Options considered:**
- A) React Hook Form + Zod
- B) Formik + Yup
- C) HTML Forms nativos + Server Actions

**Chosen:** A) React Hook Form + Zod

**Reasoning:**
- ✅ Zod se integra perfecto con TypeScript y validación de esquema de DB.
- ✅ React Hook Form es el estándar en Shadcn UI (`<Form>`).
- ✅ Performance optimizada (re-renders mínimos).

**Implementation notes:**
- Definir esquemas Zod en `lib/schemas/auth.ts` y `lib/schemas/profile.ts`.

---

## Types & Type Safety

**Identificar entidades principales:**
- `users` (Auth schema - handled by Supabase types)
- `public.profiles`
- `public.pets`
- `public.addresses`

**Estrategia:**
1.  Generar tipos con `supabase gen types` (Ya hecho en Fase 3).
2.  Crear `lib/types.ts` exportando aliases limpios.

```typescript
// lib/types.ts
import { Database } from './supabase';

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Pet = Database['public']['Tables']['pets']['Row'];
export type Address = Database['public']['Tables']['addresses']['Row'];
```

---

## UI/UX Design Strategy

### Componentes compartidos (Shadcn UI):
- `Form` (react-hook-form wrapper)
- `Input`
- `Button`
- `Card` (para listar mascotas/direcciones)
- `Toast` (feedback de acciones)
- `DropdownMenu` (User menu)

### Componentes Custom:
- `AuthLayout`: Wrapper para login/register con branding.
- `PetCard`: Tarjeta específica con datos de mascota (Raza, Edad).
- `AddressCard`: Tarjeta con formato de dirección y badge "Pilot Zone".

### Personalidad UI/UX:
- **Estilo:** Clean & Friendly (OnePets branding).
- **Feedback:** Toast notifications para éxito/error.
- **Loading:** Skeletons para carga de datos de perfil.

---

## Content Writing Strategy

**Vocabulario del dominio:**
- "Dueño" / "Pet Owner"
- "Mascota" / "Pet" (No "Item" o "Entity")
- "Zona Piloto" / "Pilot Zone"
- "Registrar" / "Sign Up"

**Tono:**
- Cercano, confiable y claro.
- Mensajes de error constructivos ("La contraseña necesita ser más segura" vs "Error 400").

---

## Shared Dependencies

1.  **@supabase/ssr**: Manejo de cookies y auth en Next.js.
2.  **react-hook-form**: Manejo de formularios.
3.  **zod**: Validación de esquemas.
4.  **lucide-react**: Iconos (User, Dog, MapPin).

**Environment variables:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## Architecture Notes

### Folder Structure

```
/app
  /(auth)
    /login
    /register
  /(protected)
    /profile
      /page.tsx (Info personal)
      /pets
        /page.tsx (Lista)
        /new
      /addresses
/components
  /auth
    - login-form.tsx
    - signup-form.tsx
  /profile
    - pet-card.tsx
    - address-card.tsx
/lib
  /actions
    - auth.ts (Server Actions)
    - profile.ts
```

---

## Implementation Order

1.  **STORY-OP-14 (Signup)**: Base de usuarios. Sin esto no hay nada.
2.  **STORY-OP-4 (Login/Logout)**: Acceso recurrente.
3.  **STORY-OP-6 (Profile/Address)**: Datos básicos necesarios para validaciones de zona.
4.  **STORY-OP-5 (Pet Profile)**: Capa de personalización adicional.

---

## Risks & Mitigations

### Risk 1: RLS Misconfiguration
- **Impact:** High (Fuga de datos personales).
- **Mitigation:** Testear acceso cruzado (Usuario A intentando leer ID de Usuario B) en cada endpoint.

### Risk 2: Pilot Zone Logic Changes
- **Impact:** Medium (Direcciones mal clasificadas).
- **Mitigation:** Abstraer lógica de zona en un servicio `PilotZoneService` fácil de actualizar.

---

## Success Criteria

- [ ] Auth flow completo (Register -> Login -> Logout) funcionando.
- [ ] Datos de perfil persistentes y protegidos por RLS.
- [ ] CRUD de mascotas funcional.
- [ ] Validaciones de zona piloto correctas en direcciones.
- [ ] 100% Type safety con tipos generados.
- [ ] Componentes Shadcn implementados correctamente.
