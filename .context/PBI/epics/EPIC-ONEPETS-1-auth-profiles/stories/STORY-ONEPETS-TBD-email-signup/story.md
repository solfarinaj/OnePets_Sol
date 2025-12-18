# Email signup (Supabase Auth)

**Jira Key:** ONEPETS-TBD  
**Epic:** EPIC-ONEPETS-1-auth-profiles (Autenticación y perfiles)  
**Priority:** High  
**Story Points:** 3  
**Status:** To Do  
**Assignee:** null

---

## User Story

**As a** pet owner  
**I want to** create an account with email and password  
**So that** I can access my pets, profile, and future orders

---

## Description

Implement email/password signup via Supabase Auth, creating the auth user and initializing a `profiles` row. Validate email format and minimum password length, handle duplicate emails, and surface clear errors on mobile. Aligns with FR-001.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Happy path signup
- **Given** a valid email and password ≥ 8 chars
- **When** the user submits the signup form
- **Then** an account is created in Supabase Auth, a `profiles` row is initialized, and the user session is established

### Scenario 2: Duplicate email
- **Given** an email already registered
- **When** the user tries to sign up with that email
- **Then** the system shows an error indicating the email is already in use and does not create another account

### Scenario 3: Invalid email format
- **Given** an invalid email (missing @ or domain)
- **When** the form is submitted
- **Then** validation fails client-side and no request is sent

### Scenario 4: Weak password
- **Given** a password shorter than 8 chars
- **When** the form is submitted
- **Then** the system rejects it with a clear message and does not create the account

### Scenario 5: Backend failure
- **Given** the auth service is temporarily unavailable
- **When** signup is attempted
- **Then** an error is shown with a retry option; no partial profile row is left orphaned

---

## Technical Notes

### Frontend
- Client-side validation for email/password; show loading state.
- Post-signup redirect: configurable (e.g., `/account`); surface errors via toast/inline.

### Backend / API
- Use Supabase Auth email/password; on success, insert `profiles` row (userId, email, createdAt).
- Ensure transactional/compensating behavior if profile creation fails.

### Database
- Tables: `auth.users` (Supabase), `profiles` (app DB). Unique email enforced by Supabase.

### External Services
- Supabase Auth; email confirmation optional (define policy).

---

## Dependencies

### Blocked By
- Supabase env vars configured; `profiles` table with RLS.

### Blocks
- Login/logout, pet registration, address storage.

### Related Stories
- Login/logout
- Update profile/address

---

## UI/UX Considerations

- Clear error messages; password requirements shown before submit.
- Mobile-first form; disable submit while loading.

---

## Definition of Done

- [ ] Signup form validates email/password.
- [ ] Creates auth user and `profiles` row; handles rollback on failure.
- [ ] Session established after signup (or directs to login if email confirm required).
- [ ] Unit tests for validation and signup handler.
- [ ] Integration test: signup creates profile row.
- [ ] E2E: user signs up and lands in account area.
- [ ] Docs updated (flow, redirects, env requirements).

---

## Testing Strategy

See `test-cases.md` for detailed cases (≥6) covering happy path, validation, duplicate email, backend failure.
