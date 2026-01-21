# Test Cases: STORY-OP-9 - Filter Products by Category

**Fecha:** 2026-01-20
**QA Engineer:** AI Agent
**Story Jira Key:** OP-9
**Epic:** EPIC-OP-7 - Essential Catalog & Product Discovery
**Status:** Draft

---

## 📋 Paso 1: Critical Analysis

### Business Context of This Story

**User Persona Affected:**
- **Primary:** Pet Owner (Registered or Guest).

**Business Value:**
- **Value Proposition:** Refinamiento de búsqueda. Un usuario que busca "Comida" no quiere ver "Arenas".
- **Business Impact:** Reduce el tiempo para encontrar el producto (Time-to-Purchase).

**Related User Journey:**
- Journey: Product Discovery
- Step: Filtering

---

### Technical Context of This Story

**Architecture Components:**

**Frontend:**
- Components: `CategoryFilter` (Sidebar/Drawer), `FilterTag`.
- State: `useFilters` hook.

**Backend:**
- API Endpoints: `GET /api/products?category=food`
- Database: `public.products`

**Integration Points:**
- Frontend ↔ Backend API (Query params sync)

---

### Story Complexity Analysis

**Overall Complexity:** Medium

**Complexity Factors:**
- Logic: Medium (Combinatorial filtering: Species + Category).
- State: Medium (Multiple selection, URL syncing).

**Estimated Test Effort:** Medium

---

## 🚨 Paso 2: Story Quality Analysis

### Ambiguities Identified

**Ambiguity 1:** "Comma-separated list or multiple parameters"
- **Location in Story:** Backend Technical Notes
- **Question for Dev:** Which format will we use? `?category=food,litter` or `?category=food&category=litter`?
- **Impact on Testing:** API testing string format.
- **Suggested Clarification:** Use standard array params `category=food&category=litter` (better for Next.js).

**Ambiguity 2:** Empty result behavior
- **Location in Story:** Scenario 4
- **Question for UX:** Just a text "No results"? Or suggested filters to clear?
- **Impact on Testing:** Visual verification.
- **Suggested Clarification:** Text + "Clear Filters" button.

---

## ✅ Paso 3: Refined Acceptance Criteria

### Scenario 1: Filter Single Category
**Type:** Positive
**Priority:** High

- **Given:** Catalog view.
- **When:** Select "Food".
- **Then:** URL has `category=food`. Only food items shown.

### Scenario 2: Filter Multiple Categories
**Type:** Positive
**Priority:** Medium

- **Given:** User selected "Food".
- **When:** User selects "Toys".
- **Then:** Items matching "Food" OR "Toys" are shown (Union).

### Scenario 3: Combination Species + Category
**Type:** Positive
**Priority:** Critical

- **Given:** Filter "Dog" active.
- **When:** Select "Food".
- **Then:** Show ONLY "Dog Food". Hide "Cat Food" and "Dog Toys".

### Scenario 4: No Results
**Type:** Negative
**Priority:** Medium

- **Given:** Filter "Cat" active.
- **When:** Select "Dog-only Category" (e.g., if any).
- **Then:** "No results found".

---

## 🧪 Paso 4: Test Design

### Test Outlines

#### **Validar filtro simple de categoría**
**Type:** Positive
**Priority:** High
**Test Level:** E2E
**Parametrized:** Yes

**Test Data Sets:**
- Food
- Litter
- Hygiene

**Test Steps:**
1. Click Category.
2. Verify results match category.

---

#### **Validar filtro combinado (Especie AND Categoría)**
**Type:** Positive
**Priority:** Critical
**Test Level:** E2E

**Test Steps:**
1. Filter by "Dog".
2. Filter by "Food".
3. Verify visible items are BOTH Dog AND Food.

**Expected Result:**
- Intersection of sets.

---

#### **Validar selección múltiple (Categoría OR Categoría)**
**Type:** Positive
**Priority:** Medium
**Test Level:** Integration

**Test Steps:**
1. Select "Food".
2. Select "Toys".

**Expected Result:**
- List contains items that are Food OR Toys.

---

#### **Validar limpiar filtros**
**Type:** Positive
**Priority:** Medium

**Test Steps:**
1. Apply multiple filters.
2. Click "Clear All".

**Expected Result:**
- All products shown. URL params cleared.

---

## 📊 Edge Cases Summary

| Edge Case | Test Case | Priority |
|Codes | --------- | -------- |
| Invalid Category in URL | Resilience Test | Low |
| Filter persistence on refresh | State Test | Medium |

---

## 🎯 Next Steps

1. **Dev:** Confirm array query param format.
2. **QA:** Test on Mobile (Filter drawer behavior).
