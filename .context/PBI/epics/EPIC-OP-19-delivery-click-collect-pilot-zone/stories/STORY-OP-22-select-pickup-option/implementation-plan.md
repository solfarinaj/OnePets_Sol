# Implementation Plan: STORY-OP-22 - Select Pickup Option

## Overview

Habilitar el retiro en punto físico como alternativa al despacho.

**Acceptance Criteria a cumplir:**

- Opción de "Retiro en Almacén".
- Visualización de dirección y horarios de retiro.
- Total de orden sin recargo de envío.

---

## Implementation Steps

### **Step 1: Frontend Toggle**

**Task:** Añadir a `DeliverySelector`.

**Details:**
- Al seleccionar Pickup, ocultar lista de direcciones.
- Mostrar Card estática con datos del almacén.

**Estimated time:** 1h

---

### **Step 2: Integration**

**Task:** Ajustar `OrderAction`.

**Details:**
- Enviar `deliveryMethod: 'pickup'` al servidor.
- Backend debe validar que no se asigne `address_id`.

**Estimated time:** 1h

---

## Estimated Effort

**Total:** 2h
**Story points:** 2
