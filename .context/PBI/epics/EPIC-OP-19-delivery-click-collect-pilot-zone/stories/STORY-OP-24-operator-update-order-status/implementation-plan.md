# Implementation Plan: STORY-OP-24 - Operator Update Order Status

## Overview

Permitir a los operadores cambiar el estado de las órdenes para avanzar en el flujo logístico.

**Acceptance Criteria a cumplir:**
- Botones de acción (ej. "Marcar como enviado").
- Validación de transiciones (no volver de "Entregado" a "Pendiente").
- Registro de logs de cambio de estado.

---

## Technical Approach

**Chosen approach:** Finite State Machine (FSM) simple en la Server Action.

---

## Implementation Steps

### **Step 1: Status Transitions Service**

**Task:** Definir mapa de transiciones permitidas.

**File:** `lib/utils/order-logic.ts`

**Logic:**
```typescript
const allowedTransitions = {
  pending: ['preparing', 'cancelled'],
  preparing: ['out_for_delivery', 'ready_for_pickup'],
  ...
}
```

**Estimated time:** 1h

---

### **Step 2: Server Action**

**Task:** `updateOrderStatus`.

**Details:**
- Validar rol de operador.
- Validar transición con el mapa.
- Update DB.

**Estimated time:** 2h

---

### **Step 3: UI Controls**

**Task:** Dropdown o botones en la tabla administrativa.

**Estimated time:** 2h

---

## Estimated Effort

**Total:** 5h
**Story points:** 3
