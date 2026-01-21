# User Signup with Email

**Jira Key:** OP-3
**Epic:** EPIC-OP-2 (User Accounts & Pet Profiles)
**Priority:** High
**Story Points:** 3
**Status:** To Do
**Assignee:** null

---

## User Story

**As a** new pet owner
**I want to** sign up for an account using my email and a password
**So that** I can access the platform's features and manage my information.

---

## Description

This story covers the creation of a user registration flow. Users should be able to provide their full name, email address, and a password to create a new account. The system must ensure that the email is unique and the password meets basic security requirements. Upon successful registration, the user should be automatically logged in and redirected to the main dashboard or home page.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Successful registration (Happy Path)
- **Given:** A user is on the registration page.
- **When:** They enter a unique email, a valid password (min. 8 characters), and their full name.
- **And:** They click the "Sign Up" button.
- **Then:** The system creates a new user account.
- **And:** The user is authenticated and a session is created.
- **And:** The user is redirected to the application's home page.

### Scenario 2: Registration with an existing email
- **Given:** A user is on the registration page.
- **When:** They enter an email address that already exists in the system.
- **And:** They click the "Sign Up" button.
- **Then:** The system displays an error message: "An account with this email already exists."
- **And:** The user remains on the registration page.

### Scenario 3: Registration with a weak password
- **Given:** A user is on the registration page.
- **When:** They enter a password that is less than 8 characters long.
- **And:** They click the "Sign Up" button.
- **Then:** The system displays an error message: "Password must be at least 8 characters long."
- **And:** The user remains on the registration page.

### Scenario 4: Registration with missing required fields
- **Given:** A user is on the registration page.
- **When:** They leave the full name, email, or password field empty.
- **And:** They click the "Sign Up" button.
- **Then:** The system highlights the empty fields and displays a message like "This field is required."
- **And:** The user remains on the registration page.

---

## Technical Notes

### Frontend
- Create a registration form component with fields for full name, email, and password.
- Implement client-side validation for input fields.
- Use the `useAuth` hook from `src/contexts/auth-context.tsx` to call the `signUp` function.
- Display success or error messages to the user based on the API response.
- Redirect the user upon successful registration.

### Backend
- Utilize the `POST /api/auth/register` endpoint.
- The endpoint will use Supabase's `auth.signUp` function to create the new user in `auth.users`.
- A trigger on the `auth.users` table will insert a corresponding record into the `public.profiles` table.

### Database
- **`auth.users`**: Handled by Supabase Auth.
- **`public.profiles`**: A new row is created via a trigger when a user signs up. The `id`, `email`, and `full_name` will be populated.

---

## Dependencies

### Blocked By
- None.

### Blocks
- STORY-OP-TBD: User Login & Logout
- All other stories that require an authenticated user.

### Related Stories
- None.

---

## UI/UX Considerations

- The registration form should be simple and intuitive.
- Error messages should be clear and user-friendly.
- Provide clear feedback during the registration process (e.g., loading indicators).
- The password field should have a visibility toggle.

---

## Definition of Done

- [ ] A user can create a new account.
- [ ] Client-side and server-side validation is implemented.
- [ ] Unit tests for the registration form and validation logic are created.
- [ ] Integration tests for the `/api/auth/register` endpoint are implemented.
- [ ] E2E test for the complete registration flow.
- [ ] Code has been reviewed and approved.
- [ ] Deployed to staging and tested.

---

## Testing Strategy

See: `.context/PBI/epics/EPIC-OP-2-user-authentication-profiles/stories/STORY-OP-3-user-signup-email/test-cases.md` (se crea en Fase 5)

**Test Cases Expected:**
- Test with a valid, unique email and strong password.
- Test with an email that is already registered.
- Test with a password that does not meet the minimum length requirement.
- Test with empty required fields.
- Test form submission with invalid email format.

---

## Implementation Plan

See: `.context/PBI/epics/EPIC-OP-2-user-authentication-profiles/stories/STORY-OP-3-user-signup-email/implementation-plan.md` (se crea en Fase 6)

**Implementation Steps Expected:**
- Create the UI for the registration form.
- Implement the client-side logic to handle form submission and validation.
- Connect the form to the `signUp` function in the `AuthContext`.
- Create the `/api/auth/register` API route.
- Implement the API route logic to call Supabase Auth.
- Add database trigger to populate the `profiles` table.

---

## Notes

- This story is fundamental for the application and should be prioritized.

---

## Related Documentation

- **Epic:** `.context/PBI/epics/EPIC-OP-2-user-authentication-profiles/epic.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-001)
- **API Contracts:** `.context/SRS/srs-api-contracts.yaml` (POST /api/auth/register)
