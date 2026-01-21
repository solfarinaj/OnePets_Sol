# Test Cases: STORY-OP-12 - Favorites Management

**Fecha:** 2026-01-20
**QA Engineer:** AI Agent
**Story Jira Key:** OP-12
**Epic:** EPIC-OP-7 - Essential Catalog & Product Discovery
**Status:** Draft

---

## 📋 Paso 1: Critical Analysis

### Business Context of This Story

**User Persona Affected:**
- **Primary:** Registered Pet Owner.

**Business Value:**
- **Value Proposition:** Recompra rápida.
- **Business Impact:** Incrementa el LTV (Lifetime Value) facilitando compras recurrentes sin suscripción.

**Related User Journey:**
- Journey: Reorder / Loyalty
- Step: Managing Preferences

---

### Technical Context of This Story

**Architecture Components:**

**Frontend:**
- Components: `FavoriteButton`, `FavoritesList`.
- State: `OptimisticUI` (Toggle before server response).

**Backend:**
- API Endpoints: `POST /api/favorites`, `DELETE /api/favorites/{id}`, `GET /api/favorites`.
- Database: `public.favorite_products` (user_id, product_id).

**Integration Points:**
- Frontend ↔ Backend API (Latency sensitive).

---

### Story Complexity Analysis

**Overall Complexity:** Low

**Complexity Factors:**
- Logic: Low (CRUD).
- State: Medium (Syncing button state across multiple pages - Catalog vs Detail vs Favorites Page).

**Estimated Test Effort:** Low

---

## 🚨 Paso 2: Story Quality Analysis

### Ambiguities Identified

**Ambiguity 1:** "Unmark from Favorites List"
- **Location in Story:** Description
- **Question for UX:** Can I remove a favorite directly from the "My Favorites" list?
- **Impact on Testing:** UI interaction test.
- **Suggested Clarification:** Yes, remove button on the list item.

**Ambiguity 2:** Guest behavior details
- **Location in Story:** Scenario 4
- **Question for PO:** After login, does the item get auto-favorited?
- **Impact on Testing:** "Redirect Back" logic verification.
- **Suggested Clarification:** Nice to have, but for MVP, just redirect to login is enough. User manually favorites after login.

---

## ✅ Paso 3: Refined Acceptance Criteria

### Scenario 1: Toggle On (Happy Path)
**Type:** Positive
**Priority:** Critical

- **Given:** User is logged in. Product 100 is NOT favorite.
- **When:** Click "Heart" icon.
- **Then:**
  - Icon turns solid/red immediately.
  - API call `POST /api/favorites` returns 200/201.
  - Item appears in `/favorites`.

### Scenario 2: Toggle Off
**Type:** Positive
**Priority:** High

- **Given:** User is logged in. Product 100 IS favorite.
- **When:** Click "Heart" icon.
- **Then:**
  - Icon turns outline/empty.
  - API call `DELETE` returns 200.
  - Item removed from `/favorites`.

### Scenario 3: Guest Attempt
**Type:** Negative
**Priority:** Medium

- **Given:** Guest user.
- **When:** Click "Heart".
- **Then:** Redirect to `/auth/login`.

---

## 🧪 Paso 4: Test Design

### Test Outlines

#### **Validar agregar a favoritos**
**Type:** Positive
**Priority:** Critical
**Test Level:** E2E

**Preconditions:**
- Login.

**Test Steps:**
1. Navigate to Catalog.
2. Favorite "Item A".
3. Navigate to `/favorites`.

**Expected Result:**
- "Item A" is present in the list.

#### **Validar persistencia de estado**
**Type:** Positive
**Priority:** High
**Test Level:** Integration

**Test Steps:**
1. Favorite "Item B".
2. Refresh page.

**Expected Result:**
- "Item B" icon remains solid/active.

#### **Validar consistencia de estado entre páginas**
**Type:** Positive
**Priority:** Medium
**Test Level:** UI

**Test Steps:**
1. Favorite "Item C" in Detail Page.
2. Go back to Catalog.

**Expected Result:**
- "Item C" icon in Catalog card is active.

---

## 📊 Edge Cases Summary

| Edge Case | Test Case | Priority |
|Codes | --------- | -------- |
| Double click quickly | Debounce Test | Low |
| Product deleted from catalog | Orphaned Favorite Test | Medium |

---

## 🎯 Next Steps

1. **Dev:** Implement Optimistic UI for instant feedback.
2. **QA:** Test latency handling (slow network).
