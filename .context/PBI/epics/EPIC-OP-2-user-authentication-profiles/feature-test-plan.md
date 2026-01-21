# Feature Test Plan: EPIC-OP-2 - User Accounts & Pet Profiles

**Fecha:** 2026-01-06
**QA Lead:** AI Assistant
**Epic Jira Key:** OP-2
**Status:** Draft

---

## 📋 Business Context Analysis

### Business Value

This epic is foundational for the OnePets platform. It enables user identification, secure access, and captures essential data for personalization and future transactional features. It directly supports the core value propositions of convenience and a tailored user experience.

**Key Value Proposition:**
- Secure and easy account management for pet owners.
- Personalized experience through pet profiles.
- Foundation for all e-commerce functionalities.

**Success Metrics (KPIs):**
- **Clientes registrados:** ≥ 300 accounts created in the first 3 months.
- **Tasa de recompra:** A smooth account and profile experience is a prerequisite for encouraging repeat purchases.

**User Impact:**
- **Carla, dueña de perro en depto:** Can easily re-order products and manage her pet's information without repetitive data entry.
- **Diego, dueño de gato indoor:** Can quickly set up his account and pet profile, which is essential for future subscription services.
- **Marcela, mamá con familia y varias mascotas:** Can manage multiple pet profiles under one account, simplifying the management of her household's pet needs.

**Critical User Journeys:**
- Reposición rápida de alimento con entrega a domicilio.
- Checkout con datos faltantes o inválidos.

---

## 🏗️ Technical Architecture Analysis

### Architecture Components Involved

**Frontend:**
- **Components:** Registration Form, Login Form, Pet Profile Form, Address Management Form.
- **Pages/Routes:** `/auth/signup`, `/auth/login`, `/account/profile`, `/account/pets`, `/account/addresses`.

**Backend:**
- **APIs:** `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/users/me`, `PUT /api/users/me`, `GET /api/pets`, `POST /api/pets`, `PUT /api/pets/{petId}`, `DELETE /api/pets/{petId}`, `POST /api/addresses`, `PUT /api/addresses/{addressId}`.
- **Services:** Authentication service, User profile service, Pet profile service, Address service.

**Database:**
- **Tables:** `profiles`, `pets`, `addresses`.
- **Queries:** CRUD operations on the above tables, with joins on `user_id`.

**External Services:**
- **Supabase Auth:** For user authentication, JWT generation, and secure password management.

### Integration Points (Critical for Testing)

**Internal Integration Points:**
- Frontend ↔ Backend API: For all user, pet, and address management operations.
- Backend ↔ Database: Ensuring data is correctly stored and retrieved from Supabase PostgreSQL, respecting RLS.
- Backend ↔ Auth Service: Validating JWTs and associating users with their data.

**Data Flow:**
User inputs (e.g., signup form) → Frontend components → Next.js API Routes → Supabase Auth & Database.

---

## 🚨 Risk Analysis

### Technical Risks

#### Risk 1: Data Synchronization Issues
- **Impact:** High
- **Likelihood:** Medium
- **Area Affected:** Backend/Database
- **Mitigation Strategy:** Use database triggers to keep `public.profiles` in sync with `auth.users`.
- **Test Coverage Required:** Integration tests to verify that creating a user in Supabase Auth correctly populates the `profiles` table.

#### Risk 2: Incorrect RLS Policy Implementation
- **Impact:** High
- **Likelihood:** Medium
- **Area Affected:** Database/Security
- **Mitigation Strategy:** Rigorous testing of RLS policies to ensure users can only access their own data.
- **Test Coverage Required:** Integration tests where one user attempts to access another user's data (and fails).

### Business Risks

#### Risk 1: Complex or Buggy Onboarding Process
- **Impact on Business:** High user drop-off during registration, failing to meet the target of 300 registered users.
- **Impact on Users:** Frustration for all user personas, leading to a negative first impression.
- **Likelihood:** Medium
- **Mitigation Strategy:** Simplify the registration form to the absolute minimum required fields for MVP. Extensive testing of the signup and login flows.
- **Acceptance Criteria Validation:** Ensure all scenarios in `STORY-OP-3` and `STORY-OP-4` are fully met.

---

## ⚠️ Critical Analysis & Questions for PO/Dev

### Ambiguities Identified

**Ambiguity 1:** Address Management
- **Found in:** STORY-OP-6-profile-address-update
- **Question for PO:** For the MVP, can a user have multiple addresses saved, or are they limited to a single address?
- **Impact if not clarified:** Affects the UI/UX for address management and the database schema (e.g., how to handle a "default" address).

### Missing Information

**Missing 1:** Detailed Password Policy
- **Needed for:** Implementing robust password validation on the frontend and backend.
- **Suggestion:** Define a clear password policy in `srs-non-functional-specs.md` (e.g., require special characters, numbers, etc.).

### Suggested Improvements (Before Implementation)

**Improvement 1:** Email Verification
- **Story Affected:** STORY-OP-3-user-signup-email
- **Suggested Change:** Implement a mandatory email verification step upon registration.
- **Benefit:** Reduces bot/spam accounts and ensures a valid communication channel with the user.

---

## 🎯 Test Strategy

### Test Scope

**In Scope:**
- User registration, login, and logout.
- CRUD operations for pet profiles.
- CRUD operations for user addresses.
- RLS policies for all user, pet, and address data.
- API contract validation for all related endpoints.
- UI/UX of all related forms and pages.

**Out of Scope (For This Epic):**
- Social logins.
- Advanced profile features (e.g., notification settings).
- Performance testing beyond basic API response time goals.

### Test Levels

- **Unit Testing:** >80% coverage on form validation, data transformation functions. (Dev responsibility)
- **Integration Testing:** All API endpoints, RLS policies, and database triggers. (QA + Dev)
- **E2E Testing:** Full user journey from registration to profile/pet management. (QA)
- **API Testing:** Contract validation for all endpoints using Postman or similar tools. (QA)

---

## 📊 Test Cases Summary by Story

### STORY-OP-3: User Signup with Email
- **Complexity:** Medium
- **Estimated Test Cases:** 8

### STORY-OP-4: User Login and Logout
- **Complexity:** Low
- **Estimated Test Cases:** 6

### STORY-OP-5: Pet Profile Management
- **Complexity:** Medium
- **Estimated Test Cases:** 10

### STORY-OP-6: Profile and Address Update
- **Complexity:** Medium
- **Estimated Test Cases:** 8

### Total Estimated Test Cases for Epic: 32

---

## 🗂️ Test Data Requirements

- **Valid Data Sets:** User data corresponding to the three user personas.
- **Invalid Data Sets:** Invalid email formats, short passwords, duplicate emails.
- **Boundary Data Sets:** Long names, empty strings, special characters.

---

## ✅ Entry/Exit Criteria

### Entry Criteria
- All stories in the epic are implemented and deployed to staging.
- Unit tests are passing with >80% coverage.
- No blocker bugs in dependent features.

### Exit Criteria
- All test cases executed, with 100% pass rate for critical/high priority tests.
- All critical/high bugs resolved.
- E2E tests for the epic are passing.

---

## 📝 Non-Functional Requirements Validation

- **NFR-S-2.1 (Authentication/Authorization):** All endpoints for this epic must be protected and validated with JWTs.
- **NFR-S-3.1 (RLS):** RLS policies for `profiles`, `pets`, and `addresses` must be verified.
- **NFR-P-1.2 (API Performance):** API response times for all endpoints in this epic must be < 500ms (p95).

---

## 🔄 Regression Testing Strategy

- **Regression Scope:** Since this is a foundational epic, there are no existing features to regress.
- **Regression Test Execution:** A small suite of E2E tests for this epic will form the initial regression suite for future epics.

---

## 📅 Testing Timeline Estimate

- **Estimated Duration:** 1.5 sprints
- **Breakdown:**
  - Test case design: 3 days
  - Test data preparation: 1 day
  - Test execution: 5 days
  - Bug fixing & re-testing: 3 days

---

## 🛠️ Tools & Infrastructure

- **E2E Testing:** Playwright
- **API Testing:** Postman/Newman
- **Unit Testing:** Vitest/Jest
- **Test Management:** Jira (manual for now)

---

## 📊 Metrics & Reporting

- **Test Metrics:** Pass/fail rate, bug count, test coverage.
- **Reporting:** Daily status updates, final QA sign-off report for the epic.
