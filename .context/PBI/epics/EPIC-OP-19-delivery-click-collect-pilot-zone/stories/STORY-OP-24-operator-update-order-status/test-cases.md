# Test Cases: STORY-OP-24 - Operator Update Order Status

**Fecha:** 2026-01-20
**QA Engineer:** AI Agent
**Story Jira Key:** OP-24
**Epic:** EPIC-OP-19 - Delivery & Click & Collect (Pilot Zone)
**Status:** Draft

---

## 📋 Paso 1: Critical Analysis

### Business Context of This Story

**User Persona Affected:**
- **Primary:** Operator.
- **Secondary:** Customer (receives notification).

**Business Value:**
- **Value Proposition:** Mantiene al cliente informado y al proceso ordenado.
- **Business Impact:** Customer Experience (CX).

**Related User Journey:**
- Journey: Order Fulfillment
- Step: Status Updates

---

### Technical Context of This Story

**Architecture Components:**

**Frontend:**
- Components: `StatusSelect`, `UpdateConfirmDialog`.
- State: Optimistic Update.

**Backend:**
- API Endpoints: `PATCH /api/admin/orders/{id}/status`.
- Logic: State Machine (Transitions).
- Database: `public.orders`, `public.order_logs`.

**Integration Points:**
- Backend ↔ Notification Service (Triggers email/push on change).

---

### Story Complexity Analysis

**Overall Complexity:** Medium

**Complexity Factors:**
- Logic: Medium (State Machine validation).
- Integration: High (Triggering notifications, audit logs).

**Estimated Test Effort:** Medium

---

## 🚨 Paso 2: Story Quality Analysis

### Ambiguities Identified

**Ambiguity 1:** "Predefined set of statuses"
- **Location in Story:** Description
- **Question for Dev:** What is the full list? (Pending, Prep, Ready, Delivering, Delivered, Cancelled?)
- **Impact on Testing:** Valid/Invalid transition Matrix.
- **Suggested Clarification:** `PENDING`, `PREPARING`, `READY_FOR_PICKUP`, `OUT_FOR_DELIVERY`, `DELIVERED`, `CANCELLED`.

**Ambiguity 2:** Reversibility
- **Location in Story:** Scenario 4
- **Question for PO:** Is ANY reverse transition allowed (e.g. accidental click on "Delivered")?
- **Impact on Testing:** Rollback tests.
- **Suggested Clarification:** For MVP, strict forward-only. Rollback requires SuperAdmin or DB fix.

---

## ✅ Paso 3: Refined Acceptance Criteria

### Scenario 1: Advance to Preparing (Happy Path)
**Type:** Positive
**Priority:** Critical

- **Given:** Order is "Pending".
- **When:** Operator selects "Start Preparation".
- **Then:** Status -> "Preparing". Log created.

### Scenario 2: Advance to Out for Delivery
**Type:** Positive
**Priority:** High

- **Given:** Order is "Preparing".
- **When:** Operator selects "Send".
- **Then:** Status -> "Out for Delivery".

### Scenario 3: Complete Delivery
**Type:** Positive
**Priority:** High

- **Given:** Order is "Out for Delivery".
- **When:** Operator selects "Delivered".
- **Then:** Status -> "Delivered". Order closed.

### Scenario 4: Invalid Transition
**Type:** Negative
**Priority:** Medium

- **Given:** Order is "Delivered".
- **When:** Operator tries to set "Pending".
- **Then:** Error "Invalid Transition". DB remains "Delivered".

---

## 🧪 Paso 4: Test Design

### Test Outlines

#### **Validar ciclo completo de vida de la orden**
**Type:** Positive
**Priority:** Critical
**Test Level:** E2E

**Test Steps:**
1. Pending -> Preparing.
2. Preparing -> Ready/Out.
3. Out -> Delivered.

**Expected Result:**
- All states updated in DB order. timestamps recorded.

#### **Validar bloqueo de transiciones ilegales**
**Type:** Negative
**Priority:** High
**Test Level:** Integration

**Test Steps:**
1. Try `PATCH` from "Delivered" to "Pending".

**Expected Result:**
- HTTP 400.

#### **Validar seguridad (Solo operador)**
**Type:** Security
**Priority:** Critical
**Test Level:** Integration

**Test Steps:**
1. Customer tries to update own order status via API.

**Expected Result:**
- HTTP 403.

---

## 📊 Edge Cases Summary

| Edge Case | Test Case | Priority |
|Codes | --------- | -------- |
| Concurrent update (Two operators) | Race Condition Test | Low |
| Cancellation flow | TBD (Separate story?) | Medium |

---

## 🎯 Next Steps

1. **Dev:** Implement State Machine pattern (XState or similar logic).
2. **QA:** Define Matrix of Allowed Transitions.
