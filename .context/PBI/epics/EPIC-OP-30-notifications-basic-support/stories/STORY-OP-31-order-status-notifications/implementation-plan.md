# Implementation Plan: STORY-OP-31 - Order Status Notifications

## Overview

Automatizar el envío de correos electrónicos informativos cada vez que el estado de una orden cambie.

**Acceptance Criteria a cumplir:**

- Email disparado en: Confirmación, En Preparación, En Camino, Entregado.
- Contenido dinámico (ID de orden, Nombre del cliente).
- Prevención de duplicados si se re-asigna el mismo estado.

---

## Technical Approach

**Chosen approach:** Supabase Edge Function + Database Webhook + Resend.

---

## Implementation Steps

### **Step 1: Email Templates**

**Task:** Crear plantillas con React Email.

**Details:**
- `order-confirmed.tsx`, `order-status-update.tsx`.

**Estimated time:** 2h

---

### **Step 2: Edge Function**

**Task:** Función `send-notification`.

**Details:**
- Recibir `old_record` y `new_record`.
- Si `old.status === new.status`, abortar.
- Llamar a API de Resend.

**Estimated time:** 3h

---

## Estimated Effort

**Total:** 5h
**Story points:** 3
