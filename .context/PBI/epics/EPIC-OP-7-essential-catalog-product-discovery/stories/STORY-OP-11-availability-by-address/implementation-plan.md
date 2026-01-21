# Implementation Plan: STORY-OP-11 - Availability by Address

## Overview

Mostrar si el producto puede ser entregado rápidamente según la dirección del usuario.

**Acceptance Criteria:**
- Usuario con dirección en zona -> "Fast Delivery".
- Usuario fuera de zona -> "No delivery".
- Sin dirección -> "Add address".

---

## Technical Approach

**Chosen approach:** `PilotZoneService` (Reuso) + Componente Cliente.

**Why:**
- La disponibilidad depende del usuario logueado (Client State o Server Session).
- Reusar la lógica de zona de OP-6.

---

## UI/UX Design

### Componentes:
- `AvailabilityBadge`: Client Component que lee `user` del contexto o props.

---

## Implementation Steps

### **Step 1: Pilot Zone Logic**

**Task:** Exponer lógica de zona.

**File:** `lib/utils/pilot-zone.ts`

**Details:**
- Ya debería existir de OP-6. Refinar si es necesario.

**Estimated time:** 0.5h

### **Step 2: Component UI**

**Task:** `AvailabilityBadge`.

**File:** `components/product/availability-badge.tsx`

**Logic:**
- Input: `userAddress`.
- Output: Badge Verde/Rojo/Gris.

**Estimated time:** 2h

### **Step 3: Integration**

**Task:** Agregar Badge a `ProductDetail`.

**Details:**
- Fetch usuario/dirección en Page.
- Pasar a componente.

**Estimated time:** 1h

---

## Estimated Effort

**Total:** 3.5h
**Story Points:** 3
