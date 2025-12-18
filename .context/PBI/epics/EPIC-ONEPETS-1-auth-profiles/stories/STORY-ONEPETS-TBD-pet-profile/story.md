# Register and manage pet profiles

**Jira Key:** ONEPETS-TBD  
**Epic:** EPIC-ONEPETS-1-auth-profiles  
**Priority:** Medium  
**Story Points:** 5  
**Status:** To Do  
**Assignee:** null

---

## User Story

**As a** logged-in pet owner  
**I want to** add and edit my pets’ basic info  
**So that** I can personalize recommendations and orders

---

## Description

Allow authenticated users to create and update pet profiles (name, species, breed, weight, size, age). Validate enums and required fields. Ensure users cannot access or edit others’ pets. Aligns with FR-003.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Add pet (happy path)
- **Given** the user is authenticated
- **When** they submit a new pet with valid fields (species dog|cat, name provided)
- **Then** the pet is saved and shown in their list

### Scenario 2: Missing required fields
- **Given** the user omits required fields (e.g., name)
- **When** they submit
- **Then** validation fails with clear messages and no pet is created

### Scenario 3: Invalid enums
- **Given** the user submits `species=bird` or size outside allowed values
- **When** they submit
- **Then** the system rejects with validation error and no row is created

### Scenario 4: Edit pet
- **Given** the user has an existing pet
- **When** they update fields (e.g., weight, size)
- **Then** the changes are saved and shown in the pet profile

### Scenario 5: Unauthorized access
- **Given** a pet belongs to another user
- **When** the current user tries to edit it
- **Then** the system returns 403 and no changes are made

### Scenario 6: List pets
- **Given** the user has added pets
- **When** they open the pets list
- **Then** only their pets are shown; empty state if none exist

---

## Technical Notes

### Frontend
- Form with validation (species enum, name required); list with empty state.
- Edit modal/page for updates; toast for success/error.

### Backend / API
- Endpoints: create/update/list pets. Require auth; enforce ownership by userId.
- Validate enums and numeric ranges (age, weight).

### Database
- `pets` table with fields: id, userId (FK), name, species, breed, ageYears, weightKg, size, createdAt/updatedAt; RLS to restrict to owner.

### External Services
- None.

---

## Dependencies

### Blocked By
- Auth session in place; pets table with RLS.

### Blocks
- Personalized catalog, nutrition recommendations.

### Related Stories
- Update profile/address
- Login/signup

---

## UI/UX Considerations

- Mobile-friendly form; show enum choices clearly.
- Empty state inviting to add first pet.

---

## Definition of Done

- [ ] Create/edit/list pets works with ownership checks.
- [ ] Validation for required fields and enums.
- [ ] Unit tests for form and API validation.
- [ ] Integration tests for ownership enforcement.
- [ ] E2E: add pet, edit pet, list shows only owned pets.
- [ ] Docs updated (API contract, enum values).

---

## Testing Strategy

See `test-cases.md` for detailed cases (≥6) aligned to FR-003 and RLS/ownership.
