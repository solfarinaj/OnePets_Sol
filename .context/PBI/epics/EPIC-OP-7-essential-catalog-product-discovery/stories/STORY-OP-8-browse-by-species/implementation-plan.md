# Implementation Plan: STORY-OP-8 - Browse by Species

## Overview

Permitir filtrar productos por especie (Perro/Gato) mediante parámetros en la URL.

**Acceptance Criteria:**
- Filtrar por Perro muestra solo productos `species='dog'`.
- Filtrar por Gato muestra solo productos `species='cat'`.
- URL refleja el estado (`?species=dog`).

---

## Technical Approach

**Chosen approach:** Server Component con `searchParams`.

**Why:**
- Permite renderizado inicial filtrado (SEO).
- No requiere estado complejo en cliente.

---

## UI/UX Design

### Componentes:
- `SpeciesFilter`: Tabs o botones toggle.
- `ProductGrid`: Lista de `ProductCard`.

### Wireframes:

```
┌──────────────────────────────────────┐
│  Catalog                             │
│  [ All ] [ Dog ] [ Cat ]             │
│                                      │
│  ┌─────┐  ┌─────┐  ┌─────┐           │
│  │ P1  │  │ P2  │  │ P3  │           │
│  └─────┘  └─────┘  └─────┘           │
└──────────────────────────────────────┘
```

---

## Implementation Steps

### **Step 1: Database Setup**

**Task:** Asegurar tabla `products` y seed data.

**SQL:**
```sql
create table public.products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  price decimal(10,2) not null,
  species text check (species in ('dog', 'cat', 'all')) not null,
  category text not null,
  image_url text,
  stock_quantity int default 0,
  is_subscription_eligible boolean default false,
  created_at timestamptz default now()
);
alter table public.products enable row level security;
create policy "Public read products" on products for select using (true);
```

**Estimated time:** 1h

### **Step 2: Server Actions / Fetcher**

**Task:** `getProducts(filters)`.

**File:** `lib/data/products.ts`

**Details:**
- Función `getProducts` que acepta `species`.
- Construye query Supabase dinámico.

**Estimated time:** 1h

### **Step 3: Frontend UI**

**Task:** Página `/products` y Filtro.

**File:** `app/products/page.tsx`

**Details:**
- Leer `searchParams`.
- Llamar `getProducts`.
- Componente `SpeciesFilter` usa `useSearchParams` y `replace` de `next/navigation`.

**Estimated time:** 3h

---

## Estimated Effort

**Total:** 5h
**Story Points:** 3
