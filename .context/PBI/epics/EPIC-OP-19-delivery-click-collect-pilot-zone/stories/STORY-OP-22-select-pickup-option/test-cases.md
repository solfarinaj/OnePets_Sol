# Test Cases: STORY-OP-22 - Select Pickup Option

**Fecha:** 2026-01-20
**QA Engineer:** AI Agent
**Story Jira Key:** OP-22
**Epic:** EPIC-OP-19 - Delivery & Click & Collect (Pilot Zone)
**Status:** Draft

---

## 📋 Paso 1: Critical Analysis

### Business Context of This Story

**User Persona Affected:**
- **Primary:** Registered Pet Owner.

**Business Value:**
- **Value Proposition:** Flexibilidad. Ahorra costo de envío.
- **Business Impact:** Atrae a usuarios cercanos al almacén/tienda física.

**Related User Journey:**
- Journey: Purchase Flow
- Step: Select Delivery

---

### Technical Context of This Story

**Architecture Components:**

**Frontend:**
- Components: `PickupSelector`, `StoreMap` (Static).
- State: `OrderContext`.

**Backend:**
- Logic: Fee removal.
- API: `POST /api/orders`.

**Integration Points:**
- Frontend ↔ Backend.

---

### Story Complexity Analysis

**Overall Complexity:** Low

**Complexity Factors:**
- Logic: Low (Boolean toggle essentially).
- UI: Low.

**Estimated Test Effort:** Low

---

## 🚨 Paso 2: Story Quality Analysis

### Ambiguities Identified

**Ambiguity 1:** "Designated pickup point" data source
- **Location in Story:** Description
- **Question for Dev:** Is this in DB or config?
- **Impact on Testing:** Data setup.
- **Suggested Clarification:** Config file or Env variable for MVP.

**Ambiguity 2:** Address field requirement
- **Location in Story:** Scenario 2
- **Question for UX:** Do we hide the address form completely?
- **Impact on Testing:** UI verification.
- **Suggested Clarification:** Yes, hide address form to reduce friction.

---

## ✅ Paso 3: Refined Acceptance Criteria

### Scenario 1: Select Pickup (Happy Path)
**Type:** Positive
**Priority:** Critical

- **Given:** User in checkout.
- **When:** Select "Pickup".
- **Then:**
  - Fee = $0.00.
  - Pickup Address is shown.
  - Delivery Address form is hidden.

### Scenario 2: Switch Delivery -> Pickup
**Type:** Positive
**Priority:** High

- **Given:** Selected Delivery ($5 fee).
- **When:** Switch to Pickup.
- **Then:** Total reduces by $5.

---

## 🧪 Paso 4: Test Design

### Test Outlines

#### **Validar selección de retiro y costo cero**
**Type:** Positive
**Priority:** Critical
**Test Level:** E2E

**Test Steps:**
1. Add item ($10).
2. Go to Checkout.
3. Select Pickup.
4. Verify Total ($10).

**Expected Result:**
- No extra fees added.

#### **Validar información de punto de retiro**
**Type:** Positive
**Priority:** Medium
**Test Level:** UI

**Test Steps:**
1. Select Pickup.
2. Check text for Address and Hours.

**Expected Result:**
- Matches defined static data.

---

## 📊 Edge Cases Summary

| Edge Case | Test Case | Priority |
|Codes | --------- | -------- |
| Pickup selected but user enters delivery address anyway | Logic Check | Low |

---

## 🎯 Next Steps

1. **PO:** Confirm text for "Pickup Instructions".
2. **QA:** Verify mobile responsiveness of map/address display.
