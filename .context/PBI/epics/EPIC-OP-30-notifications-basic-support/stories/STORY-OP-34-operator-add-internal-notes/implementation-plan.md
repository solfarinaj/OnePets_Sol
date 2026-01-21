# Implementation Plan: STORY-OP-34 - Operator Add Internal Notes

## Overview

Permitir a los operadores añadir notas privadas a las órdenes para seguimiento interno.

**Acceptance Criteria a cumplir:**

- Campo de texto en la vista administrativa.
- Registro de nota con autor y fecha.
- Notas invisibles para el cliente.

---

## Implementation Steps

### **Step 1: Database Setup**

**Task:** Tabla `order_notes`.

**SQL:**
```sql
create table public.order_notes (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  author_id uuid references public.profiles(id) not null,
  content text not null,
  created_at timestamptz default now()
);
alter table public.order_notes enable row level security;
-- Política: Solo operadores ven y crean notas.
```

**Estimated time:** 1h

---

### **Step 2: Admin UI**

**Task:** Sección de notas en `/admin/orders/[id]`.

**Estimated time:** 2h

---

### **Step 3: Server Action**

**Task:** `addInternalNote`.

**Estimated time:** 1h

---

## Estimated Effort

**Total:** 4h
**Story points:** 2
