# User Accounts & Pet Profiles

**Jira Key:** OP-2
**Status:** To Do
**Priority:** CRITICAL
**Phase:** Foundation

---

## Epic Description

This epic covers the fundamental features for user and pet management. It allows users to create accounts, log in, and manage their personal information and pet profiles. This is a critical prerequisite for any e-commerce functionality, as it establishes the user's identity and context for personalized experiences and order management.

**Business Value:**
- Enables user identification and secure access to the platform.
- Captures essential user and pet data to facilitate personalized product recommendations and a tailored user experience.
- Forms the foundation for all transactional features, including checkout, order history, and subscriptions.

---

## User Stories

1. **OP-3** - As a pet owner, I want to sign up with email and password so that I can manage my OnePets account.
2. **OP-4** - As a pet owner, I want to log in and log out so that I can access my data securely.
3. **OP-5** - As a pet owner, I want to register my pets with species, size and age so that OnePets can tailor products.
4. **OP-6** - As a pet owner, I want to update my personal info and delivery address so that my orders arrive correctly.

**NOTA:** Los IDs serán actualizados cuando se creen las stories en Jira (siguiente paso)

---

## Scope

### In Scope
- User registration with email, full name, and password.
- Secure user login and session management (JWT).
- Ability for users to add, view, and update multiple pet profiles (name, species, breed, age, weight, size).
- Ability for users to manage their primary delivery address.

### Out of Scope (Future)
- Social login (Google, Facebook, etc.).
- Advanced profile settings (e.g., notification preferences).
- Pet health records or detailed dietary information.
- Public user profiles.

---

## Acceptance Criteria (Epic Level)

1. ✅ A new user can successfully create an account and log in.
2. ✅ An authenticated user can add and view their pet's basic information.
3. ✅ An authenticated user can update their full name, phone number, and primary delivery address.
4. ✅ All user and pet data is securely stored and associated with the correct user account, respecting data privacy (RLS).
5. ✅ The system prevents registration with an already existing email address.

---

## Related Functional Requirements

- **FR-001:** User registration with email and password.
- **FR-002:** Login for registered users.
- **FR-003:** User can register one or more pets.
- **FR-004:** User can update their personal data and delivery address.

See: `.context/SRS/functional-specs.md`

---

## Technical Considerations

### Backend
- Next.js API Routes will handle all auth and profile-related requests.
- Supabase Auth will be used for user management and JWT generation.
- All endpoints must validate JWTs and enforce user-specific data access.

### Database Schema
**Tables:**
- `profiles`: Stores user-specific data, linked to Supabase's `auth.users` table.
- `pets`: Stores pet profiles, linked to the `profiles` table via `user_id`.
- `addresses`: Stores user addresses, linked to the `profiles` table via `user_id`.

**RLS Policies:**
- Row Level Security must be enabled on `profiles`, `pets`, and `addresses` to ensure users can only access their own data.

### Security Requirements
- Passwords must be securely hashed using bcrypt (handled by Supabase Auth).
- API endpoints must be protected and require a valid JWT.
- Input validation on all user-submitted data to prevent XSS and other injection attacks.

---

## Dependencies

### External Dependencies
- Supabase Auth for authentication.
- Vercel Postgres (via Supabase) for database storage.

### Internal Dependencies
- None. This is a foundational epic.

### Blocks
- EPIC 2: Essential Catalog & Product Discovery
- EPIC 3: Cart, Checkout & Payments
- EPIC 4: Delivery & Click & Collect
- EPIC 5: Subscription Management

---

## Success Metrics

### Functional Metrics
- User registration success rate > 98%.
- Login success rate > 99%.
- API response time for profile/pet data endpoints < 500ms (p95).

### Business Metrics
- Target: ≥ 300 registered accounts in the first 3 months.
- A significant portion of registered users complete their pet profiles.

---

## Risks & Mitigations

| Risk     | Impact          | Probability     | Mitigation           |
| -------- | --------------- | --------------- | -------------------- |
| Supabase Auth Outage | High | Low | Monitor Supabase status page; have a clear user communication plan for service disruptions. |
| Data Privacy Breach | High | Low | Strictly enforce RLS policies; conduct regular security audits of database rules and API endpoints. |

---

## Testing Strategy

See: `.context/PBI/epics/EPIC-OP-2-user-authentication-profiles/feature-test-plan.md` (se crea en Fase 5)

### Test Coverage Requirements
- **Unit Tests:** > 80% coverage for helper functions and utility classes related to user/pet data manipulation.
- **Integration Tests:** Cover all API endpoints for creating, reading, updating, and deleting user and pet data.
- **E2E Tests:** A test scenario covering the full sign-up, login, and profile update flow.

---

## Implementation Plan

See: `.context/PBI/epics/EPIC-OP-2-user-authentication-profiles/feature-implementation-plan.md` (se crea en Fase 6)

### Recommended Story Order
1. OP-3 - User Signup with Email
2. OP-4 - User Login and Logout
3. OP-5 - Pet Profile Management
4. OP-6 - Profile and Address Update

### Estimated Effort
- **Development:** 1 sprint
- **Testing:** 0.5 sprints
- **Total:** 1.5 sprints

---

## Notes

- The user's `id` in the `profiles` table will be a foreign key to the `id` in Supabase's `auth.users` table, creating a one-to-one relationship.

---

## Related Documentation

- **PRD:** `.context/PRD/mvp-scope.md`
- **SRS:** `.context/SRS/functional-specs.md` (FR-001 to FR-004)
- **Architecture:** `.context/SRS/srs-architecture-specs.md`
- **API Contracts:** `.context/SRS/srs-api-contracts.yaml`
