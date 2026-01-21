# Test Cases: STORY-OP-26 - Create Subscription

**Fecha:** 2026-01-20
**QA Engineer:** AI Agent
**Story Jira Key:** OP-26
**Epic:** EPIC-OP-25 - Subscription Management (Recurrent Food)
**Status:** Draft

---

## 📋 Paso 1: Critical Analysis

### Business Context of This Story

**User Persona Affected:**
- **Primary:** Registered Pet Owner.

**Business Value:**
- **Value Proposition:** Convenience and peace of mind (Never run out of food).
- **Business Impact:** Predictable recurring revenue. High customer stickiness.

**Related User Journey:**
- Journey: Recurring Purchase
- Step: Subscription Enrollment

---

### Technical Context of This Story

**Architecture Components:**

**Frontend:**
- Components: `SubscriptionToggle`, `FrequencyPicker`, `ConfirmationToast`.
- Pages: `/products/[id]`.

**Backend:**
- API Endpoints: `POST /api/subscriptions`.
- Services: `SubscriptionService` (Date math).
- Database: `public.subscriptions`.

**Integration Points:**
- Frontend ↔ Backend API.
- Backend ↔ Auth (User mapping).

---

### Story Complexity Analysis

**Overall Complexity:** Medium

**Complexity Factors:**
- Logic: Medium (Calculating dates, validating eligibility).
- UI: Low.

**Estimated Test Effort:** Medium

---

## 🚨 Paso 2: Story Quality Analysis

### Ambiguities Identified

**Ambiguity 1:** Allowed Frequencies
- **Location in Story:** Description
- **Question for PO:** What are the EXACT allowed frequencies? (e.g., Only even weeks? Any number 1-12?)
- **Impact on Testing:** Validation boundaries.
- **Suggested Clarification:** Enum: `2 weeks`, `4 weeks`, `6 weeks`, `8 weeks`.

**Ambiguity 2:** Multiple Subscriptions for same product
- **Location in Story:** Testing Strategy
- **Question for PO:** Can a user have 2 subscriptions for the same SKU? (e.g., for 2 different pets).
- **Impact on Testing:** Uniqueness constraint testing.
- **Suggested Clarification:** Yes, if `pet_id` is different. If no `pet_id`, limited to 1 per user per product.

---

## ✅ Paso 3: Refined Acceptance Criteria

### Scenario 1: Create Subscription (Happy Path)
**Type:** Positive
**Priority:** Critical

- **Given:** Product "Dog Chow" is eligible. User is logged in.
- **When:** Selects "4 weeks" frequency and clicks "Subscribe".
- **Then:**
  - `subscriptions` record created.
  - `next_delivery_date` = `now() + 28 days`.
  - UI shows "Success".

### Scenario 2: Ineligible Product
**Type:** Negative
**Priority:** High

- **Given:** Product "Toy Bone" has `is_subscription_eligible = false`.
- **When:** User views product.
- **Then:** Subscription option is hidden or disabled.

### Scenario 3: Invalid Frequency (API Level)
**Type:** Negative
**Priority:** Medium

- **When:** Call `POST /api/subscriptions` with `frequency_weeks: 99`.
- **Then:** 400 Bad Request.

---

## 🧪 Paso 4: Test Design

### Test Outlines

#### **Validar creación de suscripción válida**
**Type:** Positive
**Priority:** Critical
**Test Level:** E2E

**Preconditions:**
- Product is eligible.

**Test Steps:**
1. Go to product page.
2. Select frequency 4 weeks.
3. Click Subscribe.

**Expected Result:**
- **UI:** Redirect or Toast.
- **DB:** Check `next_delivery_date` logic.

---

#### **Validar restricción de producto no elegible**
**Type:** Negative
**Priority:** High
**Test Level:** UI

**Test Steps:**
1. Navigate to a non-food product.
2. Verify Subscription controls are not present.

---

#### **Validar cálculo de fecha de próxima entrega**
**Type:** Positive
**Priority:** High
**Test Level:** Unit/Integration

**Test Steps:**
1. Mock current date to 2026-01-01.
2. Create subscription with frequency 2 weeks.

**Expected Result:**
- `next_delivery_date` must be 2026-01-15.

---

## 📊 Edge Cases Summary

| Edge Case | Test Case | Priority |
|Codes | --------- | -------- |
| Subscribe to same product twice | Duplicate Test | Medium |
| Product becomes ineligible after subscribe | Future regression | High |

---

## 🎯 Next Steps

1. **Dev:** Define the exact Enum for frequencies in the database.
2. **QA:** Test behavior when user has no payment method saved (does subscription allow creation?).
