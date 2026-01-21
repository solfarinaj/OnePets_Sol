# Test Cases: STORY-OP-14 - Add Products to Cart

**Fecha:** 2026-01-20
**QA Engineer:** AI Agent
**Story Jira Key:** OP-14
**Epic:** EPIC-OP-13 - Cart, Checkout & Payments
**Status:** Draft

---

## 📋 Paso 1: Critical Analysis

### Business Context of This Story

**User Persona Affected:**
- **Primary:** Pet Owner (Registered) - Wants to gather items for purchase.

**Business Value:**
- **Value Proposition:** Permite la selección múltiple de productos y la preparación del pedido. Es el motor de conversión del e-commerce.
- **Business Impact:** Incrementa el AOV (Average Order Value) al facilitar añadir varios productos.

**Related User Journey:**
- Journey: Product Discovery to Purchase
- Step: Add to Cart

---

### Technical Context of This Story

**Architecture Components:**

**Frontend:**
- Components: `AddToCartButton`, `QuantitySelector`, `CartBadge`
- State Management: `CartContext` / local state synced with API.

**Backend:**
- API Endpoints: `POST /api/cart`
- Database: `public.carts`, `public.cart_items`, `public.products`

**Integration Points:**
- Frontend ↔ Backend API
- Backend ↔ Inventory System (Stock check)

---

### Story Complexity Analysis

**Overall Complexity:** Medium

**Complexity Factors:**
- Business logic: Medium (Atomic updates for quantities, Stock validation)
- Concurrency: High (Multiple adds at the same time, stock changing)
- Data Consistency: High (Subtotals must match items * price)

**Estimated Test Effort:** Medium

---

## 🚨 Paso 2: Story Quality Analysis

### Ambiguities Identified

**Ambiguity 1:** "Out of stock" definition
- **Location in Story:** Scenario 3
- **Question for PO/Dev:** Does "Out of stock" mean `quantity == 0` or is there a `is_active` flag? 
- **Impact on Testing:** Need to know what database state triggers the error.
- **Suggested Clarification:** `products.stock_quantity < requested_quantity` triggers the error.

**Ambiguity 2:** Unauthenticated users
- **Location in Story:** Technical Notes
- **Question for PO:** Can guest users add to cart? The story says "pet owner" (usually implies registered).
- **Impact on Testing:** Determines if we test LocalStorage carts or strictly API-based carts.
- **Suggested Clarification:** For MVP, only Authenticated users. Guest cart is future.

### Edge Cases NOT Covered in Original Story

**Edge Case 1:** Max Quantity per Item
- **Scenario:** User adds 1,000,000 units of a product.
- **Expected Behavior:** System should limit to available stock or a reasonable "max order" (e.g., 99).
- **Criticality:** Medium
- **Action Required:** Add boundary test for max quantity.

**Edge Case 2:** Price change during cart session
- **Scenario:** Item is added at $10. Price changes to $12 before checkout.
- **Expected Behavior:** Cart should update to latest price.
- **Criticality:** High
- **Action Required:** Verify subtotal updates on price change.

---

## ✅ Paso 3: Refined Acceptance Criteria

### Scenario 1: Add New Item (Empty Cart)
**Type:** Positive
**Priority:** Critical

- **Given:** User has empty cart. Product "Premium Dog Food" has stock 10, price $50.
- **When:** User adds 1 unit to cart.
- **Then:** 
  - API returns 201 Created.
  - `cart_items` has 1 record (qty 1, price $50).
  - Cart subtotal is $50.

### Scenario 2: Increment Existing Item
**Type:** Positive
**Priority:** High

- **Given:** User has 1 "Premium Dog Food" in cart.
- **When:** User adds 1 more "Premium Dog Food".
- **Then:**
  - `cart_items` qty becomes 2.
  - Subtotal becomes $100.

### Scenario 3: Exceed Available Stock
**Type:** Negative
**Priority:** High

- **Given:** Product has stock 2.
- **When:** User tries to add 3 units.
- **Then:** UI shows "Insufficient stock available (only 2 left)".

### Scenario 4: Negative/Zero Quantity
**Type:** Negative
**Priority:** Medium

- **When:** User sends qty 0 or -1 via API.
- **Then:** 400 Bad Request. "Quantity must be greater than 0".

---

## 🧪 Paso 4: Test Design

### Test Outlines

#### **Validar añadir producto exitosamente**
**Type:** Positive
**Priority:** Critical
**Test Level:** E2E

**Preconditions:**
- Authenticated user.
- Product exists with stock.

**Test Steps:**
1. Select product.
2. Select quantity 2.
3. Click "Add to Cart".

**Expected Result:**
- **UI:** Toast "Product added". Cart badge shows "2".
- **DB:** `cart_items` table updated.

---

#### **Validar error por falta de stock**
**Type:** Negative
**Priority:** High
**Test Level:** Integration

**Preconditions:**
- Product stock = 5.

**Test Steps:**
1. Try `POST /api/cart` with quantity 6.

**Expected Result:**
- **Status:** 400 or 409 (Conflict).
- **Body:** `{ "error": "INSUFFICIENT_STOCK" }`.

---

#### **Validar cálculo de subtotal con múltiples productos**
**Type:** Positive
**Priority:** High
**Test Level:** Integration

**Test Steps:**
1. Add Item A ($10) qty 2.
2. Add Item B ($5) qty 1.

**Expected Result:**
- **Subtotal:** $25.

---

## 📊 Edge Cases Summary

| Edge Case | Test Case | Priority |
|Codes | --------- | -------- |
| Max Qty Limit (99) | Boundary Test | Medium |
| Decimals in Qty | Negative Test | Medium |
| SQL Injection in Product ID | Security Test | High |

---

## 🎯 Next Steps

1. **Dev:** Implement stock check logic in `POST /api/cart`.
2. **QA:** Define if cart subtotals include tax at this stage.
