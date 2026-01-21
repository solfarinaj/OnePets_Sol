# Test Cases: STORY-OP-31 - Order Status Notifications

**Fecha:** 2026-01-20
**QA Engineer:** AI Agent
**Story Jira Key:** OP-31
**Epic:** EPIC-OP-30 - Notifications & Basic Support
**Status:** Draft

---

## 📋 Paso 1: Critical Analysis

### Business Context of This Story

**User Persona Affected:**
- **Primary:** Registered Pet Owner.

**Business Value:**
- **Value Proposition:** Información en tiempo real.
- **Business Impact:** Customer Experience (CX).

**Related User Journey:**
- Journey: Post-Purchase
- Step: Tracking

---

### Technical Context of This Story

**Architecture Components:**

**Backend:**
- Services: `NotificationService`.
- Triggers: API logic (State Pattern).

**Integration Points:**
- Backend ↔ Email Service.

---

### Story Complexity Analysis

**Overall Complexity:** Medium

**Complexity Factors:**
- Integration: Medium (Handling email service failures).
- Idempotency: Medium (Preventing double email).

**Estimated Test Effort:** Medium

---

## 🚨 Paso 2: Story Quality Analysis

### Ambiguities Identified

**Ambiguity 1:** "Relevant information" in email
- **Location in Story:** Description
- **Question for PO:** Does "Out for Delivery" include driver name or live tracking link?
- **Impact on Testing:** Content verification.
- **Suggested Clarification:** MVP: Just static text + Order ID + ETA. Live tracking is future.

### Edge Cases NOT Covered in Original Story

**Edge Case 1:** Rapid status changes
- **Scenario:** Operator clicks "Preparing" then "Ready" in 1 second.
- **Expected Behavior:** Two emails? Or just the latest?
- **Criticality:** Low
- **Action Required:** Accept both for MVP.

---

## ✅ Paso 3: Refined Acceptance Criteria

### Scenario 1: Order Confirmed Email
**Type:** Positive
**Priority:** Critical

- **Given:** User places order.
- **When:** Payment successful.
- **Then:** Email "Order #123 Confirmed" received.

### Scenario 2: Out for Delivery Email
**Type:** Positive
**Priority:** High

- **Given:** Order is "Preparing".
- **When:** Operator updates to "Out for Delivery".
- **Then:** Email "Order #123 is on the way" received.

### Scenario 3: Delivered Email
**Type:** Positive
**Priority:** High

- **Given:** Order is "Out".
- **When:** Operator updates to "Delivered".
- **Then:** Email "Delivered!" received.

---

## 🧪 Paso 4: Test Design

### Test Outlines

#### **Validar disparo de email en cambio de estado**
**Type:** Positive
**Priority:** Critical
**Test Level:** Integration

**Test Steps:**
1. Call `PATCH /api/admin/orders/{id}/status` -> "out_for_delivery".
2. Verify Mock Email Service received request.

**Expected Result:**
- Email Sent count + 1.

#### **Validar idempotencia (No duplicados)**
**Type:** Negative
**Priority:** Medium
**Test Level:** Integration

**Test Steps:**
1. Set status "Delivered". (Email sent).
2. Set status "Delivered" again (Accidental retry).

**Expected Result:**
- Email Sent count does NOT increase.

---

## 📊 Edge Cases Summary

| Edge Case | Test Case | Priority |
|Codes | --------- | -------- |
| Email Bounce | Log Error Test | Low |

---

## 🎯 Next Steps

1. **Dev:** Setup templates in SendGrid/Resend.
2. **QA:** Verify dynamic fields (Name, Order ID) in email body.
