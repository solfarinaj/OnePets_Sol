# Implementation Plan: STORY-OP-32 - View Order History and Status

## Overview

Sección del perfil de usuario donde puede consultar sus compras actuales y pasadas.

**Acceptance Criteria a cumplir:**

- Lista cronológica de órdenes.
- Vista de detalle con productos, dirección y total.
- Estado visual actual (Badge).

---

## Implementation Steps

### **Step 1: Frontend UI**

**Task:** Pantalla `/profile/orders`.

**Details:**
- Lista de `OrderCard`.
- Badge dinámico según estado.

**Estimated time:** 3h

---

### **Step 2: Detail Page**

**Task:** Pantalla `/profile/orders/[id]`.

**Details:**
- Reusa lógica de `STORY-OP-18` pero accesible históricamente.

**Estimated time:** 2h

---

## Estimated Effort

**Total:** 5h
**Story points:** 3
