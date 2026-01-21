# Feature Implementation Plan: EPIC-OP-30 - Notifications & Basic Support

## Overview

Esta feature establece los canales de comunicación y soporte técnico inicial. Asegura que el usuario esté siempre informado del estado de su pedido y tenga un lugar donde reportar incidencias.

**Alcance:**

- STORY-OP-31: Order Status Notifications
- STORY-OP-32: View Order History and Status
- STORY-OP-33: Submit Support Request
- STORY-OP-34: Operator Add Internal Notes

**Stack técnico:**

- Backend: Supabase Database Webhooks / Edge Functions.
- Email: Resend / React Email.
- Frontend: Formulario de soporte y sección de perfil.

---

## Technical Decisions

### Decision 1: Notification Triggering

**Options considered:**
- A) Database Triggers (Postgres)
- B) Server Action side-effect
- C) Supabase Edge Functions listening to changes

**Chosen:** C) Supabase Edge Functions (via Webhooks)

**Reasoning:**
- ✅ Desacoplamiento: El flujo de actualización de orden no se bloquea si el email falla.
- ✅ Escalabilidad: Maneja el envío de emails de forma asíncrona.
- ✅ Seguridad: Las API keys de email no se exponen al cliente ni al backend principal.

---

## Implementation Order

1.  **STORY-OP-32 (History)**: Funcionalidad de solo lectura básica.
2.  **STORY-OP-31 (Notifications)**: Automatización de comunicación.
3.  **STORY-OP-33 & OP-34 (Support)**: Flujo completo de incidencias.

---

## Success Criteria

- [ ] Email de confirmación enviado al 100% de las órdenes exitosas.
- [ ] Historial de órdenes accesible y con estados actualizados.
- [ ] Los tickets de soporte se crean correctamente y son visibles para el staff.
