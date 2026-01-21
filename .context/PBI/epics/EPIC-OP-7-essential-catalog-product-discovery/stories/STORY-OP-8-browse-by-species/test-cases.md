# Test Cases: STORY-OP-8 - Browse Essential Products by Species

**Fecha:** 2026-01-20
**QA Engineer:** AI Agent
**Story Jira Key:** OP-8
**Epic:** EPIC-OP-7 - Essential Catalog & Product Discovery
**Status:** Draft

---

## 📋 Paso 1: Critical Analysis

### Business Context of This Story

**User Persona Affected:**
- **Primary:** Pet Owner (Dog or Cat owner).

**Business Value:**
- **Value Proposition:** Reducción inmediata de ruido. Un dueño de gato no quiere ver comida para perros.
- **Business Impact:** Mejora la retención y la velocidad de compra (Time-to-product).

**Related User Journey:**
- Journey: Product Discovery
- Step: Initial Navigation

---

### Technical Context of This Story

**Architecture Components:**

**Frontend:**
- Components: `ProductList`, `SpeciesFilter` (Tabs/Pills)
- Pages: `/catalog`

**Backend:**
- API Endpoints: `GET /api/products?species=dog`
- Database: `public.products` (column `species`)

**Integration Points:**
- Frontend ↔ Backend API

---

### Story Complexity Analysis

**Overall Complexity:** Low

**Complexity Factors:**
- Business logic: Low (Simple filter)
- UX: Medium (State persistence, responsive design)

**Estimated Test Effort:** Low

---

## 🚨 Paso 2: Story Quality Analysis

### Ambiguities Identified

**Ambiguity 1:** "View all products"
- **Location in Story:** Scenario 3
- **Question for PO:** Is "All" the default state? Or must the user choose first?
- **Impact on Testing:** Determines "Given" state for tests.
- **Suggested Clarification:** Default state is "All" (or based on last purchase if personalized). For MVP, "All" is default.

**Ambiguity 2:** Empty result state
- **Location in Story:** N/A (Missing)
- **Question for Dev:** What if we have no products for "Cat"?
- **Impact on Testing:** Empty state verification.
- **Suggested Clarification:** Show "No products found for this species".

---

## ✅ Paso 3: Refined Acceptance Criteria

### Scenario 1: Filter by Dog (Happy Path)
**Type:** Positive
**Priority:** Critical

- **Given:** Catalog has mixed products.
- **When:** User clicks "Dog".
- **Then:**
  - URL updates to `?species=dog`.
  - Only products with `species='dog'` are visible.
  - "Cat" products are hidden.

### Scenario 2: Filter by Cat (Happy Path)
**Type:** Positive
**Priority:** Critical

- **Given:** Catalog has mixed products.
- **When:** User clicks "Cat".
- **Then:**
  - URL updates to `?species=cat`.
  - Only products with `species='cat'` are visible.

### Scenario 3: Clear Filter / View All
**Type:** Positive
**Priority:** Medium

- **Given:** Filter "Dog" is active.
- **When:** User clicks "All".
- **Then:**
  - URL removes `species` param.
  - All products are visible.

---

## 🧪 Paso 4: Test Design

### Test Outlines

#### **Validar filtrado por especie**
**Type:** Positive
**Priority:** Critical
**Test Level:** E2E
**Parametrized:** Yes

**Test Data Sets:**
- Filter: "Dog", Expected Species: "dog"
- Filter: "Cat", Expected Species: "cat"

**Test Steps:**
1. Navigate to Catalog.
2. Click filter [Filter].
3. Verify all visible cards have correct species badge/metadata.

**Expected Result:**
- **UI:** Only relevant items shown.

---

#### **Validar persistencia del filtro en URL**
**Type:** Positive
**Priority:** High
**Test Level:** UI

**Test Steps:**
1. Select "Dog".
2. Refresh page.

**Expected Result:**
- **UI:** "Dog" filter remains active. Products are still filtered.

---

#### **Validar estado vacío (Sin productos)**
**Type:** Negative
**Priority:** Low
**Test Level:** Integration

**Preconditions:**
- Database has NO products for "Hamster" (if applicable) or mock empty Cat DB.

**Test Steps:**
1. Request filter for empty species.

**Expected Result:**
- **UI:** Friendly "No products found" message.

---

## 📊 Edge Cases Summary

| Edge Case | Test Case | Priority |
|Codes | --------- | -------- |
| Invalid Species in URL | Negative Test | Low |
| Back button navigation | UX Test | Medium |

---

## 🎯 Next Steps

1. **Dev:** Add `species` column index.
2. **QA:** Ensure test data has clear species distinction.
