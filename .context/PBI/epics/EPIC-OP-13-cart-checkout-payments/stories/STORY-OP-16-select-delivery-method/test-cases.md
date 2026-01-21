# Test Cases: STORY-OP-16 - Select Delivery Method

**Fecha:** 2026-01-20
**QA Engineer:** AI Agent
**Story Jira Key:** OP-16
**Epic:** EPIC-OP-13 - Cart, Checkout & Payments
**Status:** Draft

---

## 📋 Paso 1: Critical Analysis

### Business Context of This Story

**User Persona Affected:**
- **Primary:** Pet Owner (Registered) - Finalizing checkout.

**Business Value:**
- **Value Proposition:** Ofrece flexibilidad logística. La promesa de entrega (Delivery) es el valor central de OnePets.
- **Business Impact:** Crucial para la satisfacción del cliente. Una mala gestión de la zona piloto aquí genera frustración y pedidos cancelados.

**Related User Journey:**
- Journey: Purchase Flow
- Step: Select Delivery

---

### Technical Context of This Story

**Architecture Components:**

**Frontend:**
- Components: `DeliveryMethodSelector`, `AddressSummaryCard`, `FeeDisplay`
- Pages: `/checkout/delivery`

**Backend:**
- API Endpoints: `PATCH /api/cart/delivery` (or similar endpoint to save preference)
- Services: `ShippingCalculator`, `PilotZoneService`
- Database: `public.addresses`

**Integration Points:**
- Frontend ↔ Backend (Fee calculation sync)
- Backend ↔ Pilot Zone Logic (Zip code validation)

---

### Story Complexity Analysis

**Overall Complexity:** Medium

**Complexity Factors:**
- Business logic: Medium (Pilot Zone validation + Fee logic)
- UX: Medium (Handling edge cases for users without addresses)

**Estimated Test Effort:** Medium

---

## 🚨 Paso 2: Story Quality Analysis

### Ambiguities Identified

**Ambiguity 1:** "Designated pickup point" details
- **Location in Story:** Scenario 2
- **Question for PO:** Where is this pickup point? What are the operating hours?
- **Impact on Testing:** UI verification of static data.
- **Suggested Clarification:** Use a static mockup address for MVP (e.g., "Main Warehouse, Downtown").

**Ambiguity 2:** "Delivery fees" calculation
- **Location in Story:** Scenario 1
- **Question for PO:** Is it a flat fee or distance-based?
- **Impact on Testing:** Mathematical verification of total.
- **Suggested Clarification:** Flat fee of $5.00 for pilot zone delivery for MVP.

### Edge Cases NOT Covered in Original Story

**Edge Case 1:** Switching back and forth
- **Scenario:** User selects Home Delivery (adds $5), then switches to Pickup.
- **Expected Behavior:** Total should revert exactly to subtotal (remove $5).
- **Criticality:** High
- **Action Required:** Regression test for method switching.

**Edge Case 2:** Address outside zone but selected anyway
- **Scenario:** User somehow selects an old address that is no longer in pilot zone.
- **Expected Behavior:** Backend validation should block the order even if UI fails.
- **Criticality:** High
- **Action Required:** Negative test for backend validation of `addressId`.

---

## ✅ Paso 3: Refined Acceptance Criteria

### Scenario 1: Select Home Delivery (Inside Zone)
**Type:** Positive
**Priority:** Critical

- **Given:** User has 1 address marked as `within_pilot_zone = true`.
- **When:** User selects "Home Delivery".
- **Then:**
  - Address is displayed correctly.
  - Fee of $5.00 is added.
  - Total = Subtotal + $5.00.

### Scenario 2: Select Pickup
**Type:** Positive
**Priority:** High

- **Given:** User is on delivery selection.
- **When:** User selects "Pickup".
- **Then:**
  - Pickup address "Main Warehouse" is shown.
  - Delivery Fee is $0.00.
  - Total = Subtotal.

### Scenario 3: No Address Saved
**Type:** Negative
**Priority:** High

- **Given:** User has NO addresses in profile.
- **When:** User selects "Home Delivery".
- **Then:** UI shows "Please add a delivery address first" with a link to add one.

### Scenario 4: Address Outside Pilot Zone
**Type:** Negative
**Priority:** High

- **Given:** User address has `within_pilot_zone = false`.
- **When:** User selects "Home Delivery".
- **Then:** UI shows "Home delivery is not yet available for this address". Option is disabled or blocked.

---

## 🧪 Paso 4: Test Design

### Test Outlines

#### **Validar cálculo de envío a domicilio**
**Type:** Positive
**Priority:** Critical
**Test Level:** E2E

**Preconditions:**
- User has valid pilot zone address.

**Test Steps:**
1. Select "Home Delivery".
2. Verify total sum.

**Expected Result:**
- **UI:** Subtotal ($X) + Fee ($5) = Total ($X+5).

---

#### **Validar cambio de método (Delivery ↔ Pickup)**
**Type:** Positive
**Priority:** High
**Test Level:** UI

**Test Steps:**
1. Select Delivery (Verify total increases).
2. Select Pickup (Verify total decreases).

**Expected Result:**
- Total is consistent and accurate after multiple switches.

---

#### **Validar bloqueo de zona no permitida**
**Type:** Negative
**Priority:** High
**Test Level:** Integration

**Preconditions:**
- Address ID 500 is OUTSIDE pilot zone.

**Test Steps:**
1. Send request to update cart with `addressId: 500` and `method: home_delivery`.

**Expected Result:**
- **Status:** 400 Bad Request.
- **Body:** `{ "error": "ADDRESS_OUTSIDE_PILOT_ZONE" }`.

---

## 📊 Edge Cases Summary

| Edge Case | Test Case | Priority |
|Codes | --------- | -------- |
| Incomplete Address | Validation Test | Medium |
| Pickup point hours display | UI Verification | Low |
| DB address deleted while in checkout | Error Handling Test | Medium |

---

## 🎯 Next Steps

1. **PO:** Confirm if multiple pickup points are planned or just one.
2. **Dev:** Define the exact field names for `deliveryMethod` (e.g., `HOME_DELIVERY`, `PICKUP`).
