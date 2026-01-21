# Create Subscription

**Jira Key:** OP-26
**Epic:** EPIC-OP-25 (Subscription Management (Recurrent Food))
**Priority:** High
**Story Points:** 3
**Status:** To Do
**Assignee:** null

---

## User Story

**As a** pet owner
**I want to** convert an eligible food product into a recurring subscription with a chosen frequency
**So that** I receive regular deliveries and never run out of my pet's food.

---

## Description

This story enables users to initiate a new subscription for a food product. When a user selects a food product that is marked as `isSubscriptionEligible`, they should have the option to set up a recurring delivery, choosing a frequency (e.g., every 2, 4, or 6 weeks). The system will then create a new subscription record, which will be used to automatically generate future orders.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Successfully create a new subscription (Happy Path)
- **Given:** An authenticated user is on a product detail page for an eligible food product.
- **When:** They select the "Subscribe" option, choose a frequency (e.g., 4 weeks), and confirm.
- **Then:** A new subscription record is created, associated with the user and the chosen product.
- **And:** The `next_delivery_date` for the subscription is calculated based on the frequency.
- **And:** The user receives confirmation that their subscription has been set up.

### Scenario 2: Attempt to subscribe to an ineligible product
- **Given:** An authenticated user is viewing a product that is not marked as `isSubscriptionEligible`.
- **When:** They try to select a subscription option for that product.
- **Then:** The subscription option is either not displayed or is disabled.
- **And:** If attempted via API, the system returns an error indicating the product is not eligible.

### Scenario 3: Attempt to create subscription with invalid frequency
- **Given:** An authenticated user is attempting to create a subscription.
- **When:** They provide an invalid or unsupported frequency (e.g., 0 weeks, 100 weeks).
- **Then:** The system displays a validation error for the frequency.
- **And:** The subscription is not created.

---

## Technical Notes

### Frontend
- Modify product detail pages or catalog views to display a "Subscribe" option for eligible products.
- Provide a UI for users to select a subscription frequency.
- Integrate with the `POST /api/subscriptions` API endpoint to create the subscription.

### Backend
- **`POST /api/subscriptions`**: Endpoint to create a new subscription.
- This endpoint will validate:
    - User authentication.
    - Product eligibility (`is_subscription_eligible`).
    - Valid `frequency_weeks`.
    - Optionally, if linked to a `pet_id`, ensure the pet belongs to the user.
- It will calculate the initial `next_delivery_date`.

### Database
- **`public.subscriptions`**: A new record will be inserted with `user_id`, `product_id`, `pet_id` (optional), `frequency_weeks`, `status='active'`, and `next_delivery_date`.
- **`public.products`**: Used to check `is_subscription_eligible`.
- RLS policies on `subscriptions` are essential.

---

## Dependencies

### Blocked By
- EPIC-OP-2: User Accounts & Pet Profiles (for user and pet data).
- EPIC-OP-7: Essential Catalog & Product Discovery (for eligible products).

### Blocks
- STORY-OP-27: Manage Subscriptions (Pause/Cancel/Edit)
- STORY-OP-28: Subscription Reminders

### Related Stories
- None.

---

## UI/UX Considerations

- The subscription option should be clearly visible but not intrusive.
- The frequency selection should be straightforward.
- Clear confirmation message upon successful subscription.

---

## Definition of Done

- [ ] Users can create new subscriptions for eligible food products.
- [ ] Subscription frequency can be selected.
- [ ] Product eligibility is enforced.
- [ ] The `POST /api/subscriptions` API endpoint is implemented and tested.
- [ ] RLS policies are verified for the `subscriptions` table.

---

## Testing Strategy

See: `.context/PBI/epics/EPIC-OP-25-subscription-management-recurrent-food/stories/STORY-OP-26-create-subscription/test-cases.md` (se crea en Fase 5)

**Test Cases Expected:**
- Create a subscription for an eligible product with a valid frequency.
- Attempt to create a subscription for an ineligible product.
- Attempt to create a subscription with an invalid frequency.
- Verify the `next_delivery_date` calculation.
- Create multiple subscriptions for the same user.

---

## Implementation Plan

See: `.context/PBI/epics/EPIC-OP-25-subscription-management-recurrent-food/stories/STORY-OP-26-create-subscription/implementation-plan.md` (se crea en Fase 6)

**Implementation Steps Expected:**
- Modify product display components to show subscription option.
- Develop UI for frequency selection.
- Implement client-side logic for calling `POST /api/subscriptions`.
- Implement backend `POST /api/subscriptions` endpoint with business logic.

---

## Notes
- `next_delivery_date` will be calculated based on the `created_at` date plus the `frequency_weeks`.

---

## Related Documentation

- **Epic:** `.context/PBI/epics/EPIC-OP-25-subscription-management-recurrent-food/epic.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-020)
- **API Contracts:** `.context/SRS/srs-api-contracts.yaml` (POST /api/subscriptions)
