# Test Cases: STORY-OP-10 - Product Detail Page

**Fecha:** 2026-01-20
**QA Engineer:** AI Agent
**Story Jira Key:** OP-10
**Epic:** EPIC-OP-7 - Essential Catalog & Product Discovery
**Status:** Draft

---

## 📋 Paso 1: Critical Analysis

### Business Context of This Story

**User Persona Affected:**
- **Primary:** Pet Owner (Decision Maker).

**Business Value:**
- **Value Proposition:** Provee la información necesaria para cerrar la venta.
- **Business Impact:** Tasa de conversión (Add to Cart Rate).

**Related User Journey:**
- Journey: Product Discovery
- Step: Evaluation

---

### Technical Context of This Story

**Architecture Components:**

**Frontend:**
- Components: `ProductDetail`, `ProductImage` (Placeholder), `AddToCartBlock`.
- Pages: `/products/[id]` (Next.js Dynamic Route).

**Backend:**
- API Endpoints: `GET /api/products/[id]`
- Database: `public.products`

**Integration Points:**
- Frontend ↔ Backend API

---

### Story Complexity Analysis

**Overall Complexity:** Low

**Complexity Factors:**
- Business logic: Low (Read-only data display).
- UX: High (Layout, SEO tags).

**Estimated Test Effort:** Low

---

## 🚨 Paso 2: Story Quality Analysis

### Ambiguities Identified

**Ambiguity 1:** "Notify Me" option for Out of Stock
- **Location in Story:** Scenario 3
- **Question for PO:** Does this feature exist yet (Email capture)?
- **Impact on Testing:** Scope creep.
- **Suggested Clarification:** For MVP, just disable button and show text "Out of Stock". "Notify Me" is future.

**Ambiguity 2:** SEO Requirements
- **Location in Story:** N/A (Implicit in "Detail Page")
- **Question for Dev:** Do we need OpenGraph tags / Metadata?
- **Impact on Testing:** Verification of `<head>` tags.
- **Suggested Clarification:** Essential for e-commerce. Must verify title/description meta tags.

---

## ✅ Paso 3: Refined Acceptance Criteria

### Scenario 1: View Product (Happy Path)
**Type:** Positive
**Priority:** Critical

- **Given:** Product "Super Food" exists with ID 100.
- **When:** User navigates to `/products/100`.
- **Then:**
  - Page loads < 2s.
  - Name "Super Food" visible.
  - Price, Weight, Description visible.
  - Subscription Eligibility badge is visible (True/False).

### Scenario 2: Product Not Found
**Type:** Negative
**Priority:** Medium

- **Given:** Product ID 999 does NOT exist.
- **When:** User navigates to `/products/999`.
- **Then:** UI shows "Product not found" (Custom 404).

### Scenario 3: Out of Stock
**Type:** Positive (State check)
**Priority:** High

- **Given:** Product ID 101 has `stock = 0`.
- **When:** User views details.
- **Then:** "Add to Cart" is disabled. "Out of Stock" badge visible.

---

## 🧪 Paso 4: Test Design

### Test Outlines

#### **Validar carga de detalles de producto**
**Type:** Positive
**Priority:** Critical
**Test Level:** E2E

**Preconditions:**
- Seed data product ID 1 exists.

**Test Steps:**
1. Navigate to `/products/1`.
2. Check Text of `data-testid="product-name"`.
3. Check Price format.

**Expected Result:**
- Content matches DB.

---

#### **Validar manejo de error 404**
**Type:** Negative
**Priority:** Low
**Test Level:** Integration

**Test Steps:**
1. Navigate to `/products/invalid-id`.

**Expected Result:**
- **UI:** User-friendly error message. Not a generic 500 or blank page.

---

#### **Validar estado de stock en UI**
**Type:** Positive
**Priority:** High
**Test Level:** UI

**Test Steps:**
1. Navigate to Out of Stock product.
2. Verify Button state.

**Expected Result:**
- Button `disabled`. Label "Out of Stock".

---

#### **Validar Metadata SEO**
**Type:** Positive
**Priority:** Medium
**Test Level:** E2E

**Test Steps:**
1. Load page.
2. Inspect `<title>` and `<meta name="description">`.

**Expected Result:**
- Title contains Product Name.

---

## 📊 Edge Cases Summary

| Edge Case | Test Case | Priority |
|Codes | --------- | -------- |
| Very long description | UI Overflow Test | Low |
| Product with no weight | Null check | Low |

---

## 🎯 Next Steps

1. **Dev:** Implement `generateMetadata` in Next.js page.
2. **QA:** Define image placeholder strategy for MVP.
