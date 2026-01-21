# Implementation Plan: STORY-OP-29 - Operator Subscription View

## Overview

Vista para que el equipo de operaciones vea la demanda futura de suscripciones.

**Acceptance Criteria a cumplir:**

- Lista de suscripciones activas.
- Totales por producto para los próximos 7 días (Forecasting).

---

## Implementation Steps

### **Step 1: Admin Data Fetcher**

**Task:** Query de forecasting.

**Details:**
- Agrupar por `product_id` y sumar `quantities` filtrando por fecha.

**Estimated time:** 2h

---

### **Step 2: Admin UI**

**Task:** Pantalla `/admin/subscriptions`.

**Details:**
- Vista de "Próximas Entregas".
- Resumen de stock necesario.

**Estimated time:** 3h

---

## Estimated Effort

**Total:** 5h
**Story points:** 3
