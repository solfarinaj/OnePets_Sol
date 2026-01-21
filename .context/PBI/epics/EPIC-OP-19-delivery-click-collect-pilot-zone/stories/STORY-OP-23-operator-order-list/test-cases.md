# Test Cases: STORY-OP-23 - Operator View of Pending Orders

**Fecha:** 2026-01-20
**QA Engineer:** AI Agent
**Story Jira Key:** OP-23
**Epic:** EPIC-OP-19 - Delivery & Click & Collect (Pilot Zone)
**Status:** Draft

---

## 📋 Paso 1: Critical Analysis

### Business Context of This Story

**User Persona Affected:**
- **Primary:** OnePets Operator (Internal Staff).

**Business Value:**
- **Value Proposition:** Visibilidad total para la ejecución. Sin esto, los pedidos se pierden.
- **Business Impact:** Eficiencia operativa. Reduce el tiempo de preparación.

**Related User Journey:**
- Journey: Order Fulfillment
- Step: Queue Management

---

### Technical Context of This Story

**Architecture Components:**

**Frontend:**
- Components: `OrderTable`, `StatusFilter`, `OrderRow`.
- Pages: `/admin/orders`.

**Backend:**
- API Endpoints: `GET /api/admin/orders`.
- Logic: `OrderQueryService`.
- Auth: RBAC (Role-Based Access Control).

**Integration Points:**
- Frontend ↔ Backend API.

---

### Story Complexity Analysis

**Overall Complexity:** Medium

**Complexity Factors:**
- Logic: Low (Read-only list).
- Security: High (RBAC - ensure normal users cannot see this).
- Data Volume: Medium (Pagination needed?).

**Estimated Test Effort:** Medium

---

## 🚨 Paso 2: Story Quality Analysis

### Ambiguities Identified

**Ambiguity 1:** "Relevant pickup information"
- **Location in Story:** Scenario 2
- **Question for PO:** Do we show pickup point name? Or just "PICKUP"?
- **Impact on Testing:** UI verification.
- **Suggested Clarification:** Show "PICKUP" badge and Customer Name clearly.

**Ambiguity 2:** Real-time updates?
- **Location in Story:** Description
- **Question for Dev:** Does the list auto-refresh when new orders come in?
- **Impact on Testing:** Auto-refresh test vs Manual refresh.
- **Suggested Clarification:** Manual refresh button for MVP.

---

## ✅ Paso 3: Refined Acceptance Criteria

### Scenario 1: View Pending List (Happy Path)
**Type:** Positive
**Priority:** Critical

- **Given:** Operator logged in. 5 Orders exist (3 Delivery, 2 Pickup).
- **When:** Navigates to `/admin/orders`.
- **Then:**
  - Table shows 5 rows.
  - Delivery orders show ETA.
  - Pickup orders show "Pickup".
  - Statuses are visible.

### Scenario 2: Filter by Status
**Type:** Positive
**Priority:** High

- **Given:** List has Mixed statuses.
- **When:** Filter by "Pending".
- **Then:** Only "Pending" orders visible.

### Scenario 3: Unauthorized Access
**Type:** Security
**Priority:** Critical

- **Given:** Normal User (Customer) logged in.
- **When:** Navigates to `/admin/orders`.
- **Then:** 403 Forbidden / Redirect to Home.

---

## 🧪 Paso 4: Test Design

### Test Outlines

#### **Validar acceso de operador**
**Type:** Positive
**Priority:** Critical
**Test Level:** E2E

**Preconditions:**
- User has `role: 'operator'`.

**Test Steps:**
1. Login as Operator.
2. Go to Admin Dashboard.
3. Verify Orders Table loads.

**Expected Result:**
- HTTP 200. Data visible.

#### **Validar bloqueo a usuario normal**
**Type:** Security
**Priority:** Critical
**Test Level:** Integration

**Preconditions:**
- User has `role: 'customer'`.

**Test Steps:**
1. Try `GET /api/admin/orders`.

**Expected Result:**
- HTTP 403.

#### **Validar ordenamiento por fecha**
**Type:** Positive
**Priority:** Medium
**Test Level:** UI

**Test Steps:**
1. Create Order A (10:00).
2. Create Order B (10:05).
3. View List.

**Expected Result:**
- Order B appears top (FIFO or LIFO depending on ops preference - assume FIFO for preparation). *Correction: Ops usually want Oldest First to meet SLA.*

---

## 📊 Edge Cases Summary

| Edge Case | Test Case | Priority |
|Codes | --------- | -------- |
| 0 Orders | Empty State Test | Low |
| 100+ Orders | Pagination Test | Medium |

---

## 🎯 Next Steps

1. **Dev:** Implement `role` column in `profiles` or `auth.users`.
2. **QA:** Create test user with operator role.
