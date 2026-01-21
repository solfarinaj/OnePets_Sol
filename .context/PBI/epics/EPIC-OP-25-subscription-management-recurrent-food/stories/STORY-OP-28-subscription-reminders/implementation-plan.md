# Implementation Plan: STORY-OP-28 - Subscription Reminders

## Overview

Automatización de recordatorios y generación de pedidos recurrentes.

**Acceptance Criteria a cumplir:**

- Email automático 3 días antes de la entrega.
- Generación de la Orden real en DB el día programado.
- Exclusión de suscripciones pausadas/canceladas.

---

## Technical Approach

**Chosen approach:** Supabase Edge Function disparada por `pg_cron`.

---

## Implementation Steps

### **Step 1: Reminder Service**

**Task:** Función `checkAndNotify`.

**Details:**
- Query subs donde `next_delivery_date - 3 days == Today`.
- Enviar email vía Resend/SendGrid.

**Estimated time:** 3h

---

### **Step 2: Order Generator**

**Task:** Función `processDueSubscriptions`.

**Details:**
- Query subs donde `next_delivery_date == Today` y `status == 'active'`.
- Crear `Order` y `OrderItems`.
- Actualizar `next_delivery_date` sumando la frecuencia.

**Estimated time:** 4h

---

## Estimated Effort

**Total:** 7h
**Story points:** 2 (Simple functionality but high criticality)
