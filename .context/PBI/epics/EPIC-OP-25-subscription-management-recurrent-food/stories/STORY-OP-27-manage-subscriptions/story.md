# Manage Subscriptions (Pause, Change Frequency, Cancel)

**Jira Key:** OP-27
**Epic:** EPIC-OP-25 (Subscription Management (Recurrent Food))
**Priority:** High
**Story Points:** 5
**Status:** To Do
**Assignee:** null

---

## User Story

**As a** pet owner
**I want to** manage my active subscriptions by pausing, changing their frequency, or cancelling them
**So that** I can adjust my deliveries to match my pet's needs and my personal circumstances.

---

## Description

This story provides users with full control over their active subscriptions. Users should be able to view a list of their subscriptions and perform actions such as pausing a subscription (e.g., if they are traveling), changing the delivery frequency (e.g., if their pet's food consumption changes), or cancelling a subscription entirely. This flexibility is key to ensuring customer satisfaction and reducing churn.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Pause an active subscription (Happy Path)
- **Given:** An authenticated user has an active subscription.
- **When:** They navigate to their "My Subscriptions" page and click "Pause" for a specific subscription.
- **Then:** The subscription's status changes to "paused".
- **And:** No further deliveries are scheduled until the subscription is resumed.

### Scenario 2: Change subscription frequency
- **Given:** An authenticated user has an active subscription.
- **When:** They navigate to their "My Subscriptions" page and select a new frequency (e.g., from 4 weeks to 6 weeks).
- **Then:** The subscription's frequency is updated.
- **And:** The `next_delivery_date` is recalculated based on the new frequency.

### Scenario 3: Cancel a subscription
- **Given:** An authenticated user has an active or paused subscription.
- **When:** They navigate to their "My Subscriptions" page and click "Cancel" for a specific subscription.
- **Then:** The subscription's status changes to "cancelled".
- **And:** No further deliveries are scheduled for that subscription.

### Scenario 4: Resume a paused subscription
- **Given:** An authenticated user has a paused subscription.
- **When:** They navigate to their "My Subscriptions" page and click "Resume" for that subscription.
- **Then:** The subscription's status changes to "active".
- **And:** The `next_delivery_date` is recalculated to schedule the next delivery.

---

## Technical Notes

### Frontend
- Create a "My Subscriptions" page to list all active, paused, and cancelled subscriptions.
- Implement UI controls for pausing, resuming, changing frequency, and cancelling subscriptions.
- Integrate with `GET /api/subscriptions` to fetch subscriptions and `PATCH /api/subscriptions/{subscriptionId}` to update them.

### Backend
- **`GET /api/subscriptions`**: Endpoint to retrieve all subscriptions for the authenticated user.
- **`PATCH /api/subscriptions/{subscriptionId}`**: Endpoint to update a subscription's status or frequency.
- This endpoint must validate:
    - User authentication and ownership of the subscription.
    - Valid status transitions (e.g., cannot resume a cancelled subscription without specific logic).
    - Valid frequency changes.
- Recalculate `next_delivery_date` on frequency change or resume.

### Database
- **`public.subscriptions`**: The `status`, `frequency_weeks`, and `next_delivery_date` columns will be updated.
- RLS policies on `subscriptions` are essential.

---

## Dependencies

### Blocked By
- STORY-OP-26: Create Subscription

### Blocks
- STORY-OP-28: Subscription Reminders

### Related Stories
- None.

---

## UI/UX Considerations

- The subscription management interface should be clear and easy to understand.
- Provide confirmation dialogs for destructive actions like cancellation.
- Clearly display the next delivery date for active subscriptions.

---

## Definition of Done

- [ ] Users can view their list of subscriptions.
- [ ] Users can pause, resume, and cancel a subscription.
- [ ] Users can change the frequency of an active subscription.
- [ ] The `PATCH /api/subscriptions/{subscriptionId}` API endpoint is implemented and tested.
- [ ] RLS policies are verified for subscription management.

---

## Testing Strategy

See: `.context/PBI/epics/EPIC-OP-25-subscription-management-recurrent-food/stories/STORY-OP-27-manage-subscriptions/test-cases.md` (se crea en Fase 5)

**Test Cases Expected:**
- Create a subscription, then pause it.
- Resume a paused subscription.
- Change frequency of an active subscription.
- Cancel an active subscription.
- Attempt to manage another user's subscription (should be blocked).
- Verify `next_delivery_date` updates correctly after frequency change or resume.

---

## Implementation Plan

See: `.context/PBI/epics/EPIC-OP-25-subscription-management-recurrent-food/stories/STORY-OP-27-manage-subscriptions/implementation-plan.md` (se crea en Fase 6)

**Implementation Steps Expected:**
- Create the "My Subscriptions" page UI.
- Implement client-side logic for displaying and managing subscriptions.
- Integrate UI actions with the `GET /api/subscriptions` and `PATCH /api/subscriptions/{subscriptionId}` endpoints.

---

## Notes
- Clear communication to users about the implications of pausing/cancelling.

---

## Related Documentation

- **Epic:** `.context/PBI/epics/EPIC-OP-25-subscription-management-recurrent-food/epic.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-021)
- **API Contracts:** `.context/SRS/srs-api-contracts.yaml` (GET /api/subscriptions, PATCH /api/subscriptions/{subscriptionId})
