# Test Cases: STORY-OP-4 - User Login and Logout

**Fecha:** 2026-01-20
**QA Engineer:** AI Agent
**Story Jira Key:** OP-4
**Epic:** EPIC-OP-2 - User Accounts & Pet Profiles
**Status:** Draft

---

## 📋 Paso 1: Critical Analysis

### Business Context of This Story

**User Persona Affected:**
- **Primary:** Registered Pet Owner.

**Business Value:**
- **Value Proposition:** Secure access to personal data and order history.
- **Business Impact:** Essential for retention and recurring revenue.

**Related User Journey:**
- Journey: Returning User
- Step: Login / Logout

---

### Technical Context of This Story

**Architecture Components:**

**Frontend:**
- Components: `LoginForm`, `LogoutButton`
- State: `AuthContext` (Session management)

**Backend:**
- API: `POST /api/auth/login`, `POST /api/auth/logout`
- Services: Supabase Auth

**Integration Points:**
- Frontend ↔ Supabase Auth (Client SDK or via Next.js Backend)

---

### Story Complexity Analysis

**Overall Complexity:** Medium

**Complexity Factors:**
- Business logic: Low
- Integration: Medium (Handling JWTs, Refresh Tokens, Cookies correctly in Next.js)
- Security: High (Handling sensitive credentials)

**Estimated Test Effort:** Medium

---

## 🚨 Paso 2: Story Quality Analysis

### Ambiguities Identified

**Ambiguity 1:** "Any sensitive user data is cleared from the client-side state"
- **Location in Story:** Scenario 3
- **Question for Dev:** Does this include LocalStorage/SessionStorage or just React State?
- **Impact on Testing:** Need to know where tokens are stored to verify they are gone.
- **Suggested Clarification:** Ensure Cookie/LocalStorage with JWT is removed.

### Edge Cases NOT Covered in Original Story

**Edge Case 1:** Session Expiry
- **Scenario:** User stays on page until token expires.
- **Expected Behavior:** Auto-refresh token or Redirect to login on next action.
- **Criticality:** High
- **Action Required:** Verify Refresh Token mechanism.

**Edge Case 2:** Login Redirection
- **Scenario:** User tries to access `/checkout` while logged out, gets redirected to Login. After Login, where do they go?
- **Expected Behavior:** Should go back to `/checkout`, not Home.
- **Criticality:** Medium (UX)
- **Action Required:** Add test case for "Redirect Back".

---

## ✅ Paso 3: Refined Acceptance Criteria

### Scenario 1: Successful Login (Happy Path)
**Type:** Positive
**Priority:** Critical

- **Given:** User "valid@test.com" exists with password "Pass123!".
- **When:** User enters correct credentials.
- **Then:**
  - UI redirects to Dashboard.
  - Auth Token is stored (Cookie/Storage).
  - UI header changes from "Login" to "Profile/Logout".

### Scenario 2: Invalid Credentials
**Type:** Negative
**Priority:** High

- **Given:** User is on Login page.
- **When:** User enters wrong password.
- **Then:** UI shows "Invalid credentials".

### Scenario 3: Successful Logout
**Type:** Positive
**Priority:** High

- **Given:** User is logged in.
- **When:** User clicks Logout.
- **Then:**
  - UI redirects to Home/Login.
  - Auth Token is removed from storage.
  - Back button does NOT restore session.

---

## 🧪 Paso 4: Test Design

### Test Outlines

#### **Validar login exitoso**
**Type:** Positive
**Priority:** Critical
**Test Level:** E2E

**Preconditions:**
- User exists.

**Test Steps:**
1. Navigate to `/auth/login`.
2. Enter valid Email/Password.
3. Click Login.

**Expected Result:**
- **UI:** User is redirected to Dashboard.
- **System:** `sb-access-token` (or equivalent) present in Cookies/Storage.

---

#### **Validar login fallido (Credenciales incorrectas)**
**Type:** Negative
**Priority:** High
**Parametrized:** Yes

**Test Data Sets:**
- Email: "valid@test.com", Pass: "WrongPass"
- Email: "nonexistent@test.com", Pass: "AnyPass"

**Expected Result:**
- **UI:** Error message visible. URL remains `/auth/login`.

---

#### **Validar Logout y limpieza de sesión**
**Type:** Positive
**Priority:** High
**Test Level:** E2E

**Preconditions:**
- User is logged in.

**Test Steps:**
1. Click "Logout".
2. Check Cookies/Storage.
3. Try to access `/profile` (Protected Route).

**Expected Result:**
- **System:** Token removed.
- **UI:** `/profile` redirects to `/auth/login`.

---

#### **Validar acceso a ruta protegida sin login**
**Type:** Negative
**Priority:** Medium
**Test Level:** Integration

**Test Steps:**
1. Navigate directly to `/profile`.

**Expected Result:**
- **UI:** Redirects to `/auth/login`.

---

## 📊 Edge Cases Summary

| Edge Case | Test Case | Priority |
|Codes | --------- | -------- |
| Session Expiry | TBD (Mock timer) | Medium |
| Redirect Back | Redirect Logic Test | Medium |

---

## 🎯 Next Steps

1. **Dev:** Confirm token storage strategy (Cookie vs LocalStorage).
2. **QA:** Manual verification of Redirect Back logic.
