# Implementation Plan: STORY-OP-27 - Manage Subscriptions (Pause, Change Frequency, Cancel)

## Overview

Dashboard para que el usuario controle sus pedidos recurrentes.

**Acceptance Criteria a cumplir:**

- Lista de suscripciones con estado actual.
- Botones de Pausa/Resumen.
- Cambio de frecuencia dinámico con actualización de fecha.

---

## Implementation Steps

### **Step 1: Management UI**

**Task:** Pantalla `/profile/subscriptions`.

**Details:**
- Lista de `SubscriptionCard`.
- Mostrar fecha de próxima entrega resaltada.

**Estimated time:** 3h

---

### **Step 2: Update Action**

**Task:** `updateSubscriptionStatus` y `updateSubscriptionFrequency`.

**Details:**
- Lógica de recalcular fecha si cambia frecuencia.
- Revalidar `/profile/subscriptions`.

**Estimated time:** 2h

---

## Estimated Effort

**Total:** 5h
**Story points:** 5 (High due to state management and logic complexity)
