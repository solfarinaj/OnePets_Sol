# Test Cases: STORY-OP-15 - View Cart Summary

**Fecha:** 2026-01-20
**QA Engineer:** AI Agent
**Story Jira Key:** OP-15
**Epic:** EPIC-OP-13 - Cart, Checkout & Payments
**Status:** Draft

---

## 📋 Paso 1: Critical Analysis

### Business Context of This Story

**User Persona Affected:**
- **Primary:** Registered Pet Owner.

**Business Value:**
- **Value Proposition:** Transparencia total sobre costos antes del pago. Permite el control final del pedido.
- **Business Impact:** Reduce el "Cart Abandonment" al proporcionar una interfaz clara y sin fricciones para editar el pedido.

**Related User Journey:**
- Journey: Product Discovery to Purchase
- Step: Review Cart

---

### Technical Context of This Story

**Architecture Components:**

**Frontend:**
- Components: `CartSummaryTable`, `QuantityModifier`, `RemoveItemButton`
- Pages: `/cart`

**Backend:**
- API Endpoints: `GET /api/cart`, `PUT /api/cart`
- Database: `public.carts`, `public.cart_items`

**Integration Points:**
- Frontend ↔ API (Sync updates)

---

### Story Complexity Analysis

**Overall Complexity:** Medium

**Complexity Factors:**
- Business logic: Medium (Dynamic recalculations)
- UI/UX: Medium (Responsive tables, optimistic UI updates)

**Estimated Test Effort:** Medium

---

## 🚨 Paso 2: Story Quality Analysis

### Ambiguities Identified

**Ambiguity 1:** "Adjust product quantity" behavior
- **Location in Story:** Scenario 2
- **Question for Dev:** What happens if quantity is decreased to 0?
- **Impact on Testing:** Determines if we expect an error or auto-removal.
- **Suggested Clarification:** Decreasing to 0 should automatically trigger "Remove item" logic.

**Ambiguity 2:** Subtotal vs Total
- **Location in Story:** Scenario 1
- **Question for PO:** Does "total cost" include taxes and shipping at this stage?
- **Impact on Testing:** Verifying calculation accuracy.
- **Suggested Clarification:** At this stage, it is "Subtotal" (Items only). Shipping is added in next step (OP-16).

---

## ✅ Paso 3: Refined Acceptance Criteria

### Scenario 1: View Multi-item Cart (Happy Path)
**Type:** Positive
**Priority:** Critical

- **Given:** Cart has 2x "Item A" ($10 each) and 1x "Item B" ($5).
- **When:** User navigates to `/cart`.
- **Then:**
  - List shows Item A (Qty 2, Total $20).
  - List shows Item B (Qty 1, Total $5).
  - Subtotal shows $25.

### Scenario 2: Increment Quantity
**Type:** Positive
**Priority:** High

- **Given:** User is on `/cart`.
- **When:** User clicks "+" on Item A.
- **Then:**
  - Qty becomes 3.
  - Item Total becomes $30.
  - Subtotal becomes $35.
  - DB updated via `PUT /api/cart`.

### Scenario 3: Remove Item
**Type:** Positive
**Priority:** High

- **Given:** User is on `/cart`.
- **When:** User clicks "Remove" on Item B.
- **Then:**
  - Item B disappears.
  - Subtotal becomes $20.

### Scenario 4: Empty Cart UX
**Type:** Positive
**Priority:** Medium

- **Given:** Cart is empty.
- **When:** User navigates to `/cart`.
- **Then:** UI shows "Your cart is empty" and a "Start Shopping" button.

---

## 🧪 Paso 4: Test Design

### Test Outlines

#### **Validar visualización de resumen con múltiples ítems**
**Type:** Positive
**Priority:** Critical
**Test Level:** E2E

**Preconditions:**
- User has items in cart.

**Test Steps:**
1. Navigate to `/cart`.
2. Compare UI values with expected (price * qty).

**Expected Result:**
- All values match. Subtotal is accurate.

---

#### **Validar actualización dinámica de subtotal**
**Type:** Positive
**Priority:** High
**Test Level:** UI

**Test Steps:**
1. Change qty of an item.
2. Observe subtotal field.

**Expected Result:**
- Subtotal updates without page refresh (Optimistic UI or fast sync).

---

#### **Validar persistencia de cambios en el carrito**
**Type:** Positive
**Priority:** High
**Test Level:** Integration

**Test Steps:**
1. Change qty in `/cart`.
2. Refresh page.

**Expected Result:**
- Changes persist (Verify `GET /api/cart` returns new values).

---

#### **Validar eliminación del último ítem del carrito**
**Type:** Positive
**Priority:** Medium

**Test Steps:**
1. Remove all items one by one.

**Expected Result:**
- When last item removed, view switches to "Empty Cart" state automatically.

---

## 📊 Edge Cases Summary

| Edge Case | Test Case | Priority |
|Codes | --------- | -------- |
| Qty = 0 via decrement | Auto-remove test | Medium |
| Item becomes out of stock while viewing cart | Stock Sync test | High |
| Extremely long product names | UI Overflow test | Low |

---

## 🎯 Next Steps

1. **Dev:** Confirm if `PUT /api/cart` handles both quantity updates and deletions.
2. **QA:** Test behavior when opening the cart in two tabs simultaneously.
