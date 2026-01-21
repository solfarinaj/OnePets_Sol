# Implementation Plan: STORY-OP-33 - Submit Support Request

## Overview

Formulario básico para que los clientes reporten problemas con sus pedidos.

**Acceptance Criteria a cumplir:**

- Formulario con Categoría y Mensaje.
- Asociación opcional a una Orden.
- Creación de ticket en base de datos.

---

## Implementation Steps

### **Step 1: Database Setup**

**Task:** Tabla `tickets`.

**SQL:**
```sql
create table public.tickets (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  order_id uuid references public.orders(id),
  category text not null,
  message text not null,
  status text default 'open',
  created_at timestamptz default now()
);
alter table public.tickets enable row level security;
create policy "Users manage own tickets" on tickets for all using (auth.uid() = user_id);
```

**Estimated time:** 1h

---

### **Step 2: Frontend Form**

**Task:** Pantalla `/support`.

**Details:**
- Zod Schema para validación de mensaje.
- Dropdown de órdenes del usuario para fácil referencia.

**Estimated time:** 3h

---

### **Step 3: Server Action**

**Task:** `createTicket`.

**Estimated time:** 1h

---

## Estimated Effort

**Total:** 5h
**Story points:** 3
