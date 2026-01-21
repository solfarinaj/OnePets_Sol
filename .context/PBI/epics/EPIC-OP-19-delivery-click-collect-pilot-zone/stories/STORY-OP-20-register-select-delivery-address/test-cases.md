# Test Cases: STORY-OP-20 - Register and Select Delivery Address

**Fecha:** 2026-01-20
**QA Engineer:** AI Agent
**Story Jira Key:** OP-20
**Epic:** EPIC-OP-19 - Delivery & Click & Collect (Pilot Zone)
**Status:** Draft

---

## 📋 Paso 1: Critical Analysis

### Business Context of This Story

**User Persona Affected:**
- **Primary:** Registered Pet Owner.

**Business Value:**
- **Value Proposition:** Permite la entrega efectiva. Sin dirección válida, no hay delivery.
- **Business Impact:** Reduce costos logísticos al validar zonas *antes* del despacho.

**Related User Journey:**
- Journey: Onboarding / Account Setup
- Step: Add Address

---

### Technical Context of This Story

**Architecture Components:**

**Frontend:**
- Components: `AddressList`, `AddressForm`, `ZoneBadge`.
- Pages: `/profile/addresses`.

**Backend:**
- API Endpoints: `POST /api/addresses`, `PUT /api/addresses/{id}`, `DELETE /api/addresses/{id}`.
- Logic: `PilotZoneService`.
- Database: `public.addresses`, `public.profiles` (`default_address_id`).

**Integration Points:**
- Frontend ↔ Backend
- Backend ↔ Geo/Zip Logic

---

### Story Complexity Analysis

**Overall Complexity:** Medium

**Complexity Factors:**
- Logic: Medium (Zone detection).
- Data Consistency: Medium (Managing default address state, deleting addresses).

**Estimated Test Effort:** Medium

---

## 🚨 Paso 2: Story Quality Analysis

### Ambiguities Identified

**Ambiguity 1:** "Delete last remaining address"
- **Location in Story:** Testing Strategy
- **Question for PO:** Can a user have 0 addresses?
- **Impact on Testing:** Empty state testing.
- **Suggested Clarification:** Yes, users can have 0 addresses.

**Ambiguity 2:** Default address logic
- **Location in Story:** Scenario 3
- **Question for Dev:** If I add my *first* address, is it auto-set as default?
- **Impact on Testing:** Happy path flow.
- **Suggested Clarification:** Yes, first address created is auto-default.

---

## ✅ Paso 3: Refined Acceptance Criteria

### Scenario 1: Add Address (In Zone)
**Type:** Positive
**Priority:** Critical

- **Given:** User creates address with Zip 1000.
- **When:** Saves.
- **Then:**
  - `within_pilot_zone` = true.
  - UI shows "Fast Delivery Available".

### Scenario 2: Add Address (Out Zone)
**Type:** Positive
**Priority:** High

- **Given:** User creates address with Zip 9999.
- **When:** Saves.
- **Then:**
  - `within_pilot_zone` = false.
  - UI shows "Delivery not available".

### Scenario 3: Set Default
**Type:** Positive
**Priority:** Medium

- **Given:** User has Address A (Default) and Address B.
- **When:** User clicks "Set as Default" on B.
- **Then:**
  - `profiles.default_address_id` updates to B.
  - UI shows B as Default.

### Scenario 4: Delete Address
**Type:** Positive
**Priority:** Medium

- **Given:** User has Address A and B.
- **When:** Delete A.
- **Then:** A is removed. B remains.

---

## 🧪 Paso 4: Test Design

### Test Outlines

#### **Validar creación de dirección en Zona Piloto**
**Type:** Positive
**Priority:** Critical
**Test Level:** Integration

**Test Steps:**
1. POST `/api/addresses` with valid zip.
2. Verify response includes `within_pilot_zone: true`.

#### **Validar lógica de dirección por defecto automática**
**Type:** Positive
**Priority:** High
**Test Level:** E2E

**Preconditions:**
- User has 0 addresses.

**Test Steps:**
1. Add new address.
2. Verify it is marked as default automatically.

#### **Validar cambio de dirección por defecto**
**Type:** Positive
**Priority:** Medium
**Test Level:** Integration

**Test Steps:**
1. Add Address A.
2. Add Address B.
3. Set B as default.
4. Verify `profiles` table points to B.

#### **Validar eliminación de dirección**
**Type:** Positive
**Priority:** Medium

**Test Steps:**
1. Delete Address.
2. Verify list updates.

---

## 📊 Edge Cases Summary

| Edge Case | Test Case | Priority |
|Codes | --------- | -------- |
| Delete Default Address | Logic Check (Auto-assign new default?) | High |
| Address with Max Length fields | Boundary Test | Low |

---

## 🎯 Next Steps

1. **Dev:** Implement auto-default logic.
2. **QA:** Define test zip codes.
