# Implementation Plan: STORY-OP-6 - Profile and Address Update

## Overview

Permitir al usuario gestionar su información personal (Nombre, Teléfono) y sus direcciones de entrega. Validar si la dirección está dentro de la zona piloto.

**Acceptance Criteria:**
- Actualizar perfil básico.
- CRUD de direcciones.
- Cálculo automático de `within_pilot_zone`.
- Validaciones de formato.

---

## Technical Approach

**Chosen approach:** `PilotZoneService` para lógica de validación + Server Actions.

**Why:**
- Centraliza la lógica de "Zona Piloto" (puede cambiar de lista de Zips a Polígonos).
- Backend validation es obligatoria para seguridad.

---

## UI/UX Design

### Componentes:
- `ProfileForm`: Nombre, Teléfono.
- `AddressList`: Lista de direcciones con badge "En Zona".
- `AddressForm`: Calle, Ciudad, Zip.

### Wireframes:

**Profile Page:**
```
┌──────────────────────────────────────┐
│  My Profile                          │
│  [ Name ] [ Phone ] [ Save ]         │
│                                      │
│  Addresses            [+ Add]        │
│  ┌───────────────────────────────┐   │
│  │ 123 Main St                   │   │
│  │ [Badge: In Zone] [Edit] [Del] │   │
│  └───────────────────────────────┘   │
└──────────────────────────────────────┘
```

---

## Implementation Steps

### **Step 1: Database & RLS**

**Task:** Tabla `addresses` y update `profiles`.

**SQL:**
```sql
alter table public.profiles add column phone text;
create table public.addresses (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  address_line1 text not null,
  city text not null,
  zip_code text not null,
  within_pilot_zone boolean default false,
  created_at timestamptz default now()
);
alter table public.addresses enable row level security;
create policy "Users manage own addresses" on addresses for all using (auth.uid() = user_id);
```

**Estimated time:** 1h

### **Step 2: Business Logic (Pilot Zone)**

**Task:** Servicio de validación.

**File:** `lib/services/pilot-zone.ts`

**Details:**
- `isZipInZone(zip: string): boolean`.
- Lista hardcoded de Zips para MVP.

**Estimated time:** 1h

### **Step 3: Server Actions**

**Task:** `updateProfile`, `addAddress`, `deleteAddress`.

**File:** `lib/actions/profile.ts`

**Details:**
- `addAddress` llama a `PilotZoneService` antes de insertar.

**Estimated time:** 2h

### **Step 4: Frontend UI**

**Task:** Página `/profile`.

**File:** `app/(protected)/profile/page.tsx`

**Details:**
- Tabs para "Datos Personales" y "Direcciones".
- Formularios interactivos.

**Estimated time:** 3h

---

## Estimated Effort

**Total:** 7h
**Story Points:** 3
