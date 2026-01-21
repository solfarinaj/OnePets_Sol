# Order Status Notifications

**Jira Key:** OP-31
**Epic:** EPIC-OP-30 (Notifications & Basic Support)
**Priority:** High
**Story Points:** 3
**Status:** To Do
**Assignee:** null

---

## User Story

**As a** pet owner
**I want to** receive notifications when the status of my order changes
**So that** I stay informed about its progress without constantly checking the app or website.

---

## Description

This story implements an automated notification system to inform users about significant changes in their order status. Notifications will be sent for key lifecycle events such as "order confirmed," "in preparation," "out for delivery," and "delivered." This proactive communication improves transparency and reduces customer anxiety, especially for urgent orders.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Receive "Order Confirmed" notification (Happy Path)
- **Given:** A user successfully places an order.
- **When:** The order status changes to "confirmed" (or initial processing status).
- **Then:** The user receives a notification (e.g., email) confirming their order.
- **And:** The notification includes the order number and a summary of items.

### Scenario 2: Receive "Out for Delivery" notification
- **Given:** A user has an active order with "in preparation" status.
- **When:** A OnePets operator updates the order status to "out for delivery".
- **Then:** The user receives a notification (e.g., email) informing them that their order is on its way.

### Scenario 3: Receive "Delivered" notification
- **Given:** A user has an order "out for delivery".
- **When:** A OnePets operator updates the order status to "delivered".
- **Then:** The user receives a notification (e.g., email) confirming successful delivery.

### Scenario 4: No duplicate notifications
- **Given:** A user has an active order.
- **When:** An order status is updated multiple times to the same status (e.g., "in preparation" -> "in preparation").
- **Then:** The user receives only one notification for that status change.

---

## Technical Notes

### Frontend
- No direct UI changes. This is primarily a backend and integration task.
- Future enhancement: user notification preferences in their profile.

### Backend
- Integrate with an email/notification service (e.g., SendGrid, Postmark).
- Implement a mechanism to trigger notifications whenever an order's `status` changes in the `public.orders` table. This could be a database trigger, a Supabase function, or handled directly by the API endpoint responsible for status updates.
- Create notification templates for each status change.

### Database
- **`public.orders`**: The `status` column change will trigger notifications.
- Potentially a `notification_logs` table to track sent notifications (for debugging/auditing).

---

## Dependencies

### Blocked By
- EPIC-OP-13: Cart, Checkout & Payments (for successful orders).
- EPIC-OP-19: Delivery & Click & Collect (for operator status updates).

### Blocks
- None directly.

### Related Stories
- None.

---

## UI/UX Considerations

- Notifications should be clear, concise, and contain relevant information.
- Consistent tone and branding across all notifications.

---

## Definition of Done

- [ ] Users receive automated notifications for key order status changes.
- [ ] Notification content is accurate and informative.
- [ ] Integration with a notification service is functional.
- [ ] Status changes correctly trigger notifications.
- [ ] Unit tests for notification triggering logic.
- [ ] Integration tests for the notification service integration.

---

## Testing Strategy

See: `.context/PBI/epics/EPIC-OP-30-notifications-basic-support/stories/STORY-OP-31-order-status-notifications/test-cases.md` (se crea en Fase 5)

**Test Cases Expected:**
- Place a new order and verify "Order Confirmed" notification.
- Update an order to "in preparation" and verify notification.
- Update an order to "out for delivery" and verify notification.
- Update an order to "delivered" and verify notification.
- Test that notifications are not sent for invalid status transitions.

---

## Implementation Plan

See: `.context/PBI/epics/EPIC-OP-30-notifications-basic-support/stories/STORY-OP-31-order-status-notifications/implementation-plan.md` (se crea en Fase 6)

**Implementation Steps Expected:**
- Set up a notification service.
- Implement the logic to detect order status changes.
- Create notification templates.
- Develop the code to send notifications via the chosen service.

---

## Notes
- Start with email notifications for MVP. SMS/Push can be future enhancements.

---

## Related Documentation

- **Epic:** `.context/PBI/epics/EPIC-OP-30-notifications-basic-support/epic.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-024)
- **API Contracts:** `.context/SRS/srs-api-contracts.yaml`
