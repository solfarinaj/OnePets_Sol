# Select Pickup Option

**Jira Key:** OP-22
**Epic:** EPIC-OP-19 (Delivery & Click & Collect (Pilot Zone))
**Priority:** High
**Story Points:** 2
**Status:** To Do
**Assignee:** null

---

## User Story

**As a** pet owner
**I want to** choose to pick up my order at a designated physical point
**So that** I can collect it at my convenience without waiting for home delivery.

---

## Description

This story enables users to select a "pickup" option during checkout as an alternative to home delivery. When selected, the system will display details of the designated pickup point (e.g., address, operating hours) and ensure that no delivery fees are applied to the order. This provides flexibility for users who prefer to collect their orders themselves.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Select pickup option (Happy Path)
- **Given:** A user is in the checkout process with items in their cart.
- **When:** They select the "Pickup" option.
- **Then:** The system displays the address and operating hours of the designated pickup point.
- **And:** Any calculated delivery fees are removed from the order total.

### Scenario 2: Switch from home delivery to pickup
- **Given:** A user has previously selected "Home Delivery" during checkout.
- **When:** They change their selection to "Pickup".
- **Then:** The delivery address fields are no longer required.
- **And:** Any previously added delivery fees are removed from the order total.

---

## Technical Notes

### Frontend
- Develop UI components to allow users to select the pickup option (e.g., a radio button or toggle).
- Display the pickup point's address and operating hours.
- Update the order summary to remove delivery fees.

### Backend
- The `POST /api/orders` endpoint (from EPIC-OP-13) will accept `deliveryMethod = 'pickup'`.
- If `deliveryMethod` is 'pickup', ensure that `delivery_address_id` is null or not required, and `shipping_cost` is set to 0.

### Database
- The `orders` table will store `delivery_method` as 'pickup'.
- No `delivery_address_id` will be associated with the order if it's a pickup.

---

## Dependencies

### Blocked By
- STORY-OP-16: Select Delivery Method (this story defines the alternate option).

### Blocks
- None directly for this epic, but is an integral part of order fulfillment.

### Related Stories
- None.

---

## UI/UX Considerations

- The pickup option should be clearly visible alongside delivery options.
- Provide clear information about the pickup location and hours.
- Ensure the transition between delivery options is smooth and updates the order total correctly.

---

## Definition of Done

- [ ] Users can select pickup as a delivery method.
- [ ] Pickup location details are displayed to the user.
- [ ] Delivery fees are correctly removed when pickup is selected.
- [ ] API endpoints support the pickup method.
- [ ] Unit tests for pickup logic.
- [ ] Integration tests for API endpoint handling pickup.

---

## Testing Strategy

See: `.context/PBI/epics/EPIC-OP-19-delivery-click-collect-pilot-zone/stories/STORY-OP-22-select-pickup-option/test-cases.md` (se crea en Fase 5)

**Test Cases Expected:**
- Select pickup and verify no delivery fees are applied.
- Switch from home delivery to pickup and verify fee removal.
- Verify pickup location details are displayed.

---

## Implementation Plan

See: `.context/PBI/epics/EPIC-OP-19-delivery-click-collect-pilot-zone/stories/STORY-OP-22-select-pickup-option/implementation-plan.md` (se crea en Fase 6)

**Implementation Steps Expected:**
- Create UI elements for pickup selection.
- Implement client-side logic to handle pickup selection.
- Update the `POST /api/orders` endpoint to process pickup orders correctly.

---

## Notes
- The pickup location will be a single, static entry for the MVP.

---

## Related Documentation

- **Epic:** `.context/PBI/epics/EPIC-OP-19-delivery-click-collect-pilot-zone/epic.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-017)
- **API Contracts:** `.context/SRS/srs-api-contracts.yaml` (POST /api/orders)
