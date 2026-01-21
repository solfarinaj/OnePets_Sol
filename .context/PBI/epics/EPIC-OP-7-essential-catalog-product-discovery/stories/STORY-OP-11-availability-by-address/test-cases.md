# Test Cases: STORY-OP-11 - Product Availability by Address

**Fecha:** 2026-01-20
**QA Engineer:** AI Agent
**Story Jira Key:** OP-11
**Epic:** EPIC-OP-7 - Essential Catalog & Product Discovery
**Status:** Draft

---

## 📋 Paso 1: Critical Analysis

### Business Context of This Story

**User Persona Affected:**
- **Primary:** Registered Pet Owner.

**Business Value:**
- **Value Proposition:** Gestiona expectativas. Evita que el usuario llene el carrito para descubrir al final que no enviamos a su casa.
- **Business Impact:** Reduce el abandono en checkout.

**Related User Journey:**
- Journey: Product Discovery
- Step: Viewing Product / Intent to Buy

---

### Technical Context of This Story

**Architecture Components:**

**Frontend:**
- Components: `AvailabilityBadge`, `DeliveryEstimateCard`.
- Context: `AuthContext` (User Address).

**Backend:**
- Logic: `PilotZoneService` (Checks `within_pilot_zone` flag on Address).
- Logic: `InventoryService` (Checks `in_stock`).

**Integration Points:**
- Frontend ↔ Backend (Address status sync).

---

### Story Complexity Analysis

**Overall Complexity:** Medium

**Complexity Factors:**
- Conditionals: High (Matrix of User State x Address State x Stock State).
- UX: Medium (Many states to display).

**Estimated Test Effort:** Medium

---

## 🚨 Paso 2: Story Quality Analysis

### Ambiguities Identified

**Ambiguity 1:** "Fast delivery" definition
- **Location in Story:** Description
- **Question for PO:** Does "Outside Zone" mean NO delivery or SLOW delivery?
- **Impact on Testing:** UI message ("Not available" vs "3-5 days").
- **Suggested Clarification:** For MVP, Outside Zone means "Delivery not available".

**Ambiguity 2:** Unauthenticated user default
- **Location in Story:** Scenario 4
- **Question for UX:** What do we show to guests? "Check availability" input?
- **Impact on Testing:** Guest flow testing.
- **Suggested Clarification:** Prompt to login/register to see delivery options.

---

## ✅ Paso 3: Refined Acceptance Criteria

### Scenario 1: User In-Zone + Product In-Stock (Happy Path)
**Type:** Positive
**Priority:** Critical

- **Given:** User address is Pilot Zone. Product stock > 0.
- **When:** View Product.
- **Then:** Badge: "Available for Fast Delivery".

### Scenario 2: User In-Zone + Product Out-of-Stock
**Type:** Positive (State check)
**Priority:** High

- **Given:** User address is Pilot Zone. Product stock = 0.
- **When:** View Product.
- **Then:** Badge: "Out of Stock in your area".

### Scenario 3: User Out-of-Zone
**Type:** Negative
**Priority:** High

- **Given:** User address is NOT Pilot Zone. Product stock > 0.
- **When:** View Product.
- **Then:** Badge: "Delivery not available for your address".

### Scenario 4: No Address / Guest
**Type:** Positive (Prompt)
**Priority:** Medium

- **Given:** User has no address OR is Guest.
- **When:** View Product.
- **Then:** "Add address to check availability".

---

## 🧪 Paso 4: Test Design

### Test Outlines

#### **Validar visualización para usuario en Zona Piloto**
**Type:** Positive
**Priority:** Critical
**Test Level:** E2E

**Preconditions:**
- Login as user with address Zip 1000 (Inside).

**Test Steps:**
1. Navigate to Catalog.
2. Verify availability text.

**Expected Result:**
- "Available for Fast Delivery".

---

#### **Validar visualización para usuario fuera de Zona**
**Type:** Negative
**Priority:** High
**Test Level:** UI

**Preconditions:**
- Login as user with address Zip 9999 (Outside).

**Test Steps:**
1. Navigate to Product Detail.

**Expected Result:**
- "Delivery not available".

---

#### **Validar prompt para usuario sin dirección**
**Type:** Positive
**Priority:** Medium
**Test Level:** UI

**Preconditions:**
- Login as new user (no address).

**Test Steps:**
1. View product.

**Expected Result:**
- Message links to Profile/Address page.

---

## 📊 Edge Cases Summary

| Edge Case | Test Case | Priority |
|Codes | --------- | -------- |
| Address deleted while viewing | State Sync Test | Low |
| User updates address to In-Zone while on page | Real-time Update Test | Medium |

---

## 🎯 Next Steps

1. **Dev:** Expose `within_pilot_zone` in the User Session/Profile API.
2. **QA:** Matrix test table for all 4 states.
