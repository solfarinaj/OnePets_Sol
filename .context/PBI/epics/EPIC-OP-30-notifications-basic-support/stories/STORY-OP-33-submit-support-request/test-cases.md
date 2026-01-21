# Test Cases: STORY-OP-33 - Submit Support Request

**Fecha:** 2026-01-20
**QA Engineer:** AI Agent
**Story Jira Key:** OP-33
**Epic:** EPIC-OP-30 - Notifications & Basic Support
**Status:** Draft

---

## 📋 Paso 1: Critical Analysis

### Business Context of This Story

**User Persona Affected:**
- **Primary:** Registered Pet Owner.

**Business Value:**
- **Value Proposition:** Canal directo para resolver frustraciones.
- **Business Impact:** Evita chargebacks y malas reviews.

**Related User Journey:**
- Journey: Post-Purchase / Support
- Step: Reporting Issue

---

### Technical Context of This Story

**Architecture Components:**

**Frontend:**
- Components: `SupportForm`, `OrderSelector`.
- Pages: `/support`, `/orders/[id]`.

**Backend:**
- API Endpoints: `POST /api/support`.
- Database: `public.tickets`.

**Integration Points:**
- Frontend ↔ Backend.

---

### Story Complexity Analysis

**Overall Complexity:** Low

**Complexity Factors:**
- Logic: Low (CRUD).
- Validation: Medium (Must validate Order ID ownership).

**Estimated Test Effort:** Low

---

## 🚨 Paso 2: Story Quality Analysis

### Ambiguities Identified

**Ambiguity 1:** Guest Support
- **Location in Story:** Description ("authenticated user")
- **Question for PO:** Can guests submit tickets? (e.g. login trouble).
- **Impact on Testing:** Auth requirement.
- **Suggested Clarification:** MVP Authenticated only. Guests use `mailto:`.

---

## ✅ Paso 3: Refined Acceptance Criteria

### Scenario 1: General Ticket (Happy Path)
**Type:** Positive
**Priority:** Critical

- **Given:** User on Support Page.
- **When:** Submits message "Where is my order?".
- **Then:**
  - Ticket created.
  - UI shows "We received your request".

### Scenario 2: Linked to Order
**Type:** Positive
**Priority:** High

- **Given:** User viewing Order #50.
- **When:** Clicks "Report Issue" -> Submits "Damaged item".
- **Then:**
  - Ticket created with `order_id = 50`.

### Scenario 3: Validation Error
**Type:** Negative
**Priority:** Medium

- **When:** Submits empty message.
- **Then:** "Message is required".

---

## 🧪 Paso 4: Test Design

### Test Outlines

#### **Validar creación de ticket**
**Type:** Positive
**Priority:** Critical
**Test Level:** E2E

**Test Steps:**
1. Fill form.
2. Submit.
3. Verify Ticket exists in DB.

#### **Validar link a orden**
**Type:** Positive
**Priority:** High
**Test Level:** Integration

**Test Steps:**
1. Submit with `order_id: 100`.
2. Verify DB ticket has `order_id: 100`.

#### **Validar seguridad (Orden ajena)**
**Type:** Security
**Priority:** Critical
**Test Level:** Integration

**Test Steps:**
1. User A submits ticket linked to Order ID of User B.

**Expected Result:**
- API Error (403). Backend validates ownership.

---

## 📊 Edge Cases Summary

| Edge Case | Test Case | Priority |
|Codes | --------- | -------- |
| Very long message | Limit Test | Low |

---

## 🎯 Next Steps

1. **Dev:** Add `user_id` check on `order_id` validation.
2. **QA:** Test file upload if added later.
