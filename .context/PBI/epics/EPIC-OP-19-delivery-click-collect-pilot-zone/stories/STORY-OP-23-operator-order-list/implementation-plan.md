# Implementation Plan: STORY-OP-23 - Operator View of Pending Orders

## Overview

Dashboard interno para el staff de OnePets para visualizar y priorizar la preparación de pedidos.

**Acceptance Criteria a cumplir:**

- Lista consolidada de pedidos pendientes (no entregados).
- Filtros por estado.
- Datos de contacto del cliente y ETA visibles.
- Protección estricta contra acceso de clientes normales.

---

## Technical Approach

**Chosen approach:** `Data-Table` de Shadcn + Supabase Realtime Subscription.

---

## Implementation Steps

### **Step 1: Admin API**

**Task:** Crear endpoint `getAdminOrders`.

**File:** `lib/data/admin.ts`

**Details:**
- Query que une `orders`, `profiles` y `order_items`.
- Middleware check: `if (profile.role !== 'operator') return 403`.

**Estimated time:** 2h

---

### **Step 2: Realtime Setup**

**Task:** Suscripción a cambios en `orders`.

**Details:**
- Usar `supabase.channel('orders').on('postgres_changes', ...)` para refrescar la lista sin recargar página.

**Estimated time:** 2h

---

### **Step 3: Admin Dashboard UI**

**Task:** Página `/admin/orders`.

**Details:**
- Tabla con estados coloreados (Pills).
- Acceso rápido a detalle de orden.

**Estimated time:** 4h

---

## Estimated Effort

**Total:** 8h (1 day)
**Story points:** 5
