# Test Cases: STORY-OP-27 - Manage Subscriptions

**Fecha:** 2026-01-20
**QA Engineer:** AI Agent
**Story Jira Key:** OP-27
**Epic:** EPIC-OP-25 - Subscription Management (Recurrent Food)
**Status:** Draft

---

## 📋 Paso 1: Critical Analysis

### Business Context of This Story

**User Persona Affected:**
- **Primary:** Registered Pet Owner.

**Business Value:**
- **Value Proposition:** Flexibility. Prevents churn by allowing users to pause instead of cancelling.
- **Business Impact:** Customer satisfaction and retention.

**Related User Journey:**
- Journey: Account Maintenance
- Step: Subscription Management

---

### Technical Context of This Story

**Architecture Components:**

**Frontend:**
- Components: `SubscriptionCard`, `StatusActions`, `FrequencyDropdown`.
- Pages: `/profile/subscriptions`.

**Backend:**
- API Endpoints: `GET /api/subscriptions`, `PATCH /api/subscriptions/{id}`.
- Logic: `StateTransitionHandler`, `RecalculationService`.

**Integration Points:**
- Frontend ↔ Backend (Real-time status updates).

---

### Story Complexity Analysis

**Overall Complexity:** Medium

**Complexity Factors:**
- Logic: Medium (Recalculating dates correctly when resuming or changing frequency).
- Data Integrity: High (Ensuring no ghost orders for paused/cancelled subs).

**Estimated Test Effort:** Medium

---

## 🚨 Paso 2: Story Quality Analysis

### Ambiguities Identified

**Ambiguity 1:** "Resume" Date Logic
- **Location in Story:** Scenario 4
- **Question for PO:** If I resume a subscription that was paused for 3 months, when is the next delivery? Immediately? Or starting from now + frequency?
- **Impact on Testing:** Verification of `next_delivery_date`.
- **Suggested Clarification:** Resuming sets `next_delivery_date` to `Today + Frequency` (to avoid overwhelming the user with back-orders).

**Ambiguity 2:** Cancellation Reversibility
- **Location in Story:** Scenario 3
- **Question for Dev:** Can a cancelled subscription be "Resumed" later?
- **Impact on Testing:** State machine validation.
- **Suggested Clarification:** No. Cancellation is final. User must create a new one.

---

## ✅ Paso 3: Refined Acceptance Criteria

### Scenario 1: Pause Subscription (Happy Path)
**Type:** Positive
**Priority:** Critical

- **Given:** User has an "active" subscription.
- **When:** User clicks "Pause".
- **Then:**
  - Status becomes "paused".
  - UI shows "Subscription Paused".
  - `next_delivery_date` remains in DB but ignored by the order generator.

### Scenario 2: Resume Subscription
**Type:** Positive
**Priority:** High

- **Given:** User has a "paused" subscription.
- **When:** User clicks "Resume".
- **Then:**
  - Status becomes "active".
  - `next_delivery_date` is updated to `now() + frequency`.

### Scenario 3: Change Frequency
**Type:** Positive
**Priority:** Medium

- **Given:** User has 4-week frequency.
- **When:** Changes to 2 weeks.
- **Then:** `next_delivery_date` is recalculated (moving closer).

### Scenario 4: Unauthorized Edit (RLS)
**Type:** Security
**Priority:** Critical

- **Given:** User A owns subscription ID 10. User B is logged in.
- **When:** User B calls `PATCH /api/subscriptions/10`.
- **Then:** 403 Forbidden or 404 Not Found.

---

## 🧪 Paso 4: Test Design

### Test Outlines

#### **Validar flujo de Pausa y Reanudación**
**Type:** Positive
**Priority:** Critical
**Test Level:** E2E

**Test Steps:**
1. Create active sub.
2. Pause. Verify status in UI.
3. Resume. Verify `next_delivery_date` is in the future.

#### **Validar cancelación definitiva**
**Type:** Positive
**Priority:** High
**Test Level:** Integration

**Test Steps:**
1. Cancel sub.
2. Verify status is "cancelled".
3. Try to call `PATCH` to set status back to "active".

**Expected Result:**
- API returns error (Transition not allowed).

#### **Validar cambio de frecuencia y recalculo de fecha**
**Type:** Positive
**Priority:** High
**Test Level:** Unit

**Test Steps:**
1. Sub with 4 weeks created. `next_delivery_date` = Feb 1.
2. Change to 8 weeks.

**Expected Result:**
- `next_delivery_date` should be updated based on creation date or change date (Business rule check).

---

## 📊 Edge Cases Summary

| Edge Case | Test Case | Priority |
|Codes | --------- | -------- |
| Update while order is being processed | Concurrency Test | Medium |
| RLS Bypass | Security Test | Critical |

---

## 🎯 Next Steps

1. **Dev:** Implement the State Machine for status transitions.
2. **PO:** Confirm if "Cancel" allows a "Feedback survey" popup.
