# Implementation Plan: STORY-OP-16 - Select Delivery Method

## Overview

Primer paso del checkout. El usuario elige cómo quiere recibir su pedido: Despacho a domicilio (validando zona) o Retiro en tienda.

**Acceptance Criteria a cumplir:**

- Opción "Home Delivery" muestra dirección guardada y suma costo de envío ($5).
- Opción "Pickup" muestra dirección del punto de retiro y costo $0.
- Bloqueo de "Home Delivery" si la dirección no está en la Zona Piloto.

---

## Technical Approach

**Chosen approach:** Estado local en el formulario de Checkout + Validación Server-side en el siguiente paso.

---

## UI/UX Design

### Componentes:
- `DeliveryMethodSelector`: Radio cards con iconos.
- `AddressPreview`: Muestra la dirección seleccionada con badge de zona.

---

## Implementation Steps

### **Step 1: Checkout State**

**Task:** Definir tipos y esquema para el despacho.

**File:** `lib/schemas/checkout.ts`

**Details:**
- `deliveryMethod: 'home' | 'pickup'`
- `addressId: string (nullable if pickup)`

**Estimated time:** 1h

---

### **Step 2: Frontend UI**

**Task:** Crear pantalla `/checkout/delivery`.

**Details:**
- Fetch de direcciones del usuario (de EPIC-OP-2).
- Selector de método.
- Lógica de deshabilitar "Home Delivery" si ninguna dirección está `within_pilot_zone`.

**Estimated time:** 3h

---

## Estimated Effort

**Total:** 4h
**Story points:** 3
