# Test Cases: STORY-OP-3 - User Signup with Email

**Fecha:** 2026-01-20
**QA Engineer:** AI Agent
**Story Jira Key:** OP-3
**Epic:** EPIC-OP-2 - User Accounts & Pet Profiles
**Status:** Draft

---

## 📋 Paso 1: Critical Analysis

### Business Context of This Story

**User Persona Affected:**
- **Primary:** Pet Owner (New) - Wants to join the platform to buy products.

**Business Value:**
- **Value Proposition:** Entry point for new customers. Without signup, no sales.
- **Business Impact:** Directly affects User Acquisition Rate. High friction here = high drop-off.

**Related User Journey:**
- Journey: New User Onboarding
- Step: 1 (Registration)

---

### Technical Context of This Story

**Architecture Components:**

**Frontend:**
- Components: `SignupForm`, `Input`, `Button`
- Pages/Routes: `/auth/register`
- State Management: `AuthContext` (React Context)

**Backend:**
- API Endpoints: `POST /api/auth/register` (Wrapper around Supabase SDK)
- Services: Supabase Auth
- Database: `auth.users` (managed by Supabase), `public.profiles` (via Trigger)

**Integration Points:**
- Frontend ↔ Supabase Auth
- Database Trigger (`auth.users` → `public.profiles`)

---

### Story Complexity Analysis

**Overall Complexity:** Medium

**Complexity Factors:**
- Business logic complexity: Low (Standard auth)
- Integration complexity: Medium (Sync between Auth and Profiles via Trigger)
- Data validation complexity: Low (Standard email/password rules)

**Estimated Test Effort:** Medium
**Rationale:** Critical path with database side-effects (Trigger) that must be verified.

---

## 🚨 Paso 2: Story Quality Analysis

### Ambiguities Identified

**Ambiguity 1:** "Password meets basic security requirements"
- **Location in Story:** Description
- **Question for PO/Dev:** What are the exact rules besides "min 8 chars"? (Complexity? Numbers? Symbols?)
- **Impact on Testing:** Cannot test boundary cases for password complexity without exact rules.
- **Suggested Clarification:** Min 8 chars, at least 1 number, at least 1 letter.

### Edge Cases NOT Covered in Original Story

**Edge Case 1:** Rate Limiting / Abuse
- **Scenario:** User tries to sign up multiple times rapidly from same IP.
- **Expected Behavior:** Supabase usually handles this. Frontend should show a generic error.
- **Criticality:** Medium
- **Action Required:** Add test case for rapid submission.

**Edge Case 2:** Profile Trigger Failure
- **Scenario:** Auth user is created but `public.profiles` insert fails (db constraint/error).
- **Expected Behavior:** System should handle this zombie state (user exists but has no profile). Ideally rollback or retry.
- **Criticality:** High
- **Action Required:** Verify DB consistency in test.

---

## ✅ Paso 3: Refined Acceptance Criteria

### Scenario 1: Successful registration (Happy Path)
**Type:** Positive
**Priority:** Critical

- **Given:** User is on `/auth/register`.
- **When:** User enters valid unique email "newuser@test.com", password "SecurePass123!", and name "John Doe".
- **Then:**
  - UI redirects to Home/Dashboard.
  - `auth.users` contains new record.
  - `public.profiles` contains new record with correct `full_name`.

### Scenario 2: Duplicate Email
**Type:** Negative
**Priority:** High

- **Given:** User "existing@test.com" already exists.
- **When:** User tries to sign up with "existing@test.com".
- **Then:** UI displays "An account with this email already exists."

### Scenario 3: Invalid Email Format
**Type:** Negative
**Priority:** Medium

- **Given:** User enters "invalid-email".
- **When:** User clicks Sign Up.
- **Then:** Client-side validation shows "Please enter a valid email."

---

## 🧪 Paso 4: Test Design

### Test Outlines

#### **Validar registro exitoso con datos válidos**
**Type:** Positive
**Priority:** Critical
**Test Level:** E2E

**Preconditions:**
- Database is clean or user does not exist.

**Test Steps:**
1. Navigate to `/auth/register`.
2. Enter Full Name: "Test User".
3. Enter Email: `faker.internet.email()`.
4. Enter Password: "Password123!".
5. Click "Sign Up".

**Expected Result:**
- **UI:** Redirects to `/`.
- **Database:** Query `public.profiles` where email = input returns 1 row.

---

#### **Validar error al registrar email existente**
**Type:** Negative
**Priority:** High
**Test Level:** Integration

**Preconditions:**
- User "duplicate@test.com" already exists.

**Test Steps:**
1. Navigate to `/auth/register`.
2. Enter Email: "duplicate@test.com".
3. Enter valid password and name.
4. Click "Sign Up".

**Expected Result:**
- **UI:** Error message "An account with this email already exists." visible.

---

#### **Validar creación de perfil en DB (Trigger Verification)**
**Type:** Integration
**Priority:** Critical
**Test Level:** Backend/Integration

**Preconditions:**
- No user logged in.

**Test Steps:**
1. Call `POST /api/auth/register` via API client with valid payload.

**Expected Result:**
- **Status Code:** 200/201.
- **Database:** Check `public.profiles` for new entry matching the `auth.uid`.

---

#### **Validar validación de contraseña débil**
**Type:** Negative
**Priority:** Medium
**Parametrized:** Yes

**Test Data Sets:**
- "short" (5 chars)
- "1234567" (7 chars)

**Expected Result:**
- **UI:** Error "Password must be at least 8 characters long."

---

## 📊 Edge Cases Summary

| Edge Case | Test Case | Priority |
|Codes | --------- | -------- |
| Rate Limiting | TBD | Low |
| Trigger Failure | Trigger Verification Test | High |
| SQL Injection in inputs | Security Test | Medium |

---

## 🎯 Next Steps

1. **Dev:** Confirm password complexity rules.
2. **Dev:** Ensure database trigger for `public.profiles` is idempotent or robust.
3. **QA:** Automate Happy Path first.
