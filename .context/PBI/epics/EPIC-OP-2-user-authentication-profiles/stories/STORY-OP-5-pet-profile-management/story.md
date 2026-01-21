# Pet Profile Management

**Jira Key:** OP-5
**Epic:** EPIC-OP-2 (User Accounts & Pet Profiles)
**Priority:** High
**Story Points:** 5
**Status:** To Do
**Assignee:** null

---

## User Story

**As a** pet owner
**I want to** register and manage my pets' profiles, including their species, size, and age
**So that** OnePets can offer tailored products and a personalized experience.

---

## Description

This story allows authenticated users to create, view, update, and delete profiles for their pets. Each pet profile will capture essential information that helps the platform to filter and recommend relevant products. This is a core feature for personalization and is crucial for functionalities like food subscriptions tied to a specific pet.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Add a new pet profile (Happy Path)
- **Given:** An authenticated user is on their "My Pets" page.
- **When:** They click "Add Pet" and fill in the required fields (name, species, size, age).
- **And:** They save the new profile.
- **Then:** The new pet profile is created and associated with their account.
- **And:** The user sees the newly added pet in their list of pets.

### Scenario 2: View pet profiles
- **Given:** An authenticated user has one or more registered pets.
- **When:** They navigate to the "My Pets" page.
- **Then:** They see a list of all their registered pets with their key details.

### Scenario 3: Update an existing pet profile
- **Given:** An authenticated user is viewing one of their pet's profiles.
- **When:** They edit the pet's information (e.g., update weight or age).
- **And:** They save the changes.
- **Then:** The pet's profile is updated with the new information.

### Scenario 4: Attempt to add a pet with incomplete information
- **Given:** An authenticated user is adding a new pet.
- **When:** They leave a required field like "name" or "species" empty.
- **And:** They try to save the profile.
- **Then:** The system displays a validation error message for the missing field.
- **And:** The profile is not created.

---

## Technical Notes

### Frontend
- Create a "My Pets" page to display and manage pet profiles.
- Develop a form component for creating and editing a pet profile.
- Implement API calls to fetch, create, update, and delete pet data.
- State management to handle the list of pets and individual pet details.

### Backend
- **`GET /api/pets`**: Fetches all pets for the authenticated user.
- **`POST /api/pets`**: Creates a new pet profile.
- **`PUT /api/pets/{petId}`**: Updates an existing pet profile.
- **`DELETE /api/pets/{petId}`**: Deletes a pet profile.
- All endpoints must be protected and enforce ownership (a user can only manage their own pets).

### Database
- **`public.pets`**: This table will store all pet profiles. It has a foreign key `user_id` that links to the `profiles` table.
- RLS policies on the `pets` table are critical to ensure data privacy.

---

## Dependencies

### Blocked By
- STORY-OP-3: User Signup with Email
- STORY-OP-4: User Login and Logout

### Blocks
- STORY-OP-TBD: Food Subscription Management (as subscriptions can be linked to a pet).

### Related Stories
- None.

---

## UI/UX Considerations

- The interface for managing pets should be simple and intuitive, especially on mobile devices.
- Use clear and friendly language.
- Provide visual feedback for actions like saving or deleting a pet.

---

## Definition of Done

- [ ] An authenticated user can create, view, update, and delete their pet profiles.
- [ ] The UI correctly displays the user's pets.
- [ ] All API endpoints are implemented and tested.
- [ ] RLS policies are in place and verified.
- [ ] Unit and integration tests are written for the pet management functionality.
- [ ] Code has been reviewed and approved.

---

## Testing Strategy

See: `.context/PBI/epics/EPIC-OP-2-user-authentication-profiles/stories/STORY-OP-5-pet-profile-management/test-cases.md` (se crea en Fase 5)

**Test Cases Expected:**
- Add a new dog and a new cat profile.
- Edit an existing pet's name and age.
- Delete a pet profile.
- Attempt to access another user's pet profiles (should be blocked).
- Test form validation for required fields.

---

## Implementation Plan

See: `.context/PBI/epics/EPIC-OP-2-user-authentication-profiles/stories/STORY-OP-5-pet-profile-management/implementation-plan.md` (se crea en Fase 6)

**Implementation Steps Expected:**
- Design the database schema for the `pets` table (already done).
- Create the API endpoints for pet CRUD operations.
- Build the "My Pets" page UI.
- Build the pet creation/editing form UI.
- Integrate the UI with the backend APIs.

---

## Notes
- The `breed` field is optional, allowing for mixed-breed pets.
- The `size` and `species` fields are enums to ensure data consistency.

---

## Related Documentation

- **Epic:** `.context/PBI/epics/EPIC-OP-2-user-authentication-profiles/epic.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-003)
- **API Contracts:** `.context/SRS/srs-api-contracts.yaml` (GET /api/pets, POST /api/pets, etc.)
