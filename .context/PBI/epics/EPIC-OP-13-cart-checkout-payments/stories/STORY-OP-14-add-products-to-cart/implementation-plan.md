# Implementation Plan: STORY-OP-14 - Add Products to Cart

## Overview

Implementar la funcionalidad para añadir productos al carrito, gestionando cantidades y validando stock en tiempo real.

**Acceptance Criteria a cumplir:**

- Añadir producto nuevo crea registro en `cart_items`.
- Añadir producto existente incrementa la cantidad.
- Validar stock disponible antes de añadir.
- Impedir cantidades negativas o cero.

---

## Technical Approach

**Chosen approach:** Supabase RPC o Server Action con lógica de "Upsert" y chequeo de stock atómico.

**Why this approach:**

- ✅ **Atomicidad:** Evita inconsistencias de stock si se llama rápidamente.
- ✅ **Single Roundtrip:** Un solo llamado para validar y guardar.

---

## Implementation Steps

### **Step 1: Database Setup**

**Task:** Crear tablas de carrito.

**SQL Reference:**
```sql
create table public.carts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade unique not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.cart_items (
  id uuid default gen_random_uuid() primary key,
  cart_id uuid references public.carts(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete cascade not null,
  quantity int check (quantity > 0) not null,
  created_at timestamptz default now(),
  unique(cart_id, product_id)
);

alter table public.carts enable row level security;
alter table public.cart_items enable row level security;
-- Políticas RLS (auth.uid() = carts.user_id)
```

**Estimated time:** 1h

---

### **Step 2: Server Action Logic**

**Task:** Implementar `addToCart`.

**File:** `lib/actions/cart.ts`

**Logic:**
1. Obtener o crear `cart` para el usuario actual.
2. Consultar stock del producto.
3. Si `requested_qty > stock`, retornar error.
4. `UPSERT` en `cart_items`: `quantity = quantity + new_qty`.

**Estimated time:** 2h

---

### **Step 3: Frontend Component**

**Task:** Conectar `AddToCartButton`.

**File:** `components/catalog/add-to-cart-button.tsx`

**Details:**
- Manejar estado `isPending`.
- Mostrar Toast de éxito/error.

**Estimated time:** 1h

---

## Estimated Effort

**Total:** 4h
**Story points:** 3
