# Update profile and delivery address

**Jira Key:** ONEPETS-TBD  
**Epic:** EPIC-ONEPETS-1-auth-profiles  
**Priority:** Medium  
**Story Points:** 3  
**Status:** To Do  
**Assignee:** null

---

## User Story

**As a** authenticated pet owner  
**I want to** update my profile and delivery address  
**So that** my contact details and availability calculations are correct

---

## Description

Allow logged-in users to edit profile fields (name, phone) and manage a primary delivery address (line1, city, region, postalCode, country). Validate formats, enforce ownership, and recalculate pilot-zone eligibility as needed. Aligns with FR-004.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Update profile fields
- **Given** the user is logged in
- **When** they update their name/phone with valid values
- **Then** the profile is saved and the UI shows the updated data

### Scenario 2: Missing required address fields
- **Given** the user edits their address but omits required fields (line1, city, region, postalCode, country)
- **When** they submit
- **Then** validation fails and no address is saved

### Scenario 3: Invalid phone format
- **Given** the user enters an invalid phone number
- **When** they submit
- **Then** validation fails with a clear message

### Scenario 4: Address ownership
- **Given** an addressId that belongs to another user
- **When** the current user tries to update it
- **Then** the system returns 403 and does not persist changes

### Scenario 5: Pilot zone recalculation
- **Given** the user updates their address
- **When** the address is saved
- **Then** the system recalculates `withinPilotZone` and returns the updated flag

### Scenario 6: Empty address (remove)
- **Given** the user clears their address
- **When** they save
- **Then** the system removes the address and downstream availability checks handle “no address” gracefully

---

## Technical Notes

### Frontend
- Profile form with validation; address form with required fields.
- Show current pilot-zone status; toast/errors for validation failures.

### Backend / API
- Endpoints to update profile and address; enforce ownership by userId.
- Validate required fields and formats; recalc `withinPilotZone`.

### Database
- Tables: `profiles`, `addresses` (userId FK, line1, city, region, postalCode, country, withinPilotZone, createdAt/updatedAt); RLS by user.

### External Services
- Zone/pilot service for `withinPilotZone`.

---

## Dependencies

### Blocked By
- Auth session; address schema/pilot zone service.

### Blocks
- Availability per address in catalog; checkout flows.

### Related Stories
- Login/signup
- Availability per address (catalog)

---

## UI/UX Considerations

- Inline validation messages; clear indicator of pilot-zone eligibility.
- Mobile-friendly form; avoid accidental loss of data (confirm before clearing address).

---

## Definition of Done

- [ ] Profile and address updates enforce validation and ownership.
- [ ] Pilot-zone flag recalculated on address save.
- [ ] Unit tests for validation; integration tests for ownership and pilot-zone update.
- [ ] E2E: update profile and address, see changes reflected and eligibility updated.
- [ ] Docs updated (address requirements, pilot-zone behavior).

---

## Testing Strategy

See `test-cases.md` for detailed cases (≥6) covering validation, ownership, and pilot-zone recalculation.
