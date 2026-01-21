# Test Cases: STORY-OP-18 - Order Confirmation

**Fecha:** 2026-01-20
**QA Engineer:** AI Agent
**Story Jira Key:** OP-18
**Epic:** EPIC-OP-13 - Cart, Checkout & Payments
**Status:** Draft

---

## 📋 Paso 1: Critical Analysis

### Business Context of This Story

**User Persona Affected:**
- **Primary:** Pet Owner (Registered) - Post-purchase.

**Business Value:**
- **Value Proposition:** Cierre del ciclo de compra. Genera tranquilidad al confirmar que el pedido fue recibido y cuándo llegará.
- **Business Impact:** Reduce consultas al soporte ("¿Llegó mi pedido?") y mejora la retención del cliente.

**Related User Journey:**
- Journey: Purchase Flow
- Step: Confirmation & Success

---

### Technical Context of This Story

**Architecture Components:**

**Frontend:**
- Components: `OrderSuccessDetails`, `DeliveryInfoSummary`, `InvoicePDFDownload` (Optional)
- Pages: `/order-confirmation/[orderId]`

**Backend:**
- API Endpoints: `GET /api/orders/[orderId]`
- Services: `OrderService`, `ETACalculator`
- Database: `public.orders`, `public.order_items`

**Integration Points:**
- Frontend ↔ Backend (Order details retrieval)
- Backend ↔ RLS (Critical: Only owner can see)

---

### Story Complexity Analysis

**Overall Complexity:** Low

**Complexity Factors:**
- Security: Medium (Must enforce ownership)
- UX: Medium (Formatting dates and ETA windows clearly)

**Estimated Test Effort:** Low

---

## 🚨 Paso 2: Story Quality Analysis

### Ambiguities Identified

**Ambiguity 1:** "Estimated delivery window" format
- **Location in Story:** Scenario 1
- **Question for PO:** How is this calculated? Is it a range (e.g., "Jan 21, 2pm - 6pm") or fixed?
- **Impact on Testing:** UI formatting and calculation logic.
- **Suggested Clarification:** Use a range based on pilot zone average (e.g., "Within 2 hours" or "Today, 4 PM - 8 PM").

**Ambiguity 2:** Access duration
- **Location in Story:** Description
- **Question for Dev:** Is this page accessible forever via URL or only once?
- **Impact on Testing:** Persistent access testing.
- **Suggested Clarification:** Always accessible to the owner via URL.

---

## ✅ Paso 3: Refined Acceptance Criteria

### Scenario 1: Order Success (Happy Path)
**Type:** Positive
**Priority:** Critical

- **Given:** User successfully paid for Order #9999.
- **When:** They are redirected to `/order-confirmation/9999`.
- **Then:**
  - UI shows "Thank you, [Name]!".
  - Displays Order Number: 9999.
  - Displays Total: $[Amount].
  - Displays Address: [User Address].
  - Displays ETA: [Time Range].

### Scenario 2: Unauthorized Access (RLS Check)
**Type:** Security
**Priority:** Critical

- **Given:** Order #9999 belongs to User A. User B is logged in.
- **When:** User B navigates to `/order-confirmation/9999`.
- **Then:** 404 Not Found or 403 Forbidden. User B cannot see User A's order details.

### Scenario 3: Order ID Does Not Exist
**Type:** Negative
**Priority:** Medium

- **Given:** User is logged in.
- **When:** User navigates to `/order-confirmation/INVALID_ID`.
- **Then:** UI shows "Order not found" and a button "Return to Store".

---

## 🧪 Paso 4: Test Design

### Test Outlines

#### **Validar visualización de detalles de orden**
**Type:** Positive
**Priority:** Critical
**Test Level:** E2E

**Preconditions:**
- Successful order created in previous step.

**Test Steps:**
1. Navigate to `/order-confirmation/[orderId]`.
2. Verify all UI elements against DB records.

**Expected Result:**
- **UI:** Summary list of products matches `order_items`. Total matches `orders.total_amount`.

---

#### **Validar protección de privacidad (RLS)**
**Type:** Security
**Priority:** Critical
**Test Level:** API / Integration

**Preconditions:**
- Order ID 100 exists for User A.
- User B token is active.

**Test Steps:**
1. Call `GET /api/orders/100` with User B's token.

**Expected Result:**
- **Status:** 404 (Supabase default) or 403.
- **Body:** No order data leaked.

---

#### **Validar formato de ETA**
**Type:** Positive
**Priority:** Medium
**Test Level:** UI

**Test Steps:**
1. Check "Estimated Delivery" field.

**Expected Result:**
- **UI:** Matches user-friendly format (e.g., "Wednesday, Jan 21, between 2 PM and 4 PM").

---

## 📊 Edge Cases Summary

| Edge Case | Test Case | Priority |
|Codes | --------- | -------- |
| Access while offline | Offline UX Test | Low |
| Order with 50+ items | UI Stress Test | Low |
| Direct deep-link access | Security Test | High |

---

## 🎯 Next Steps

1. **Dev:** Implement the `GET /api/orders/{id}` endpoint with RLS enabled.
2. **UX:** Provide a "Print Receipt" button.
3. **QA:** Test link from confirmation email (if planned in next epics).
