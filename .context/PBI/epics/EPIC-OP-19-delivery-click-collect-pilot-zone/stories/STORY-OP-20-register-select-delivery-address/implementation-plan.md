# Implementation Plan: STORY-OP-20 - Register and Select Delivery Address

## Overview

Extender la gestión de direcciones para soportar múltiples entradas y validar la pertenencia a la Zona Piloto.

**Acceptance Criteria a cumplir:**

- Guardar nueva dirección vinculada al perfil.
- Flag `within_pilot_zone` calculado en backend.
- Capacidad de marcar una dirección como "Default".

---

## Implementation Steps

### **Step 1: Database Updates**

**Task:** Añadir flag de default a perfiles.

**SQL:**
```sql
alter table public.profiles add column default_address_id uuid references public.addresses(id);
```

**Estimated time:** 0.5h

---

### **Step 2: Server Action & Validation**

**Task:** `createAddress` action con chequeo de zona.

**File:** `lib/actions/address.ts`

**Logic:**
1. Validar Zip Code con `PilotZoneService`.
2. Insertar en `addresses`.
3. Si es la primera o el usuario marcó "Set as default", actualizar `profiles`.

**Estimated time:** 2h

---

### **Step 3: Frontend Address Management**

**Task:** Pantalla de gestión de direcciones.

**Details:**
- Grid de direcciones.
- Botones: "Set as Default", "Edit", "Remove".
- Badge de zona.

**Estimated time:** 3h

---

## Estimated Effort

**Total:** 5.5h
**Story points:** 3
