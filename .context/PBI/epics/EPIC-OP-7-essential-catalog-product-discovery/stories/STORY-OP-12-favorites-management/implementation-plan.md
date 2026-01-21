# Implementation Plan: STORY-OP-12 - Favorites Management

## Overview

Permitir a usuarios marcar productos como favoritos para acceso rápido y recompra simplificada.

**Acceptance Criteria a cumplir:**

- Toggle Heart icon agrega/quita de favoritos con feedback visual instantáneo.
- Página dedicada "My Favorites" para listar productos guardados.
- Funcionalidad restringida a usuarios autenticados.
- Sincronización de estado entre catálogo, detalle y lista de favoritos.

---

## Technical Approach

**Chosen approach:** `useOptimistic` de React + Server Actions + RLS en Supabase.

**Why this approach:**

- ✅ **useOptimistic:** Proporciona feedback instantáneo al usuario (el corazón se llena/vacía antes de que la DB responda), eliminando la sensación de lag.
- ✅ **Server Actions:** Manejan la persistencia de forma segura y simplifican la revalidación de datos (`revalidatePath`).
- ✅ **RLS:** Garantiza que cada usuario solo pueda gestionar su propia lista de favoritos.

---

## UI/UX Design

### Componentes del Design System a usar:

- `Button` → `variant`: `ghost` o `outline` para el botón del corazón.
- `Card`: Para mostrar los productos en la lista de favoritos.
- `Toast`: Para notificar errores si la acción falla.

### Componentes custom a crear:

- 🆕 `FavoriteButton`
  - **Propósito:** Botón toggle con icono de corazón.
  - **Ubicación:** `components/catalog/favorite-button.tsx`
- 🆕 `FavoritesList`
  - **Propósito:** Grid específico para mostrar favoritos con opción de remover rápido.
  - **Ubicación:** `components/profile/favorites-list.tsx`

---

## Implementation Steps

### **Step 1: Database Setup**

**Task:** Crear tabla de unión y políticas RLS.

**SQL Reference:**
```sql
create table public.favorite_products (
  user_id uuid references public.profiles(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete cascade not null,
  created_at timestamptz default now(),
  primary key (user_id, product_id)
);
alter table public.favorite_products enable row level security;
create policy "Users manage own favorites" on favorite_products for all using (auth.uid() = user_id);
```

**Testing:** Verificar políticas en Supabase Dashboard.

**Estimated time:** 1h

---

### **Step 2: Server Actions**

**Task:** Crear acción `toggleFavorite`.

**File:** `lib/actions/favorites.ts`

**Details:**
- Verificar sesión del usuario.
- Consultar si existe el favorito.
- `DELETE` si existe, `INSERT` si no.
- `revalidatePath` para actualizar las vistas.

**Testing:** Unit test del service logic.

**Estimated time:** 2h

---

### **Step 3: Frontend Component (Optimistic)**

**Task:** Implementar `FavoriteButton`.

**File:** `components/catalog/favorite-button.tsx`

**Logic:**
- Recibir `initialIsFavorite`.
- Usar `useOptimistic` para el estado visual.
- Manejar el clic llamando a la Server Action.

**Testing:** Verificar toggle rápido sin bloqueos de UI.

**Estimated time:** 2h

---

### **Step 4: Favorites Page**

**Task:** Crear la página `/profile/favorites`.

**File:** `app/(protected)/profile/favorites/page.tsx`

**Details:**
- Fetch de productos favoritos del usuario.
- Renderizado usando `ProductCard` (reutilizable).

**Testing:** E2E test de flujo completo.

**Estimated time:** 2h

---

## Estimated Effort

| Step | Time |
| --- | --- |
| 1. DB Setup | 1h |
| 2. Server Actions | 2h |
| 3. UI Component | 2h |
| 4. Favorites Page | 2h |
| **Total** | **7h** |

**Story points:** 3
