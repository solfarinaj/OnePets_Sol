# Profile and Address Update

**Jira Key:** OP-6
**Epic:** EPIC-OP-2 (User Accounts & Pet Profiles)
**Priority:** High
**Story Points:** 3
**Status:** To Do
**Assignee:** null

---

## User Story

**As a** registered pet owner
**I want to** update my personal information and delivery address
**So that** my orders are sent to the correct location and I can be contacted if needed.

---

## Description

This story allows authenticated users to manage their profile information, including their full name, phone number, and primary delivery address. This is essential for ensuring accurate order fulfillment and communication. The system should provide a clear interface for users to view and edit their data.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Successfully update profile information (Happy Path)
- **Given:** An authenticated user is on their "My Profile" page.
- **When:** They change their full name or phone number.
- **And:** They click the "Save Changes" button.
- **Then:** The system updates their profile information.
- **And:** The user sees a confirmation message that their profile has been updated.

### Scenario 2: Successfully update delivery address
- **Given:** An authenticated user is on their "Address Management" page.
- **When:** They edit their primary delivery address details.
- **And:** They click the "Save Address" button.
- **Then:** The system updates the address and re-evaluates if it is within the pilot zone.
- **And:** The user sees the updated address information.

### Scenario 3: Attempt to save an invalid address
- **Given:** An authenticated user is editing their address.
- **When:** They enter an incomplete or invalid address (e.g., missing postal code).
- **And:** They click the "Save Address" button.
- **Then:** The system displays validation errors for the incorrect fields.
- **And:** The address is not saved.

---

## Technical Notes

### Frontend
- Create a "My Profile" or "Account Settings" page with forms for editing user and address information.
- Implement API calls to `PUT /api/users/me` and `PUT /api/addresses/{addressId}`.
- Ensure that the UI provides clear feedback to the user upon successful updates or validation errors.

### Backend
- **`PUT /api/users/me`**: Updates the `full_name` and `phone` in the `profiles` table for the authenticated user.
- **`PUT /api/addresses/{addressId}`**: Updates a specific address entry. This endpoint must verify that the address belongs to the authenticated user.
- When an address is updated, the `within_pilot_zone` flag must be recalculated based on the new address.

### Database
- **`public.profiles`**: The `full_name` and `phone` columns will be updated.
- **`public.addresses`**: The relevant address row will be updated. The `within_pilot_zone` field will be re-calculated.

---

## Dependencies

### Blocked By
- STORY-OP-3: User Signup with Email
- STORY-OP-4: User Login and Logout

### Blocks
- EPIC-3: Cart, Checkout & Payments (requires a valid delivery address).

### Related Stories
- None.

---

## UI/UX Considerations

- Forms should be pre-filled with the user's current information.
- Use clear labels and provide examples for address fields where appropriate.
- A single "Save" button for each section (profile, address) is preferred.

---

## Definition of Done

- [ ] An authenticated user can update their name and phone number.
- [ ] An authenticated user can update their primary delivery address.
- [ ] The `within_pilot_zone` status is correctly updated when an address is changed.
- [ ] All relevant API endpoints are implemented and tested.
- [ ] RLS policies are in place to ensure users can only edit their own information.
- [ ] Unit and integration tests cover the update functionality.

---

## Testing Strategy

See: `.context/PBI/epics/EPIC-OP-2-user-authentication-profiles/stories/STORY-OP-6-profile-address-update/test-cases.md` (se crea en Fase 5)

**Test Cases Expected:**
- Update user's full name.
- Update user's phone number.
- Update delivery address to a location within the pilot zone.
- Update delivery address to a location outside the pilot zone.
- Attempt to save an address with missing required fields.

---

## Implementation Plan

See: `.context/PBI/epics/EPIC-OP-2-user-authentication-profiles/stories/STORY-OP-6-profile-address-update/implementation-plan.md` (se crea en Fase 6)

**Implementation Steps Expected:**
- Create the UI for the profile and address management forms.
- Implement the client-side logic for handling form submissions.
- Create the API endpoints for updating user and address data.
- Implement the business logic for recalculating the `within_pilot_zone` flag.

---

## Notes
- For the MVP, we will assume a user has only one primary address. Multi-address management will be a future enhancement.

---

## Related Documentation

- **Epic:** `.context/PBI/epics/EPIC-OP-2-user-authentication-profiles/epic.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-004)
- **API Contracts:** `.context/SRS/srs-api-contracts.yaml`
