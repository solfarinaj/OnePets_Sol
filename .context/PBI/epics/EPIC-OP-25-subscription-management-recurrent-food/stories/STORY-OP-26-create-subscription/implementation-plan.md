# Implementation Plan: STORY-OP-26 - Create Subscription

## Overview

Añadir la capacidad de suscribirse a un producto desde su página de detalle o catálogo.

**Acceptance Criteria a cumplir:**

- Opción "Subscribe & Save" (opcional el save) visible en productos elegibles.
- Selector de frecuencia (2, 4, 6, 8 semanas).
- Creación de registro con `next_delivery_date` automático.

---

## Implementation Steps

### **Step 1: Database Setup**

**Task:** Tabla `subscriptions`.

**SQL:**
```sql
create table public.subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  product_id uuid references public.products(id) not null,
  frequency_weeks int not null,
  status text default 'active',
  next_delivery_date date not null,
  created_at timestamptz default now()
);
alter table public.subscriptions enable row level security;
create policy "Users crud own subs" on subscriptions for all using (auth.uid() = user_id);
```

**Estimated time:** 1h

---

### **Step 2: Create Action**

**Task:** `createSubscription` Server Action.

**Details:**
- Validar `product.is_subscription_eligible`.
- Calcular `next_date = today + frequency`.

**Estimated time:** 2h

---

### **Step 3: Frontend UI Integration**

**Task:** `SubscriptionToggle` component.

**Details:**
- Integrar en la página de producto.
- Toggle entre "One-time" y "Subscription".

**Estimated time:** 3h

---

## Estimated Effort

**Total:** 6h
**Story points:** 3
