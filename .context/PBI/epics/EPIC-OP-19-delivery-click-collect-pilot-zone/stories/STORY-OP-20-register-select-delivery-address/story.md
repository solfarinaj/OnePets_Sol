# Register and Select Delivery Address

**Jira Key:** OP-20
**Epic:** EPIC-OP-19 (Delivery & Click & Collect (Pilot Zone))
**Priority:** High
**Story Points:** 3
**Status:** To Do
**Assignee:** null

---

## User Story

**As a** pet owner
**I want to** register and select a delivery address within the pilot zone
**So that** I can have my orders delivered directly to my home.

---

## Description

This story builds upon the address management capabilities from EPIC-OP-2. It focuses on explicitly allowing users to register multiple delivery addresses, with a clear indication of which addresses fall within the designated "pilot zone" for fast delivery. Users should be able to set a default delivery address for convenience. This is critical for the fulfillment of home delivery orders.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Register a new address within the pilot zone (Happy Path)
- **Given:** An authenticated user is on the "My Addresses" page.
- **When:** They add a new address that is recognized as being within the pilot zone.
- **Then:** The address is saved and marked as `within_pilot_zone = true`.
- **And:** The user can select it as their default delivery address.

### Scenario 2: Register a new address outside the pilot zone
- **Given:** An authenticated user is on the "My Addresses" page.
- **When:** They add a new address that is recognized as being outside the pilot zone.
- **Then:** The address is saved and marked as `within_pilot_zone = false`.
- **And:** The system indicates that fast delivery is not available for this address.

### Scenario 3: Set a default delivery address
- **Given:** An authenticated user has multiple saved addresses.
- **When:** They select one of their addresses to be the default.
- **Then:** The selected address is marked as the default for future orders.

### Scenario 4: Edit an existing address
- **Given:** An authenticated user is editing a saved address.
- **When:** They modify the address details.
- **Then:** The system updates the address and re-evaluates its `within_pilot_zone` status.

---

## Technical Notes

### Frontend
- Create a user interface for managing multiple delivery addresses.
- Allow users to add, edit, and delete addresses.
- Visually indicate if an address is within the pilot zone.
- Provide a mechanism to set a default address.

### Backend
- **`POST /api/addresses`**: Endpoint to add a new address for the authenticated user.
- **`PUT /api/addresses/{addressId}`**: Endpoint to update an existing address.
- **`DELETE /api/addresses/{addressId}`**: Endpoint to remove an address.
- Logic to determine `within_pilot_zone` status for a given address (e.g., geocoding service integration or predefined postal codes).
- Endpoint to set a user's `default_address_id` in their profile.

### Database
- **`public.addresses`**: Stores delivery addresses, including `user_id` and `within_pilot_zone`.
- **`public.profiles`**: Will have a `default_address_id` column which is a foreign key to `public.addresses`.
- RLS policies for `addresses` and `profiles` are critical.

---

## Dependencies

### Blocked By
- EPIC-OP-2: User Accounts & Pet Profiles (for basic user profile management).
- STORY-OP-6: Profile and Address Update (expands on this).

### Blocks
- STORY-OP-21: Display Estimated Delivery Window
- STORY-OP-22: Select Pickup Option (as home delivery is an alternative)
- All delivery-related features in EPIC-OP-13.

### Related Stories
- None.

---

## UI/UX Considerations

- Address forms should be clear and auto-suggest (if possible, future enhancement).
- Clear visual distinctions between addresses in and out of the pilot zone.
- Easy selection of a default address.

---

## Definition of Done

- [ ] Authenticated users can add, edit, and delete delivery addresses.
- [ ] Addresses are correctly marked as `within_pilot_zone`.
- [ ] Users can set a default delivery address.
- [ ] All related API endpoints are implemented and tested.
- [ ] RLS policies are verified.

---

## Testing Strategy

See: `.context/PBI/epics/EPIC-OP-19-delivery-click-collect-pilot-zone/stories/STORY-OP-20-register-select-delivery-address/test-cases.md` (se crea en Fase 5)

**Test Cases Expected:**
- Add an address within the pilot zone.
- Add an address outside the pilot zone.
- Set a newly added address as default.
- Edit an existing address and verify `within_pilot_zone` status updates.
- Delete an address.
- Attempt to delete the last remaining address (should be handled gracefully or blocked if no default is set).

---

## Implementation Plan

See: `.context/PBI/epics/EPIC-OP-19-delivery-click-collect-pilot-zone/stories/STORY-OP-20-register-select-delivery-address/implementation-plan.md` (se crea en Fase 6)

**Implementation Steps Expected:**
- Develop the UI for address management.
- Implement client-side logic for address CRUD operations.
- Create backend API endpoints for address management.
- Implement logic for pilot zone detection.
- Update `profiles` table for `default_address_id`.

---

## Notes
- The initial pilot zone definition can be a simple list of postal codes.

---

## Related Documentation

- **Epic:** `.context/PBI/epics/EPIC-OP-19-delivery-click-collect-pilot-zone/epic.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-015)
- **API Contracts:** `.context/SRS/srs-api-contracts.yaml` (POST /api/addresses, PUT /api/addresses/{id}, DELETE /api/addresses/{id})
