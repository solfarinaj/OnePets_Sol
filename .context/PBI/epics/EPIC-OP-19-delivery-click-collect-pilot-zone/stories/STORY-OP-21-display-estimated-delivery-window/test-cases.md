# Test Cases: STORY-OP-21 - Display Estimated Delivery Window

**Fecha:** 2026-01-20
**QA Engineer:** AI Agent
**Story Jira Key:** OP-21
**Epic:** EPIC-OP-19 - Delivery & Click & Collect (Pilot Zone)
**Status:** Draft

---

## 📋 Paso 1: Critical Analysis

### Business Context of This Story

**User Persona Affected:**
- **Primary:** Registered Pet Owner.

**Business Value:**
- **Value Proposition:** Reduce ansiedad y gestiona expectativas. "Fast delivery" sin tiempo estimado es solo una promesa vacía.
- **Business Impact:** Mejora la satisfacción del cliente y reduce contactos al soporte.

**Related User Journey:**
- Journey: Purchase Flow
- Step: Checkout / Confirmation

---

### Technical Context of This Story

**Architecture Components:**

**Frontend:**
- Components: `ETADisplay`.
- Pages: `/checkout`, `/order-confirmation`.

**Backend:**
- Logic: `ETAService` (Calculation rules).
- API: `GET /api/orders/{id}`.

**Integration Points:**
- Backend ↔ Config (Operational hours, base delivery time).

---

### Story Complexity Analysis

**Overall Complexity:** Low

**Complexity Factors:**
- Logic: Low (Static calculation for MVP: +90 mins).
- UI: Low.

**Estimated Test Effort:** Low

---

## 🚨 Paso 2: Story Quality Analysis

### Ambiguities Identified

**Ambiguity 1:** "Predefined business rules"
- **Location in Story:** Backend Technical Notes
- **Question for PO:** What are the rules? (e.g., "Always 90 mins" or "Next day after 8PM"?)
- **Impact on Testing:** Test data setup.
- **Suggested Clarification:** Standard: Order Time + 90 mins. After 8PM: Next day 10AM.

**Ambiguity 2:** Timezone
- **Location in Story:** N/A
- **Question for Dev:** Is the server time UTC? How do we display local time?
- **Impact on Testing:** Verification of displayed time.
- **Suggested Clarification:** Store UTC, Display Local (Browser time).

---

## ✅ Paso 3: Refined Acceptance Criteria

### Scenario 1: Standard Hours (Happy Path)
**Type:** Positive
**Priority:** Critical

- **Given:** Time is 2:00 PM.
- **When:** Checkout.
- **Then:** ETA shows "3:30 PM" (or range "3:15 PM - 3:45 PM").

### Scenario 2: After Hours
**Type:** Positive
**Priority:** High

- **Given:** Time is 10:00 PM (Operations closed).
- **When:** Checkout.
- **Then:** ETA shows "Tomorrow, 10:30 AM".

### Scenario 3: Pickup Order
**Type:** Negative
**Priority:** Medium

- **Given:** Method is Pickup.
- **Then:** ETA field is hidden or shows "Ready for pickup in 30 mins".

---

## 🧪 Paso 4: Test Design

### Test Outlines

#### **Validar cálculo de ETA en horario hábil**
**Type:** Positive
**Priority:** Critical
**Test Level:** Unit/Integration

**Test Steps:**
1. Mock current time to 14:00.
2. Calculate ETA.

**Expected Result:**
- 15:30 (Current + 90m).

#### **Validar cálculo de ETA fuera de horario**
**Type:** Positive
**Priority:** High
**Test Level:** Unit

**Test Steps:**
1. Mock time to 23:00.
2. Calculate ETA.

**Expected Result:**
- Next Day Start Time + Processing Time.

#### **Validar persistencia de ETA en orden**
**Type:** Positive
**Priority:** Medium
**Test Level:** Integration

**Test Steps:**
1. Create Order.
2. Fetch Order.
3. Check `estimated_delivery_window` field.

---

## 📊 Edge Cases Summary

| Edge Case | Test Case | Priority |
|Codes | --------- | -------- |
| Order exactly at closing time | Boundary Test | Medium |
| Timezone differences | Localization Test | Low |

---

## 🎯 Next Steps

1. **PO:** Define operational hours.
2. **Dev:** Implement date-fns/moment.js for localized formatting.
