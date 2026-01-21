# Implementation Plan: STORY-OP-18 - Order Confirmation

## Overview

Página de éxito final que proporciona al usuario su número de orden, resumen de compra y tiempo estimado de entrega.

**Acceptance Criteria a cumplir:**

- Mostrar número de orden único.
- Resumen de productos y totales finales.
- Mostrar ETA (Estimated Time of Arrival) calculado.
- Impedir acceso a órdenes de otros usuarios.

---

## Implementation Steps

### **Step 1: Order Details Fetcher**

**Task:** Obtener datos de la orden.

**File:** `lib/data/orders.ts`

**Details:**
- Fetch con JOIN de items y productos.
- Validar propiedad del usuario (`user_id`).

**Estimated time:** 1h

---

### **Step 2: ETA Logic**

**Task:** Calcular ventana de entrega.

**File:** `lib/utils/date-utils.ts`

**Logic:**
- Sumar 90 minutos a `created_at` para la ventana estándar de zona piloto.

**Estimated time:** 1h

---

### **Step 3: UI Implementation**

**Task:** Página `/checkout/success/[id]`.

**Details:**
- Diseño festivo/limpio de "Gracias por tu compra".
- Lista de productos comprados.
- CTA: "Seguir Comprando" o "Ver mis Pedidos".

**Estimated time:** 2h

---

## Estimated Effort

**Total:** 4h
**Story points:** 2
