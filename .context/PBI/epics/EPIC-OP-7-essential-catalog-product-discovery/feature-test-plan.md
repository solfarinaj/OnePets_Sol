# Feature Test Plan: EPIC-OP-7 - Essential Catalog & Product Discovery

**Fecha:** 2026-01-20
**QA Lead:** AI Agent
**Epic Jira Key:** OP-7
**Status:** Draft

---

## 📋 Business Context Analysis

### Business Value

This epic is the core of the shopping experience. If users can't find products, they can't buy.

**Key Value Proposition:**
- Streamlined discovery (Curated catalog).
- Quick reordering (Favorites).

**Success Metrics (KPIs):**
- Conversion Rate (View Content -> Add to Cart).
- Page Load Time < 2s.

**User Impact:**
- **Pet Owner:** Needs to find specific food/items quickly without wading through thousands of irrelevant SKUs.

**Critical User Journeys:**
- Product Discovery to Purchase.
- Reorder via Favorites.

---

## 🏗️ Technical Architecture Analysis

### Architecture Components Involved

**Frontend:**
- `CatalogPage` (Grid/List view).
- `ProductFilters` (Species, Category).
- `ProductCard` (with Favorite toggle).
- `ProductDetailPage`.

**Backend:**
- `GET /api/products` (Filtering, Pagination).
- `GET /api/products/{id}`.
- `GET /api/favorites` & `POST/DELETE /api/favorites/{id}`.
- `PilotZoneService` (Availability check).

**Database:**
- `public.products` (Main catalog).
- `public.favorite_products` (Join table).
- `public.addresses` (For availability check).

### Integration Points (Critical for Testing)

**Internal:**
- Frontend ↔ Backend API (Latency critical).
- Backend ↔ Auth (Favorites logic requires User ID).
- Backend ↔ Inventory (Availability logic).

---

## 🚨 Risk Analysis

### Technical Risks

#### Risk 1: Slow Catalog Queries
- **Impact:** High (User bounce).
- **Area Affected:** Database/API.
- **Mitigation Strategy:** Indexing on `species`, `category`. Pagination.
- **Test Coverage:** Performance tests with seeded database (100+ items).

#### Risk 2: Availability Logic Complexity
- **Impact:** Medium (User frustration if shows available but isn't).
- **Area Affected:** Backend Logic.
- **Mitigation Strategy:** Unit tests for `PilotZoneService`.

### Business Risks

#### Risk 1: Empty Catalog
- **Impact:** High (Broken experience).
- **Mitigation:** Seed script must run before deployment. Smoke test to verify data presence.

---

## ⚠️ Critical Analysis & Questions for PO/Dev

### Ambiguities Identified

**Ambiguity 1:** "Curated catalog of ~20 items"
- **Found in:** Epic Scope
- **Question for PO:** Is this hard limit? Should the UI hide pagination if < 20 items?
- **Impact:** UI Design.

**Ambiguity 2:** "Availability by address"
- **Found in:** Story OP-11
- **Question for Dev:** Does this require Google Maps API or just Zip Code matching?
- **Impact:** External dependency mocking.

---

## 🎯 Test Strategy

### Test Scope

**In Scope:**
- Filtering by Dog/Cat.
- Category filters.
- Product Details.
- Favorites (Add/Remove/List).
- Availability display.

**Out of Scope:**
- Search bar (Text search) - Moved to future.
- Reviews.

### Test Levels

- **Unit:** Filter logic, Availability logic.
- **Integration:** API endpoints (Products & Favorites).
- **E2E:** Flow: Filter -> Select -> Favorite -> Check Favorites list.

---

## 📊 Test Cases Summary by Story

### STORY-OP-8: Browse by Species
- **Complexity:** Low
- **Est. Tests:** 4 (Dog, Cat, Both, None).

### STORY-OP-9: Filter by Category
- **Complexity:** Medium
- **Est. Tests:** 6 (Single category, Multiple, Clear filters, Empty result).

### STORY-OP-10: Product Detail Page
- **Complexity:** Low
- **Est. Tests:** 3 (Valid ID, Invalid ID, SEO tags check).

### STORY-OP-11: Availability by Address
- **Complexity:** Medium
- **Est. Tests:** 4 (In zone, Out zone, No address, Login prompt).

### STORY-OP-12: Favorites Management
- **Complexity:** Medium
- **Est. Tests:** 5 (Add, Remove, View List, Guest attempt, Persistence).

**Total Estimated:** ~22 Test Cases.

---

## 🗂️ Test Data Requirements

- **Seeded Products:** At least 5 Dogs, 5 Cats, mixed categories.
- **Users:** 1 User in Pilot Zone, 1 User Outside.

---

## ✅ Entry/Exit Criteria

**Entry:**
- Catalog seeded in Staging.

**Exit:**
- All critical flows (Filter -> View) pass.
- Page load < 2s verified.

---

## 📝 Non-Functional Requirements Validation

- **Performance:** Catalog load < 2s.
- **Usability:** Filters must be usable on Mobile.

---

## 📅 Testing Timeline Estimate

- **Design:** 1 day.
- **Execution:** 2 days.

---

## 🎯 Next Steps (Team Action Required)

1. **Dev:** Confirm indexing strategy for products table.
2. **PO:** Provide final list of 20 products (Images/Descriptions) for seeding.
