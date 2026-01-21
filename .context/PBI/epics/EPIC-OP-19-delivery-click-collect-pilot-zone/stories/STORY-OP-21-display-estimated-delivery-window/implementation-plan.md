# Implementation Plan: STORY-OP-21 - Display Estimated Delivery Window

## Overview

Calcular y mostrar una ventana de entrega realista al usuario basada en la hora de compra y las capacidades operativas de la zona piloto.

**Acceptance Criteria a cumplir:**

- Mostrar ventana (ej. "60-90 min") en Checkout.
- Persistir la ventana calculada en la Orden.
- Manejar horarios nocturnos (pedidos para el día siguiente).

---

## Technical Approach

**Chosen approach:** Heurística basada en tiempo en `OrderService`.

**Logic:**
- `If Time < 20:00`: ETA = `Now + 90 min`.
- `If Time >= 20:00`: ETA = `Tomorrow 10:00 AM`.

---

## Implementation Steps

### **Step 1: Backend Calculation Logic**

**Task:** Servicio `LogisticsService`.

**File:** `lib/services/logistics.ts`

**Details:**
- Función `calculateETA(orderTime: Date): string`.

**Estimated time:** 1h

---

### **Step 2: Database Integration**

**Task:** Actualizar `POST /api/orders`.

**Details:**
- Llamar al servicio antes de crear la orden y guardar el string en `estimated_delivery_window`.

**Estimated time:** 1h

---

### **Step 3: Frontend display**

**Task:** Componente `ETAView`.

**Details:**
- Mostrar en el resumen final de compra.

**Estimated time:** 1h

---

## Estimated Effort

**Total:** 3h
**Story points:** 2
