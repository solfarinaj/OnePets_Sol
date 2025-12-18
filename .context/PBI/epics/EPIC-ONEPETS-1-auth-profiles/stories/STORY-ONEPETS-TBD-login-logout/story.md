# Login & logout

**Jira Key:** ONEPETS-TBD  
**Epic:** EPIC-ONEPETS-1-auth-profiles  
**Priority:** High  
**Story Points:** 3  
**Status:** To Do  
**Assignee:** null

---

## User Story

**As a** returning pet owner  
**I want to** log in and log out securely  
**So that** I can access my account and sign out when done

---

## Description

Enable login with email/password, handle invalid credentials, and provide logout to clear session. Update navbar/account state accordingly. Aligns with FR-002.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Successful login
- **Given** a registered user with valid credentials
- **When** they submit the login form
- **Then** a session is established and they are redirected to the account/home page with logged-in UI state

### Scenario 2: Invalid credentials
- **Given** wrong password or unknown email
- **When** login is attempted
- **Then** the system shows an “invalid credentials” error and does not create a session

### Scenario 3: Disabled/blocked user
- **Given** the account is disabled
- **When** login is attempted
- **Then** the system denies access with a clear message

### Scenario 4: Logout
- **Given** the user is logged in
- **When** they choose logout
- **Then** the session is cleared and the UI returns to logged-out state

### Scenario 5: Protected route redirect
- **Given** the user is logged out
- **When** they visit a protected route (e.g., `/account`)
- **Then** they are redirected to login with a message and redirect param

### Scenario 6: Session persistence
- **Given** the user logged in successfully
- **When** they refresh the page
- **Then** the session remains active if valid, otherwise they are logged out gracefully

---

## Technical Notes

### Frontend
- Login form with validation and error states; logout control in navbar.
- Persist session via Supabase client; handle 401 by redirecting to login.

### Backend / API
- Supabase Auth signInWithPassword; propagate auth state to UI.
- Logout clears auth session tokens.

### Database
- No additional tables; relies on `auth.users` and `profiles`.

### External Services
- Supabase Auth.

---

## Dependencies

### Blocked By
- Signup flow and Supabase env configuration.

### Blocks
- Access to profile, pets, favorites.

### Related Stories
- Email signup
- Update profile/address

---

## UI/UX Considerations

- Clear errors for invalid credentials; minimal information leakage.
- Loading states; keep CTA accessible on mobile.

---

## Definition of Done

- [ ] Login establishes session and updates UI.
- [ ] Invalid credentials handled with clear error.
- [ ] Logout clears session across tabs if feasible.
- [ ] Protected routes redirect unauthenticated users.
- [ ] Unit tests for auth hooks/state.
- [ ] Integration/E2E: login → protected page, logout flow.
- [ ] Docs updated (redirects, session handling).

---

## Testing Strategy

See `test-cases.md` for detailed cases (≥6) covering valid/invalid login, logout, protected routes, persistence.
