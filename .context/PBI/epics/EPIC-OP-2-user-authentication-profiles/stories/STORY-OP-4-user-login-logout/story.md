# User Login and Logout

**Jira Key:** OP-4
**Epic:** EPIC-OP-2 (User Accounts & Pet Profiles)
**Priority:** High
**Story Points:** 2
**Status:** To Do
**Assignee:** null

---

## User Story

**As a** registered pet owner
**I want to** log in and log out of my account
**So that** I can securely access my personal information and session.

---

## Description

This story enables users to authenticate themselves to access their accounts and to securely terminate their session. The login process will validate user credentials (email and password) against the stored records. A successful login will grant the user a session token (JWT). The logout functionality will invalidate this session, ensuring no further actions can be taken without re-authentication.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Successful Login (Happy Path)
- **Given:** A user with a registered account is on the login page.
- **When:** They enter their correct email and password.
- **And:** They click the "Login" button.
- **Then:** The system validates the credentials.
- **And:** The user is authenticated and a new session is created.
- **And:** The user is redirected to their dashboard or the application's home page.

### Scenario 2: Login with incorrect credentials
- **Given:** A user is on the login page.
- **When:** They enter an incorrect email or password.
- **And:** They click the "Login" button.
- **Then:** The system displays an error message: "Invalid credentials. Please try again."
- **And:** The user remains on the login page.

### Scenario 3: Successful Logout
- **Given:** An authenticated user is on any page of the application.
- **When:** They click the "Logout" button.
- **Then:** The user's session is terminated.
- **And:** The user is redirected to the home page or login page.
- **And:** Any sensitive user data is cleared from the client-side state.

---

## Technical Notes

### Frontend
- Create a login form component with fields for email and password.
- Use the `useAuth` hook from `src/contexts/auth-context.tsx` to call the `signIn` and `signOut` functions.
- Manage the user's session state globally within the application.
- Conditionally render UI elements (e.g., "Login" vs. "Logout" buttons) based on the user's authentication status.

### Backend
- Utilize the `POST /api/auth/login` endpoint for signing in.
- This endpoint will use Supabase's `auth.signInWithPassword` function.
- A `POST /api/auth/logout` endpoint will call Supabase's `auth.signOut`.

### Database
- **`auth.users`**: Credentials will be validated against this table by Supabase.
- **`auth.sessions`**: Supabase will manage session records.

---

## Dependencies

### Blocked By
- STORY-OP-3: User Signup with Email

### Blocks
- Most authenticated features of the application.

### Related Stories
- None.

---

## UI/UX Considerations

- The login form should be clear and accessible.
- Provide a "Forgot Password?" link.
- Give clear feedback upon successful login/logout (e.g., a toast notification or a redirect).

---

## Definition of Done

- [ ] A registered user can log in with valid credentials.
- [ ] An authenticated user can log out.
- [ ] The application state correctly reflects the user's authentication status.
- [ ] Unit tests for login/logout functionality.
- [ ] Integration tests for `/api/auth/login` and `/api/auth/logout` endpoints.
- [ ] E2E test for the full login and logout flow.
- [ ] Code has been reviewed and approved.

---

## Testing Strategy

See: `.context/PBI/epics/EPIC-OP-2-user-authentication-profiles/stories/STORY-OP-4-user-login-logout/test-cases.md` (se crea en Fase 5)

**Test Cases Expected:**
- Test login with correct credentials.
- Test login with incorrect password.
- Test login with a non-existent email.
- Test the logout functionality.
- Test accessing a protected route without being logged in.

---

## Implementation Plan

See: `.context/PBI/epics/EPIC-OP-2-user-authentication-profiles/stories/STORY-OP-4-user-login-logout/implementation-plan.md` (se crea en Fase 6)

**Implementation Steps Expected:**
- Create the UI for the login form.
- Implement the client-side logic to handle login and logout.
- Connect the UI to the `signIn` and `signOut` functions in the `AuthContext`.
- Create the `/api/auth/login` and `/api/auth/logout` API routes.
- Implement the API routes to call the respective Supabase Auth functions.

---

## Notes
- Session management will rely on the Supabase client library's handling of JWTs and refresh tokens.

---

## Related Documentation

- **Epic:** `.context/PBI/epics/EPIC-OP-2-user-authentication-profiles/epic.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-002)
- **API Contracts:** `.context/SRS/srs-api-contracts.yaml` (POST /api/auth/login)
