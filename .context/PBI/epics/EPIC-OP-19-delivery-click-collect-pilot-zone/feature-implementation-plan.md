# Feature Implementation Plan: EPIC-OP-19 - Delivery & Click & Collect (Pilot Zone)

## Overview

Esta feature habilita la logística de última milla para la zona piloto. Cubre la gestión avanzada de direcciones, el cálculo de ventanas de entrega y la interfaz operativa para que OnePets gestione los pedidos.

**Alcance:**

- STORY-OP-20: Register/Select Delivery Address
- STORY-OP-21: Display Estimated Delivery Window
- STORY-OP-22: Select Pickup Option
- STORY-OP-23: Operator Order List
- STORY-OP-24: Operator Update Order Status

**Stack técnico:**

- Frontend: Dashboard administrativo (Tablas de Shadcn).
- Backend: Supabase Auth (Roles para operadores).
- Logic: `PilotZoneService` extendido.

---

## Technical Decisions

### Decision 1: Role-Based Access Control (RBAC)

**Options considered:**
- A) Supabase Roles nativos (Postgres)
- B) Custom Role column in `profiles` table
- C) JWT claims via Edge Functions

**Chosen:** B) Custom Role column in `profiles` table

**Reasoning:**
- ✅ Simplicidad: Fácil de consultar en el frontend para proteger rutas.
- ✅ Flexibilidad: Podemos añadir roles (Admin, Driver, Operator) sin tocar la infraestructura de DB profunda.
- ✅ Middleware: Next.js puede leer este campo para bloquear `/admin/*`.

### Decision 2: Real-time Updates for Operators

**Options considered:**
- A) Polling (cada 30s)
- B) Supabase Realtime (Websockets)

**Chosen:** B) Supabase Realtime

**Reasoning:**
- ✅ Eficiencia operativa: Los operadores ven los pedidos nuevos al instante.
- ✅ Menor carga de servidor que el polling constante.

---

## Architecture Notes

### Folder Structure

```
/app
  /admin
    /orders
      page.tsx (List)
      [id]/page.tsx (Detail & Update)
/lib
  /services
    logistics.ts (ETA math)
```

---

## Implementation Order

1.  **STORY-OP-20 (Address)**: Requisitos previos para logística.
2.  **STORY-OP-23 (Admin Dashboard)**: Visibilidad para el staff.
3.  **STORY-OP-24 (Status Updates)**: Control de flujo.
4.  **STORY-OP-21 & OP-22 (ETA/Pickup UI)**: Refinamiento de la experiencia de usuario.

---

## Risks & Mitigations

### Risk 1: Address Geocoding Accuracy
- **Impact:** El usuario cree que está en zona pero no lo está.
- **Mitigation:** Usar una librería de validación de Zip Codes oficial o Google Maps Autocomplete para asegurar data limpia.

---

## Success Criteria

- [ ] Operadores pueden ver y actualizar pedidos en tiempo real.
- [ ] Direcciones fuera de zona son bloqueadas efectivamente.
- [ ] Los estados de las órdenes fluyen correctamente (Pending -> Preparing -> Out).
