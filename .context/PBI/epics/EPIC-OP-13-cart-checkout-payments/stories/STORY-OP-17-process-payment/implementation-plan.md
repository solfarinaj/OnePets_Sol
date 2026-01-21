# Implementation Plan: STORY-OP-17 - Process Payment

## Overview

Integración con pasarela de pago y creación formal de la orden tras el éxito de la transacción.

**Acceptance Criteria a cumplir:**

- Integración con iFrame/SDK de pagos segura.
- Creación de Orden en estado "PAID" tras éxito.
- Manejo de pagos rechazados con mensaje claro.
- Limpieza automática del carrito post-pago.

---

## Technical Approach

**Chosen approach:** SDK de Pasarela en Frontend para tokenización + Server Action para procesar el cargo y crear la orden.

---

## Implementation Steps

### **Step 1: Database Setup (Orders)**

**Task:** Crear tablas de órdenes.

**SQL Reference:**
```sql
create table public.orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  total_amount decimal(10,2) not null,
  status text default 'pending',
  delivery_method text not null,
  address_id uuid references public.addresses(id),
  payment_id text,
  created_at timestamptz default now()
);

create table public.order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  product_id uuid references public.products(id) not null,
  quantity int not null,
  price_at_purchase decimal(10,2) not null
);
```

**Estimated time:** 1h

---

### **Step 2: Integration Logic**

**Task:** Crear `createOrder` action.

**File:** `lib/actions/orders.ts`

**Logic:**
1. Validar pago con el Gateway.
2. Iniciar transacción en DB.
3. Crear `order` y `order_items`.
4. Decrementar stock en `products`.
5. Borrar `cart_items`.

**Estimated time:** 4h

---

### **Step 3: Frontend Payment Form**

**Task:** Pantalla `/checkout/payment`.

**Details:**
- Cargar SDK de pasarela.
- Manejar el submit y la respuesta del token.

**Estimated time:** 3h

---

## Estimated Effort

**Total:** 8h
**Story points:** 5
