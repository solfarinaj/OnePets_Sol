# Operator Subscription View

**Jira Key:** OP-29
**Epic:** EPIC-OP-25 (Subscription Management (Recurrent Food))
**Priority:** High
**Story Points:** 3
**Status:** To Do
**Assignee:** null

---

## User Story

**As a** OnePets operator
**I want to** view a list of all active subscriptions and their upcoming delivery dates
**So that** I can plan inventory, logistics, and proactively manage potential fulfillment issues.

---

## Description

This story provides OnePets operators with an internal dashboard or section dedicated to subscription oversight. The view should present a comprehensive list of all active subscriptions, their current status, associated customer, subscribed product, and crucial upcoming delivery dates. This visibility is vital for inventory forecasting, route planning, and ensuring that all recurring orders are fulfilled on time.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: View all active subscriptions (Happy Path)
- **Given:** A OnePets operator is logged into the internal system.
- **When:** They navigate to the "Subscriptions" section.
- **Then:** They see a list of all active subscriptions.
- **And:** For each subscription, they see the customer's name, subscribed product, frequency, status, and the next scheduled delivery date.

### Scenario 2: Filter subscriptions by status
- **Given:** An operator is viewing the subscription list.
- **When:** They apply a filter for "paused" subscriptions.
- **Then:** Only subscriptions with a "paused" status are displayed.

### Scenario 3: View upcoming deliveries
- **Given:** An operator is viewing the subscription list.
- **When:** They filter or sort by "next scheduled delivery date" within a specific timeframe (e.g., next 7 days).
- **Then:** The system displays subscriptions with upcoming deliveries in that timeframe, ordered chronologically.

---

## Technical Notes

### Frontend
- Develop an internal dashboard page or section for operators (e.g., `/admin/subscriptions`).
- Implement UI components to display the list of subscriptions with their details.
- Provide filtering and sorting options (e.g., by status, next delivery date).

### Backend
- **`GET /api/admin/subscriptions`**: This endpoint will provide a list of subscriptions.
- It must support filtering by `status` and `next_delivery_date`.
- Requires operator-level authentication and authorization.
- It will join data from `subscriptions`, `products`, and `profiles` tables.

### Database
- **`public.subscriptions`**: Will be queried to retrieve subscription details.
- **`public.products`**: Used to get product details for subscribed items.
- **`public.profiles`**: To display customer information.
- RLS policies must allow operators (based on their `role` in `profiles`) to view all subscriptions.

---

## Dependencies

### Blocked By
- STORY-OP-26: Create Subscription
- STORY-OP-27: Manage Subscriptions (Pause/Cancel/Edit)

### Blocks
- None directly.

### Related Stories
- None.

---

## UI/UX Considerations

- The operator dashboard should be clear and concise for quick inventory and logistics planning.
- Visual cues for subscriptions requiring immediate attention (e.g., soonest delivery dates).

---

## Definition of Done

- [ ] Operators can access a list of all active subscriptions.
- [ ] The subscription list displays customer name, subscribed product, frequency, status, and next delivery date.
- [ ] Filtering and sorting options for subscriptions are functional.
- [ ] The `GET /api/admin/subscriptions` endpoint is implemented and tested.
- [ ] Proper authentication and authorization for operators are enforced.

---

## Testing Strategy

See: `.context/PBI/epics/EPIC-OP-25-subscription-management-recurrent-food/stories/STORY-OP-29-operator-subscription-view/test-cases.md` (se crea en Fase 5)

**Test Cases Expected:**
- View subscriptions as an operator.
- Filter by "active" status.
- Filter by "paused" status.
- Sort subscriptions by `next_delivery_date`.
- Verify that a non-operator user cannot access the page.
- Verify all relevant information is displayed for each subscription.

---

## Implementation Plan

See: `.context/PBI/epics/EPIC-OP-25-subscription-management-recurrent-food/stories/STORY-OP-29-operator-subscription-view/implementation-plan.md` (se crea en Fase 6)

**Implementation Steps Expected:**
- Create the operator dashboard UI for displaying subscriptions.
- Implement data fetching logic using the new `GET /api/admin/subscriptions` endpoint.
- Develop filtering and sorting functionality on the client side.
- Implement backend endpoint with authorization checks.

---

## Notes
- This view supports proactive inventory and logistics management for recurring orders.

---

## Related Documentation

- **Epic:** `.context/PBI/epics/EPIC-OP-25-subscription-management-recurrent-food/epic.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-023)
- **API Contracts:** `.context/SRS/srs-api-contracts.yaml` (GET /api/admin/subscriptions)
