# Operator Update Order Status

**Jira Key:** OP-24
**Epic:** EPIC-OP-19 (Delivery & Click & Collect (Pilot Zone))
**Priority:** High
**Story Points:** 3
**Status:** To Do
**Assignee:** null

---

## User Story

**As a** OnePets operator
**I want to** update the status of an order (e.g., "in preparation," "out for delivery," "delivered")
**So that** customers are kept informed of their order's progress and I can manage the fulfillment process.

---

## Description

This story provides operators with the functionality to change the status of an order within the internal system. This is a critical operational feature that ensures customers receive timely updates about their orders. The system should allow operators to select from a predefined set of statuses, and each status change should ideally trigger a customer notification (covered in EPIC 6).

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Update order status to "in preparation" (Happy Path)
- **Given:** An operator is viewing a pending order in the internal system.
- **When:** They select "Mark as In Preparation" for that order.
- **Then:** The order's status is updated to "in preparation".
- **And:** The system records the timestamp of the status change.

### Scenario 2: Update order status to "out for delivery"
- **Given:** An operator is viewing an order with "in preparation" status.
- **When:** They select "Mark as Out for Delivery" for that order.
- **Then:** The order's status is updated to "out for delivery".

### Scenario 3: Update order status to "delivered"
- **Given:** An operator is viewing an order with "out for delivery" status.
- **When:** They select "Mark as Delivered" for that order.
- **Then:** The order's status is updated to "delivered".

### Scenario 4: Attempt to update an order with an invalid status transition
- **Given:** An operator is viewing a "delivered" order.
- **When:** They attempt to change its status back to "pending".
- **Then:** The system displays an error message: "Invalid status transition."
- **And:** The order's status remains "delivered".

---

## Technical Notes

### Frontend
- Integrate status update controls (e.g., buttons or a dropdown) into the operator order list view.
- Send `PUT` requests to the `/api/admin/orders/{orderId}/status` endpoint with the new status.
- Provide visual feedback on successful status updates.

### Backend
- **`PUT /api/admin/orders/{orderId}/status`**: This endpoint will update the status of a specific order.
- It must enforce valid status transitions (e.g., cannot go from "delivered" to "pending").
- Requires operator-level authentication and authorization.
- Records the time of the status change.

### Database
- **`public.orders`**: The `status` column will be updated.
- A trigger or database function could be used to record status change history (for future auditing, if needed).

---

## Dependencies

### Blocked By
- STORY-OP-23: Operator View of Pending Orders

### Blocks
- EPIC-OP-6: Notifications & Basic Support (for sending customer notifications based on status changes).

### Related Stories
- None.

---

## UI/UX Considerations

- Status update controls should be easily accessible from the order list.
- Clear and concise labels for each status option.
- Ensure only valid status transitions are allowed through the UI or provide immediate feedback.

---

## Definition of Done

- [ ] Operators can update the status of pending orders.
- [ ] Valid status transitions are enforced.
- [ ] The API endpoint for updating order status is implemented and tested.
- [ ] Proper authentication and authorization for operators are enforced.
- [ ] Unit tests for status transition logic.

---

## Testing Strategy

See: `.context/PBI/epics/EPIC-OP-19-delivery-click-collect-pilot-zone/stories/STORY-OP-24-operator-update-order-status/test-cases.md` (se crea en Fase 5)

**Test Cases Expected:**
- Update a pending order to "in preparation".
- Update an "in preparation" order to "out for delivery".
- Update an "out for delivery" order to "delivered".
- Attempt an invalid status transition (e.g., "delivered" to "pending").
- Verify that a non-operator user cannot update order status.

---

## Implementation Plan

See: `.context/PBI/epics/EPIC-OP-19-delivery-click-collect-pilot-zone/stories/STORY-OP-24-operator-update-order-status/implementation-plan.md` (se crea en Fase 6)

**Implementation Steps Expected:**
- Add UI controls for status updates to the operator order list.
- Implement client-side logic to send status update requests.
- Create the `PUT /api/admin/orders/{orderId}/status` backend endpoint.
- Implement the business logic for status transitions.

---

## Notes
- The internal order status flow will be clearly defined.

---

## Related Documentation

- **Epic:** `.context/PBI/epics/EPIC-OP-19-delivery-click-collect-pilot-zone/epic.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-019)
- **API Contracts:** `.context/SRS/srs-api-contracts.yaml` (PUT /api/admin/orders/{orderId}/status)
