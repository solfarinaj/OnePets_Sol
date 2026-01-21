# Implementation Plan: STORY-OP-5 - Pet Profile Management

## Overview

Implementar CRUD completo para perfiles de mascotas. Permite a los usuarios registrar sus mascotas para personalizar la experiencia.

**Acceptance Criteria:**
- Crear mascota con validación de tipos (Perro/Gato).
- Listar mascotas del usuario.
- Editar/Eliminar mascota.
- Seguridad RLS (Solo ver propias mascotas).

---

## Technical Approach

**Chosen approach:** Server Actions para mutaciones + Server Components para fetching.

**Why:**
- Data fetching directo en `page.tsx` es más eficiente (sin useEffect).
- Server Actions manejan la revalidación de caché automáticamente (`revalidatePath`).

---

## UI/UX Design

### Componentes:
- `PetList`: Grid de `PetCard`.
- `PetCard`: Muestra foto (placeholder), nombre, raza.
- `PetForm`: Dialog/Modal o Página para añadir/editar.
- `EmptyPets`: Estado vacío con ilustración y CTA.

### Wireframes:

**My Pets Page:**
```
┌──────────────────────────────────────┐
│  My Pets              [+ Add Pet]    │
│                                      │
│  ┌─────────┐  ┌─────────┐            │
│  │ Rex (D) │  │ Luna (C)│            │
│  │ 5 years │  │ 2 years │            │
│  │ [Edit]  │  │ [Edit]  │            │
│  └─────────┘  └─────────┘            │
│                                      │
└──────────────────────────────────────┘
```

---

## Implementation Steps

### **Step 1: Database & RLS**

**Task:** Crear tabla `pets` y políticas.

**SQL:**
```sql
create table public.pets (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  name text not null,
  species text check (species in ('dog', 'cat')) not null,
  size text check (size in ('small', 'medium', 'large')) not null,
  age int,
  created_at timestamptz default now()
);
alter table public.pets enable row level security;
create policy "Users can crud own pets" on pets for all using (auth.uid() = user_id);
```

**Testing:** Supabase dashboard RLS check.

**Estimated time:** 1h

### **Step 2: Server Actions (CRUD)**

**Task:** `createPet`, `updatePet`, `deletePet`.

**File:** `lib/actions/pets.ts`

**Details:**
- Validar input con Zod.
- Ejecutar query Supabase.
- `revalidatePath('/profile/pets')`.

**Estimated time:** 2h

### **Step 3: Frontend UI**

**Task:** Pagina de listado y formulario.

**File:** `app/(protected)/profile/pets/page.tsx`, `components/pets/pet-form.tsx`

**Details:**
- Fetch inicial en Server Component.
- Formulario reutilizable para Create/Edit.

**Testing:** Manual interaction.

**Estimated time:** 3h

### **Step 4: Integration Test**

**Task:** Verificar RLS y flujo.

**Details:**
- Crear mascota.
- Verificar que aparece en lista.
- Intentar acceder con otro usuario (debe fallar).

**Testing:** Playwright.

**Estimated time:** 2h

---

## Estimated Effort

**Total:** 8h
**Story Points:** 5
