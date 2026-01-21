# Test Cases: STORY-OP-6 - Profile and Address Update

**Fecha:** 2026-01-20
**QA Engineer:** AI Agent
**Story Jira Key:** OP-6
**Epic:** EPIC-OP-2 - User Accounts & Pet Profiles
**Status:** Draft

---

## 📋 Paso 1: Critical Analysis

### Business Context of This Story

**User Persona Affected:**
- **Primary:** Registered Pet Owner.

**Business Value:**
- **Value Proposition:** Ensures delivery accuracy.
- **Business Impact:** Reduces failed deliveries and support tickets.

**Related User Journey:**
- Journey: Checkout / Account Management
- Step: Update Address

---

### Technical Context of This Story

**Architecture Components:**

**Frontend:**
- Components: `ProfileForm`, `AddressForm`
- Pages: `/profile`

**Backend:**
- API: `PUT /api/users/me`, `PUT /api/addresses/{id}`
- Services: `PilotZoneService` (Recalculation logic)
- Database: `public.profiles`, `public.addresses`

**Integration Points:**
- Frontend ↔ Backend
- Backend ↔ Map Service (Optional, if Pilot Zone logic uses external API)

---

### Story Complexity Analysis

**Overall Complexity:** Medium

**Complexity Factors:**
- Business logic: Medium (Pilot Zone Recalculation)
- Data validation: Medium (Address format, Phone format)

**Estimated Test Effort:** Medium

---

## 🚨 Paso 2: Story Quality Analysis

### Ambiguities Identified

**Ambiguity 1:** "within_pilot_zone flag must be recalculated"
- **Location in Story:** Backend Technical Notes
- **Question for Dev:** Is this logic internal (hardcoded zips) or external (Google Maps)?
- **Impact on Testing:** Needs definition to design boundary tests for the zone.
- **Suggested Clarification:** Use list of Zip Codes for MVP.

**Ambiguity 2:** Multiple addresses?
- **Location in Story:** Notes ("assume user has only one primary address")
- **Question for PO:** Does `public.addresses` have a `is_primary` flag or 1:1 link?
- **Impact on Testing:** Data setup for tests.
- **Suggested Clarification:** 1:1 link for MVP.

---

## ✅ Paso 3: Refined Acceptance Criteria

### Scenario 1: Update Profile Info
**Type:** Positive
**Priority:** Medium

- **Given:** User "John" exists.
- **When:** User changes name to "Johnny".
- **Then:** Profile updates. UI reflects "Johnny".

### Scenario 2: Update Address (Inside Zone)
**Type:** Positive
**Priority:** Critical

- **Given:** User address is "Old St".
- **When:** User updates to "123 Pilot Zone St".
- **Then:** Address updates. `within_pilot_zone` = TRUE.

### Scenario 3: Update Address (Outside Zone)
**Type:** Positive
**Priority:** High

- **Given:** User address is "Old St".
- **When:** User updates to "999 Far Away St".
- **Then:** Address updates. `within_pilot_zone` = FALSE. UI warns "Delivery not available".

---

## 🧪 Paso 4: Test Design

### Test Outlines

#### **Validar actualización de perfil (Nombre/Teléfono)**
**Type:** Positive
**Priority:** Medium

**Test Steps:**
1. Navigate to `/profile`.
2. Edit Name and Phone.
3. Save.
4. Reload page.

**Expected Result:**
- New values persist.

#### **Validar cálculo de Zona Piloto (Dentro)**
**Type:** Positive
**Priority:** Critical
**Test Level:** Integration

**Preconditions:**
- Mock Pilot Zone Logic (e.g., Zip 1000 is Inside).

**Test Steps:**
1. Update address with Zip 1000.

**Expected Result:**
- **DB:** `within_pilot_zone` is true.

#### **Validar cálculo de Zona Piloto (Fuera)**
**Type:** Positive
**Priority:** High

**Test Steps:**
1. Update address with Zip 9999.

**Expected Result:**
- **DB:** `within_pilot_zone` is false.

#### **Validar formato de teléfono**
**Type:** Negative
**Priority:** Low

**Test Steps:**
1. Enter "abc" in phone field.

**Expected Result:**
- **UI:** Validation error.

---

## 📊 Edge Cases Summary

| Edge Case | Test Case | Priority |
|Codes | --------- | -------- |
| Zip Code Boundary | Boundary Test | Medium |
| Empty Address | Validation Test | Medium |

---

## 🎯 Next Steps

1. **Dev:** Confirm Pilot Zone logic (Zip list vs Polygon).
2. **QA:** Obtain list of valid Zips.
