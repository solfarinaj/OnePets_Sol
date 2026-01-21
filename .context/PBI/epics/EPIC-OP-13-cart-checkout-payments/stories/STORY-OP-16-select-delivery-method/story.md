# Select Delivery Method

**Jira Key:** OP-16
**Epic:** EPIC-OP-13 (Cart, Checkout & Payments)
**Priority:** Critical
**Story Points:** 3
**Status:** To Do
**Assignee:** null

---

## User Story

**As a** pet owner
**I want to** choose between home delivery and pickup at a designated point
**So that** I can select the most convenient method for receiving my order.

---

## Description

This story enables users to select their preferred method of receiving the order during the checkout process. Options will include home delivery (to a pre-saved address, with availability checked against the pilot zone) and pickup from a designated physical location. The selection should clearly display any associated costs (e.g., delivery fees) and estimated timelines, and impact the final order total.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Select home delivery (Happy Path)
- **Given:** A user is in the checkout process with items in their cart.
- **And:** They have a valid saved address within the pilot zone.
- **When:** They select the "Home Delivery" option.
- **Then:** The system displays the saved delivery address.
- **And:** It shows the estimated delivery time and any applicable delivery fees.
- **And:** The final order total is updated to include delivery fees.

### Scenario 2: Select pickup
- **Given:** A user is in the checkout process with items in their cart.
- **When:** They select the "Pickup" option.
- **Then:** The system displays the designated pickup point's address and operating hours.
- **And:** No delivery fees are added to the order total.

### Scenario 3: Attempt home delivery with an invalid address
- **Given:** A user is in the checkout process with items in their cart.
- **When:** They select "Home Delivery" but have no saved address or an address outside the pilot zone.
- **Then:** The system prompts them to add/select a valid address or informs them that delivery is not available for their area.
- **And:** They cannot proceed with home delivery until the address issue is resolved.

---

## Technical Notes

### Frontend
- Develop UI components for selecting delivery options (radio buttons, dropdown, etc.).
- Display saved address details for home delivery.
- Dynamically show delivery fees and estimated times based on the selected method and address.
- Integrate with API to update the provisional order with the chosen delivery method.

### Backend
- The `POST /api/orders` endpoint or a cart update endpoint will need to accept `deliveryMethod` and `deliveryAddressId`.
- Validate the selected delivery address against the user's profile and pilot zone eligibility.
- Calculate and return delivery fees based on the chosen method.

### Database
- **`public.addresses`**: Used to validate delivery addresses and check `within_pilot_zone`.
- The `carts` or a provisional `orders` table will need to store the selected `deliveryMethod` and `deliveryAddressId`.

---

## Dependencies

### Blocked By
- STORY-OP-15: View Cart Summary
- STORY-OP-6: Profile and Address Update (for reliable address data)
- STORY-OP-11: Product Availability by Address (relevance for user's delivery expectation)

### Blocks
- STORY-OP-17: Process Payment

### Related Stories
- None.

---

## UI/UX Considerations

- Delivery options should be clearly presented early in the checkout flow.
- Transparency in delivery costs and estimated times.
- Easy to switch between delivery methods.

---

## Definition of Done

- [ ] Users can select between home delivery and pickup options.
- [ ] Delivery address is validated for home delivery.
- [ ] Delivery fees are accurately calculated and displayed.
- [ ] The final order total reflects the chosen delivery method.
- [ ] API endpoints support delivery method selection.
- [ ] Unit and integration tests cover delivery method selection and cost calculation.

---

## Testing Strategy

See: `.context/PBI/epics/EPIC-OP-13-cart-checkout-payments/stories/STORY-OP-16-select-delivery-method/test-cases.md` (se crea en Fase 5)

**Test Cases Expected:**
- Select home delivery for an address within the pilot zone.
- Select pickup option.
- Attempt home delivery with an address outside the pilot zone.
- Attempt home delivery with no saved address.
- Verify delivery fees are correctly applied/removed.

---

## Implementation Plan

See: `.context/PBI/epics/EPIC-OP-13-cart-checkout-payments/stories/STORY-OP-16-select-delivery-method/implementation-plan.md` (se crea en Fase 6)

**Implementation Steps Expected:**
- Create UI for delivery method selection.
- Implement client-side logic for handling selection and updating cart.
- Integrate with the backend API to pass selected method and address.
- Implement backend validation and fee calculation.

---

## Notes
- The pickup point will be a single, pre-defined location for the MVP.

---

## Related Documentation

- **Epic:** `.context/PBI/epics/EPIC-OP-13-cart-checkout-payments/epic.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-012)
- **API Contracts:** `.context/SRS/srs-api-contracts.yaml` (POST /api/orders)
