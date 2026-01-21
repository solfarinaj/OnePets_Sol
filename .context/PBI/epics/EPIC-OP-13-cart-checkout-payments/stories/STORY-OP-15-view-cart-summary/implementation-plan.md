# Implementation Plan: STORY-OP-15 - View Cart Summary

## Overview

Implementar la página de resumen del carrito donde los usuarios pueden revisar sus productos, ajustar cantidades y ver el subtotal antes del checkout.

**Acceptance Criteria a cumplir:**

- Listar todos los productos en el carrito con foto, nombre y precio.
- Botones +/- para ajustar cantidades con actualización de precio instantánea.
- Opción de eliminar productos.
- Mostrar mensaje de "Carrito vacío" con CTA a catálogo.

---

## UI/UX Design

### Wireframes/Layout:

```
┌──────────────────────────────────────┐
│  Your Cart (3 items)                 │
├──────────────────────────────────────┤
│ [Img] Dog Food   - $50 [ - 1 + ] [x] │
│ [Img] Cat Litter - $20 [ - 2 + ] [x] │
├──────────────────────────────────────┤
│ Subtotal: $90.00                     │
│ [ Checkout Button ]                  │
└──────────────────────────────────────┘
```

---

## Implementation Steps

### **Step 1: Data Fetching**

**Task:** Query eficiente del carrito con detalles de producto.

**File:** `lib/data/cart.ts`

**Details:**
- Usar `.select('*, products(*)')` para evitar múltiples queries.

**Estimated time:** 1h

---

### **Step 2: Frontend components**

**Task:** Crear `CartTable` y `CartItemRow`.

**File:** `components/cart/cart-table.tsx`

**Logic:**
- Usar `useOptimistic` para el cambio de cantidades para una experiencia fluida.

**Estimated time:** 3h

---

### **Step 3: Quantity Update Action**

**Task:** `updateCartItemQuantity` y `removeCartItem`.

**File:** `lib/actions/cart.ts`

**Details:**
- Si `qty === 0`, borrar item.
- Revalidar path `/cart`.

**Estimated time:** 1h

---

## Estimated Effort

**Total:** 5h
**Story points:** 2
