# Feature Implementation Plan: EPIC-OP-25 - Subscription Management (Recurrent Food)

## Overview

Esta feature introduce el modelo de suscripción para alimentos de mascotas. Permite automatizar la compra periódica, mejorando la retención del cliente y asegurando el suministro constante de alimentos esenciales.

**Alcance:**

- STORY-OP-26: Create Subscription
- STORY-OP-27: Manage Subscriptions (Pause/Cancel/Edit)
- STORY-OP-28: Subscription Reminders
- STORY-OP-29: Operator Subscription View

**Stack técnico:**

- Frontend: Dashboards de gestión.
- Backend: Scheduled Jobs (Supabase Edge Functions + Cron).
- Database: Tabla `subscriptions`.

---

## Technical Decisions

### Decision 1: Recurring Payment Strategy

**Options considered:**
- A) Full external subscription (Stripe Subscriptions)
- B) Internal schedule + On-demand charging (Tokenized cards)

**Chosen:** B) Internal schedule + On-demand charging

**Reasoning:**
- ✅ Control total: Podemos pausar/editar sin depender de la lógica rígida de Stripe.
- ✅ Custom Reminders: Más fácil disparar emails personalizados antes del cobro.
- ✅ Flexibilidad: Permite cambiar el producto de la suscripción sin recrear el objeto en la pasarela.

### Decision 2: Automation Engine

**Options considered:**
- A) Next.js Cron (Vercel)
- B) Supabase pg_cron + Edge Functions

**Chosen:** B) Supabase pg_cron + Edge Functions

**Reasoning:**
- ✅ Proximidad a los datos: La lógica corre directo en la DB.
- ✅ Escalabilidad: Ideal para miles de suscripciones diarias.

---

## Implementation Order

1.  **STORY-OP-26 (Creation)**: Lógica básica de persistencia.
2.  **STORY-OP-27 (Management)**: UX para el usuario.
3.  **STORY-OP-28 (Reminders & Worker)**: El "corazón" de la automatización.
4.  **STORY-OP-29 (Admin)**: Visibilidad operativa.

---

## Success Criteria

- [ ] Un usuario puede suscribirse a un producto y ver su fecha de próxima entrega.
- [ ] La pausa y cancelación son inmediatas y reflejadas en DB.
- [ ] El proceso automático crea órdenes reales sin error.
- [ ] Los operadores pueden prever la demanda de la semana entrante.
