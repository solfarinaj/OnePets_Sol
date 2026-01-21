# Display Estimated Delivery Window

**Jira Key:** OP-21
**Epic:** EPIC-OP-19 (Delivery & Click & Collect (Pilot Zone))
**Priority:** High
**Story Points:** 2
**Status:** To Do
**Assignee:** null

---

## User Story

**As a** pet owner
**I want to** see an estimated delivery window for my order
**So that** I know when to expect my products and can plan accordingly.

---

## Description

This story focuses on displaying a clear and accurate estimated delivery window to the user during the checkout process and on the order confirmation page. The estimated time should be dynamic, taking into account factors like current order volume, time of day, and location within the pilot zone. Providing this information enhances transparency and customer satisfaction by setting proper expectations.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Display estimated delivery window during checkout (Happy Path)
- **Given:** A user has selected home delivery for an address within the pilot zone during checkout.
- **When:** They proceed to the final review or payment step.
- **Then:** The system displays an estimated delivery window (e.g., "Delivery within 60-90 minutes").

### Scenario 2: Display estimated delivery window on order confirmation
- **Given:** A user has successfully placed an order for home delivery.
- **When:** They view the order confirmation page.
- **Then:** The page clearly shows the estimated delivery window for their order.

### Scenario 3: Estimated delivery not applicable (e.g., pickup or outside pilot zone)
- **Given:** A user has selected pickup, or their address is outside the pilot zone.
- **When:** They view their order details.
- **Then:** The system indicates that an estimated delivery window is not applicable.

### Scenario 4: Dynamic update of ETA
- **Given:** A user has an active home delivery order.
- **When:** There are significant changes in logistics (e.g., unexpected traffic, high volume).
- **Then:** The estimated delivery window on their order status page (future story) is updated, and the user is potentially notified. (Note: Dynamic update mechanism might be part of a later story).

---

## Technical Notes

### Frontend
- Integrate components to display the estimated delivery window prominently during checkout and on the order confirmation page.
- Ensure the display format is user-friendly (e.g., "X to Y minutes", or "between HH:MM and HH:MM").

### Backend
- The `POST /api/orders` endpoint (from EPIC-OP-13) will be responsible for calculating and storing the initial `estimated_delivery_window`.
- This calculation will be based on predefined business rules, operational hours, and potentially a simple heuristic for current load.

### Database
- The `public.orders` table must have an `estimated_delivery_window` field.

---

## Dependencies

### Blocked By
- STORY-OP-16: Select Delivery Method
- STORY-OP-18: Order Confirmation

### Blocks
- EPIC-OP-6: Notifications & Basic Support (for notification of changes to ETA).

### Related Stories
- None.

---

## UI/UX Considerations

- The estimated delivery window should be easy to locate and understand.
- Manage user expectations if delays are anticipated.

---

## Definition of Done

- [ ] The estimated delivery window is calculated and displayed during checkout.
- [ ] The estimated delivery window is displayed on the order confirmation page.
- [ ] The backend logic for calculating the initial estimated delivery window is implemented.
- [ ] Unit tests for the ETA calculation logic.
- [ ] Integration tests for the API endpoint that provides the ETA.

---

## Testing Strategy

See: `.context/PBI/epics/EPIC-OP-19-delivery-click-collect-pilot-zone/stories/STORY-OP-21-display-estimated-delivery-window/test-cases.md` (se crea en Fase 5)

**Test Cases Expected:**
- Verify ETA is displayed for an in-zone delivery.
- Verify no ETA is displayed for a pickup order.
- Verify no ETA is displayed for an out-of-zone address.
- Test different times of day/week to ensure ETA rules are applied (if business rules exist for this).

---

## Implementation Plan

See: `.context/PBI/epics/EPIC-OP-19-delivery-click-collect-pilot-zone/stories/STORY-OP-21-display-estimated-delivery-window/implementation-plan.md` (se crea en Fase 6)

**Implementation Steps Expected:**
- Develop the UI component to display the ETA.
- Integrate ETA calculation into the `POST /api/orders` logic.
- Ensure ETA is stored in the `orders` table.

---

## Notes
- Initial ETA calculation will be simple, based on fixed time windows or ranges.

---

## Related Documentation

- **Epic:** `.context/PBI/epics/EPIC-OP-19-delivery-click-collect-pilot-zone/epic.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-016)
- **API Contracts:** `.context/SRS/srs-api-contracts.yaml` (POST /api/orders)
