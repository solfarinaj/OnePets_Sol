# Subscription Reminders

**Jira Key:** OP-28
**Epic:** EPIC-OP-25 (Subscription Management (Recurrent Food))
**Priority:** High
**Story Points:** 2
**Status:** To Do
**Assignee:** null

---

## User Story

**As a** pet owner
**I want to** receive a reminder notification before my next subscription shipment is processed
**So that** I have an opportunity to confirm, modify, or cancel the order if my needs have changed.

---

## Description

This story implements an automated reminder system for active subscriptions. A few days before a scheduled shipment, users will receive a notification (e.g., email, SMS) informing them of the upcoming order. This reminder will provide details of the shipment and offer options to make changes to the subscription (pause, change frequency, cancel) or confirm the order, ensuring transparency and flexibility for the user.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Receive pre-shipment reminder (Happy Path)
- **Given:** An authenticated user has an active subscription.
- **And:** The `next_delivery_date` for their subscription is within a predefined reminder window (e.g., 3 days).
- **When:** The automated reminder process runs.
- **Then:** The user receives a notification (e.g., email) detailing the upcoming shipment.
- **And:** The notification includes options to modify or cancel the subscription.

### Scenario 2: No reminder for paused or cancelled subscriptions
- **Given:** A user has a paused or cancelled subscription.
- **When:** The automated reminder process runs.
- **Then:** The user does not receive a reminder notification for that subscription.

### Scenario 3: Reminder for multiple active subscriptions
- **Given:** An authenticated user has multiple active subscriptions with upcoming shipments.
- **When:** The automated reminder process runs.
- **Then:** The user receives a reminder for each eligible upcoming shipment.

---

## Technical Notes

### Frontend
- No direct UI changes, but the email template design might involve frontend styling.
- Potential future enhancement: display notification preferences in user settings.

### Backend
- Implement a scheduled job (e.g., a Supabase Edge Function triggered by a cron job) that runs daily.
- This job will query the `subscriptions` table for active subscriptions with `next_delivery_date` within the reminder window.
- For each eligible subscription, it will generate and send a notification (e.g., via an email service).
- Ensure the job is idempotent to avoid sending duplicate reminders.

### Database
- **`public.subscriptions`**: Queried by the scheduled job to identify subscriptions needing reminders.
- `status` and `next_delivery_date` fields are critical.

---

## Dependencies

### Blocked By
- STORY-OP-26: Create Subscription
- STORY-OP-27: Manage Subscriptions (Pause/Cancel/Edit)

### Blocks
- EPIC-OP-6: Notifications & Basic Support (could leverage this for a unified notification system).

### Related Stories
- None.

---

## UI/UX Considerations

- The content of the reminder notification should be clear, concise, and actionable.
- Easy access to subscription management options from the reminder.

---

## Definition of Done

- [ ] Automated process for sending pre-shipment reminders is implemented.
- [ ] Reminders are sent for active subscriptions within the defined window.
- [ ] No reminders are sent for paused or cancelled subscriptions.
- [ ] Unit tests for the reminder logic and frequency calculation.
- [ ] Integration tests for the scheduled job and email sending.

---

## Testing Strategy

See: `.context/PBI/epics/EPIC-OP-25-subscription-management-recurrent-food/stories/STORY-OP-28-subscription-reminders/test-cases.md` (se crea en Fase 5)

**Test Cases Expected:**
- Verify a reminder is sent for an active subscription 3 days before `next_delivery_date`.
- Verify no reminder is sent for a paused subscription.
- Verify no reminder is sent for a cancelled subscription.
- Test with multiple active subscriptions for a single user.
- Test edge cases around reminder window boundaries.

---

## Implementation Plan

See: `.context/PBI/epics/EPIC-OP-25-subscription-management-recurrent-food/stories/STORY-OP-28-subscription-reminders/implementation-plan.md` (se crea en Fase 6)

**Implementation Steps Expected:**
- Develop a scheduled job (e.g., Supabase Edge Function).
- Implement logic to query for eligible subscriptions.
- Integrate with an email/notification service to send reminders.
- Design the email template for the reminder.

---

## Notes
- The notification content will dynamically include subscription details and action links.

---

## Related Documentation

- **Epic:** `.context/PBI/epics/EPIC-OP-25-subscription-management-recurrent-food/epic.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-022)
- **API Contracts:** `.context/SRS/srs-api-contracts.yaml`
