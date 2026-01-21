# Test Cases: STORY-OP-32 - View Order History and Status

**Fecha:** 2026-01-20
**QA Engineer:** AI Agent
**Story Jira Key:** OP-32
**Epic:** EPIC-OP-30 - Notifications & Basic Support
**Status:** Draft

---

## 📋 Paso 1: Critical Analysis

### Business Context of This Story

**User Persona Affected:**
- **Primary:** Registered Pet Owner.

**Business Value:**
- **Value Proposition:** Self-service.
- **Business Impact:** Reduce el costo de soporte.

**Related User Journey:**
- Journey: Account Management
- Step: Order History

---

### Technical Context of This Story

**Architecture Components:**

**Frontend:**
- Components: `OrderList`, `OrderCard`, `StatusBadge`.
- Pages: `/profile/orders`.

**Backend:**
- API Endpoints: `GET /api/orders`.
- Database: `public.orders`, `public.order_items`.

**Integration Points:**
- Frontend ↔ Backend API.

---

### Story Complexity Analysis

**Overall Complexity:** Low

**Complexity Factors:**
- Logic: Low (Read-only list).
- Security: High (RLS).

**Estimated Test Effort:** Low

---

## 🚨 Paso 2: Story Quality Analysis

### Ambiguities Identified

**Ambiguity 1:** Pagination
- **Location in Story:** Description
- **Question for UX:** What if I have 100 orders?
- **Impact on Testing:** Pagination/Infinite Scroll test.
- **Suggested Clarification:** Paged by 10 for MVP.

---

## ✅ Paso 3: Refined Acceptance Criteria

### Scenario 1: View List (Happy Path)
**Type:** Positive
**Priority:** Critical

- **Given:** User has 3 orders.
- **When:** Navigates to `/profile/orders`.
- **Then:** List shows 3 cards with Date, ID, Status, Total.

### Scenario 2: View Detail
**Type:** Positive
**Priority:** High

- **Given:** User clicks Order #1.
- **Then:** Detailed view shows Products list, Address, Payment Info.

### Scenario 3: Empty State
**Type:** Positive
**Priority:** Medium

- **Given:** New user.
- **When:** Navigates to `/profile/orders`.
- **Then:** "No orders yet".

### Scenario 4: RLS Check
**Type:** Security
**Priority:** Critical

- **Given:** User A logged in.
- **When:** Tries `GET /api/orders/{UserB_Order_ID}`.
- **Then:** 404/403.

---

## 🧪 Paso 4: Test Design

### Test Outlines

#### **Validar listado de órdenes**
**Type:** Positive
**Priority:** Critical
**Test Level:** E2E

**Test Steps:**
1. Place order.
2. Go to history.
3. Verify order appears at top (most recent).

#### **Validar detalle de orden**
**Type:** Positive
**Priority:** High
**Test Level:** UI

**Test Steps:**
1. Click Order.
2. Verify items match what was bought.

#### **Validar seguridad RLS**
**Type:** Security
**Priority:** Critical
**Test Level:** Integration

**Test Steps:**
1. Request another user's order ID.

**Expected Result:**
- API Error.

---

## 📊 Edge Cases Summary

| Edge Case | Test Case | Priority |
|Codes | --------- | -------- |
| Order with 50+ items | Rendering Performance | Low |

---

## 🎯 Next Steps

1. **Dev:** Implement pagination.
2. **QA:** Test with "Cancelled" orders (Status color).
