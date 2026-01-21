# Test Cases: STORY-OP-29 - Operator Subscription View

**Fecha:** 2026-01-20
**QA Engineer:** AI Agent
**Story Jira Key:** OP-29
**Epic:** EPIC-OP-25 - Subscription Management (Recurrent Food)
**Status:** Draft

---

## 📋 Paso 1: Critical Analysis

### Business Context of This Story

**User Persona Affected:**
- **Primary:** OnePets Operator.

**Business Value:**
- **Value Proposition:** Forecasting. Saber cuánta comida comprar y cuántos repartidores necesitar para la próxima semana.
- **Business Impact:** Eficiencia en compras (Inventory management) y logística.

**Related User Journey:**
- Journey: Operational Planning
- Step: Demand Forecasting

---

### Technical Context of This Story

**Architecture Components:**

**Frontend:**
- Components: `SubscriptionTable`, `ForecastingFilters`.
- Pages: `/admin/subscriptions`.

**Backend:**
- API Endpoints: `GET /api/admin/subscriptions`.
- Logic: Complex JOIN (Profiles + Subscriptions + Products).

**Integration Points:**
- Frontend ↔ Admin API.

---

### Story Complexity Analysis

**Overall Complexity:** Low

**Complexity Factors:**
- Security: High (RBAC).
- Data Performance: Medium (Large number of subs might require pagination/optimization).

**Estimated Test Effort:** Low

---

## 🚨 Paso 2: Story Quality Analysis

### Ambiguities Identified

**Ambiguity 1:** "Next scheduled delivery date" calculation
- **Location in Story:** Scenario 3
- **Question for PO:** Does this date represent the *Order Generation* date or the *Physical Delivery* date?
- **Impact on Testing:** Verification of field mapping.
- **Suggested Clarification:** It is the *Order Generation* date (when the system creates the order).

**Ambiguity 2:** Export functionality
- **Location in Story:** N/A
- **Question for PO:** Do operators need to download this as CSV/Excel?
- **Impact on Testing:** Scope check.
- **Suggested Clarification:** Not required for MVP. Simple UI list is enough.

---

## ✅ Paso 3: Refined Acceptance Criteria

### Scenario 1: Comprehensive List (Happy Path)
**Type:** Positive
**Priority:** Critical

- **Given:** 10 active subs exist.
- **When:** Operator views `/admin/subscriptions`.
- **Then:** Table displays 10 rows with correct Customer Name, SKU, and Date.

### Scenario 2: Forecast Filtering
**Type:** Positive
**Priority:** High

- **When:** Apply filter "Next 7 Days".
- **Then:** Only show subs where `next_delivery_date` <= `today + 7`.

### Scenario 3: RBAC Enforcement
**Type:** Security
**Priority:** Critical

- **Given:** Logged in as "Customer".
- **When:** Try to access `/admin/subscriptions`.
- **Then:** 403 Forbidden.

---

## 🧪 Paso 4: Test Design

### Test Outlines

#### **Validar acceso de administrador**
**Type:** Positive
**Priority:** Critical
**Test Level:** E2E

**Preconditions:**
- User has Operator role.

**Test Steps:**
1. Login.
2. Navigate to Subscriptions Dashboard.

**Expected Result:**
- HTTP 200. Table visible.

#### **Validar ordenamiento cronológico**
**Type:** Positive
**Priority:** Medium
**Test Level:** UI

**Test Steps:**
1. Click column header "Next Delivery Date".
2. Toggle ASC/DESC.

**Expected Result:**
- Rows reorder correctly by date.

#### **Validar integridad de datos (JOIN)**
**Type:** Positive
**Priority:** High
**Test Level:** Integration

**Test Steps:**
1. Call `GET /api/admin/subscriptions`.
2. Check that `customer_name` matches the `profile_id` in `auth`.

---

## 📊 Edge Cases Summary

| Edge Case | Test Case | Priority |
|Codes | --------- | -------- |
| Sub with deleted product | Integrity Test | Medium |
| Extremely large date range | Performance Test | Low |

---

## 🎯 Next Steps

1. **Dev:** Implement the Admin API with the necessary JOINs.
2. **QA:** Verify data masking (Should operators see full credit card info? No).
